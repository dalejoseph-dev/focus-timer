import { useState, useEffect, useRef } from 'react';
import '../styles/FocusTimer.css';

// Make sure types are exported
export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

// Make sure props are typed
interface FocusTimerProps {
    defaultMinutes?: number;
    onComplete?: () => void;
}

const FocusTimer = ({ defaultMinutes = 25, onComplete }: FocusTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!isActive || timeLeft === 0) return;

        const interval = setInterval(() => {
            setTimeLeft((time) => {
                if (time <= 1) {
                    setIsActive(false);
                    if (onComplete) onComplete();
                    if (audioRef.current) audioRef.current.play();
                    return 0;
                }
                return time - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    // I'll change the audio tag src for later.
    return (
        <div className="focus-timer">
            <div className="timer-display">
                {formatTime(timeLeft)}
            </div>

            <div className="timer-controls">
                <button 
                    onClick={() => setIsActive(!isActive)}
                    className={isActive ? 'active' : ''}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>

                <button onClick={() => {
                    setIsActive(false);
                    setTimeLeft(defaultMinutes * 60);
                }}>
                    Reset
                </button>

                <button onClick={() => {
                    setIsActive(false);
                    setTimeLeft(25 * 60);
                }}>
                    Focus Session
                </button>
            </div>

            <audio ref={audioRef} src="../public/alert.wav" /> 
        </div>
    );
};

export default FocusTimer;