import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface FocusTimerProps {
  defaultMinutes?: number;
  defaultSeconds?: number;
  onComplete?: () => void;
  audioUrl?: string;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ 
  defaultMinutes = 25, 
  defaultSeconds = 0,
  onComplete,
  audioUrl = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
}) => {
  const initialTime = useMemo(() => defaultMinutes * 60 + defaultSeconds, [defaultMinutes, defaultSeconds]);
  const [totalSeconds, setTotalSeconds] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const completedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, totalSeconds]);

  // Handle completion
  useEffect(() => {
    if (totalSeconds === 0 && !completedRef.current && !isRunning) {
      completedRef.current = true;
      
      // Play audio
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error('Audio play failed:', err);
        });
      }
      
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    }
  }, [totalSeconds, isRunning, onComplete]);

  // Reset initialTime when props change
  useEffect(() => {
    if (!isRunning) {
      setTotalSeconds(initialTime);
      completedRef.current = false;
    }
  }, [initialTime, isRunning]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleStartStop = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTotalSeconds(initialTime);
    completedRef.current = false;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  const isCompleted = totalSeconds === 0;
  const buttonLabel = isRunning ? 'Stop' : 'Start';
  const buttonColor = isRunning 
    ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' 
    : 'bg-green-500 hover:bg-green-600 focus:ring-green-300';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Focus Timer
        </h1>
        
        <div className="bg-gray-100 rounded-xl p-8 mb-8">
          <div 
            className="text-6xl md:text-7xl font-mono font-bold text-center text-indigo-600"
            aria-live="polite"
            aria-atomic="true"
            role="timer"
          >
            {formatTime(totalSeconds)}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleStartStop}
            disabled={isCompleted}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${buttonColor}`}
            aria-label={buttonLabel}
            type="button"
          >
            {buttonLabel}
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-4 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 text-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
            aria-label="Reset"
            type="button"
          >
            Reset
          </button>
        </div>

        {isCompleted && (
          <div 
            className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg text-center animate-fade-in"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-green-800 font-semibold">Time's up! Great work! 🎉</p>
          </div>
        )}
      </div>

      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
};

export default FocusTimer;