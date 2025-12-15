import { useState, useEffect } from "react";

export default function IntroVideo({ onFinish }) {
    const [visible, setVisible] = useState(true);

    const endIntro = () => {
        setVisible(false);
        if (onFinish) onFinish();
    };

    if (!visible) return null;

    return (
        <div className="intro-overlay">
            <video
                className="intro-video"
                src="/introclip.mp4"
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
