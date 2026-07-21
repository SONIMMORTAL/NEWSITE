import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SEEN_KEY = 'pass:intro-seen';

/** Stalled-video safety net — never trap the visitor behind the overlay. */
const MAX_INTRO_MS = 12000;

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Skip the download entirely on metered or slow connections. */
const isConstrainedConnection = () => {
    const conn = typeof navigator !== 'undefined' && navigator.connection;
    if (!conn) return false;
    return Boolean(conn.saveData) || ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
};

const hasSeenIntro = () => {
    try {
        return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
        return false; // private mode / storage blocked
    }
};

const markIntroSeen = () => {
    try {
        sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
        /* non-fatal */
    }
};

export default function IntroVideo({ onFinish }) {
    const { pathname } = useLocation();
    const skipRef = useRef(null);

    // Decided once, synchronously, so the <video> is never mounted (and the
    // 1.3MB/3.7MB file never requested) unless the intro will actually play.
    const [visible, setVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (pathname !== '/') return false; // deep links go straight to content
        if (hasSeenIntro()) return false;
        if (prefersReducedMotion()) return false;
        if (isConstrainedConnection()) return false;
        return true;
    });

    const [videoSrc, setVideoSrc] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < 768
            ? '/mobileintro.mp4'
            : '/introclip.mp4'
    );

    // Whatever happens, this visit counts as "seen" — including deep links, so
    // navigating home later in the session doesn't suddenly play the intro.
    useEffect(() => {
        markIntroSeen();
    }, []);

    const endIntro = useCallback(() => {
        setVisible(false);
        onFinish?.();
    }, [onFinish]);

    // Source only needs to change if the viewport crosses the breakpoint
    // while the intro is still on screen.
    useEffect(() => {
        if (!visible) return undefined;
        const handleResize = () => {
            setVideoSrc(window.innerWidth < 768 ? '/mobileintro.mp4' : '/introclip.mp4');
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [visible]);

    // Escape to dismiss, scroll lock, focus the skip control, and a hard
    // timeout so a stalled or silently-failing video can't strand anyone.
    useEffect(() => {
        if (!visible) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') endIntro();
        };
        const timer = setTimeout(endIntro, MAX_INTRO_MS);
        const prevOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        skipRef.current?.focus();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [visible, endIntro]);

    if (!visible) return null;

    return (
        <div className="intro-overlay" role="dialog" aria-modal="true" aria-label="Intro video">
            <video
                key={videoSrc}
                className="intro-video"
                src={videoSrc}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={endIntro}
                onError={endIntro}
            />
            <button ref={skipRef} className="intro-skip-btn" onClick={endIntro}>
                ENTER SITE
            </button>
        </div>
    );
}
