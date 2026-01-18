import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FocusTimer from './FocusTimer';

describe('FocusTimer Component - Essential Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  // TEST 1: Initial State
  it('should initialize with 25:00 and show Start and Reset buttons', () => {
    render(<FocusTimer />);

    // Verify initial time display
    const timerDisplay = screen.getByText('25:00');
    expect(timerDisplay).toBeInTheDocument();

    // Verify buttons are present
    const startButton = screen.getByRole('button', { name: /start/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  // TEST 2: Start/Stop Functionality
  it('should start countdown when Start is clicked and stop when Stop is clicked', async () => {
    render(<FocusTimer />);

    // Click Start button
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Advance time by 3 seconds
    vi.advanceTimersByTime(3000);

    // Verify timer counted down
    await waitFor(() => {
      expect(screen.getByText('24:57')).toBeInTheDocument();
    });

    // Click Stop button (Start button changes to Stop when running)
    const stopButton = screen.getByRole('button', { name: /stop/i });
    fireEvent.click(stopButton);

    // Advance time - timer should not change
    vi.advanceTimersByTime(2000);

    // Timer should still show 24:57 (paused)
    expect(screen.getByText('24:57')).toBeInTheDocument();
  });

  // TEST 3: Reset Functionality
  it('should reset timer to 25:00 when Reset button is clicked', async () => {
    render(<FocusTimer />);

    // Start timer and let it count down
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);
    
    vi.advanceTimersByTime(10000); // 10 seconds

    await waitFor(() => {
      expect(screen.getByText('24:50')).toBeInTheDocument();
    });

    // Click Reset
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // Timer should be back to 25:00
    await waitFor(() => {
      expect(screen.getByText('25:00')).toBeInTheDocument();
    });
  });

  // TEST 4: Countdown to Zero
  it('should countdown to 0:00 and stop', async () => {
    // Start with a very short timer for testing
    render(<FocusTimer defaultMinutes={0} defaultSeconds={3} />);

    // Start timer
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Fast-forward through the entire countdown
    vi.advanceTimersByTime(1000);
    await waitFor(() => expect(screen.getByText('0:02')).toBeInTheDocument());

    vi.advanceTimersByTime(1000);
    await waitFor(() => expect(screen.getByText('0:01')).toBeInTheDocument());

    vi.advanceTimersByTime(1000);
    await waitFor(() => expect(screen.getByText('0:00')).toBeInTheDocument());

    // Verify it doesn't go negative
    vi.advanceTimersByTime(2000);
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  // TEST 5: Audio Alert on Completion
  it('should play audio alert when timer reaches 0:00', async () => {
    // Mock HTMLMediaElement.prototype.play
    const mockPlay = vi.fn().mockResolvedValue(undefined);
    
    // Spy on the play method of HTMLAudioElement
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

    // Start with 2 seconds
    render(<FocusTimer defaultMinutes={0} defaultSeconds={2} />);

    // Start timer
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Fast-forward to completion (2 seconds)
    vi.advanceTimersByTime(2000);

    // Wait for audio to play
    await waitFor(() => {
      expect(mockPlay).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  // TEST 6: onComplete Callback
  it('should call onComplete callback when timer reaches 0:00', async () => {
    const onComplete = vi.fn();
    
    render(<FocusTimer defaultMinutes={0} defaultSeconds={1} onComplete={onComplete} />);

    // Start timer
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Fast-forward to completion
    vi.advanceTimersByTime(1000);

    // Wait for callback to be called
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });

  // TEST 7: Start Button Disabled at 0:00
  it('should disable start button when timer reaches 0:00', async () => {
    render(<FocusTimer defaultMinutes={0} defaultSeconds={1} />);

    // Start timer
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Fast-forward to completion
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('0:00')).toBeInTheDocument();
    });

    // Start button should be disabled
    const disabledButton = screen.getByRole('button', { name: /start/i });
    expect(disabledButton).toBeDisabled();
  });

  // TEST 8: Completion Message Display
  it('should display completion message when timer reaches 0:00', async () => {
    render(<FocusTimer defaultMinutes={0} defaultSeconds={1} />);

    // Start timer
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // Fast-forward to completion
    vi.advanceTimersByTime(1000);

    // Wait for completion message
    await waitFor(() => {
      expect(screen.getByText(/time's up/i)).toBeInTheDocument();
    });
  });
});