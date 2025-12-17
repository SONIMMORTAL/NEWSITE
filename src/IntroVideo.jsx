import { useState, useEffect } from "react";

export default function IntroVideo({ onFinish }) {
    const [visible, setVisible] = useState(true);
    const [videoSrc, setVideoSrc] = useState("/introclip.mp4");

    useEffect(() => {
        const handleResize = () => {
            setVideoSrc(window.innerWidth < 768 ? "/mobileintro.mp4" : "/introclip.mp4");
        };

        // Set initial source
        handleResize();

        // Optional: Listen for resize events if orientation changes
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const endIntro = () => {
        setVisible(false);
        if (onFinish) onFinish();
    };

    if (!visible) return null;

    return (
        <div className="intro-overlay">
            <video
                key={videoSrc} // Key is detecting changes to source to ensure re-render
                className="intro-video"
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={endIntro}
            />
            <button className="intro-skip-btn" onClick={endIntro}>
                ENTER SITE
            </button>
        </div>
    );
}
