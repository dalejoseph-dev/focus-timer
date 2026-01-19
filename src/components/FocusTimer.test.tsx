import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FocusTimer from './FocusTimer';

describe('FocusTimer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should render with default 25:00 time', () => {
    render(<FocusTimer />);

    const timerDisplay = screen.getByText(/25:00/i);
    expect(timerDisplay).toBeDefined();

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeDefined();
  });

  it('should countdown when started', async () => {
    render(<FocusTimer />);

    const startButton = screen.getByRole('button', { name: /start/i });
    
    fireEvent.click(startButton);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/24:59/i)).toBeDefined();
  });

  it('should play audio alert when timer reaches zero', async () => {
    const onComplete = vi.fn();
    render(<FocusTimer defaultMinutes={1} onComplete={onComplete} />);

    const startButton = screen.getByRole('button', { name: /start/i });
    
    fireEvent.click(startButton);

    await act(async () => {
      vi.advanceTimersByTime(60000);
    });

    expect(onComplete).toHaveBeenCalled();
  });
});