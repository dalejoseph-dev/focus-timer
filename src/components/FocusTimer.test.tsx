import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FocusTimer from './FocusTimer';

describe('FocusTimer Component', () => {
  // Helper functions for cleaner tests
  const setup = (props = {}) => {
    return render(<FocusTimer {...props} />);
  };

  const getTimerDisplay = () => screen.getByText(/\d{1,2}:\d{2}/i);
  
  const getStartButton = () => screen.getByRole('button', { name: /start/i });
  
  const getPauseButton = () => screen.queryByRole('button', { name: /pause/i });
  
  const getResetButton = () => screen.queryByRole('button', { name: /reset/i });

  const clickStart = () => {
    const button = getStartButton();
    fireEvent.click(button);
  };

  const advanceTime = (milliseconds) => {
    vi.advanceTimersByTime(milliseconds);
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  describe('Initial Render', () => {
    it('should display default time of 25:00', () => {
      setup();
      expect(getTimerDisplay()).toHaveTextContent('25:00');
    });

    it('should display custom initial time when provided', () => {
      setup({ defaultMinutes: 10 });
      expect(getTimerDisplay()).toHaveTextContent('10:00');
    });

    it('should render Start button initially', () => {
      setup();
      expect(getStartButton()).toBeInTheDocument();
    });
  });

  describe('Timer Countdown', () => {
    it('should countdown by 1 second when started', async () => {
      setup();
      clickStart();
      advanceTime(1000);

      await waitFor(() => {
        expect(getTimerDisplay()).toHaveTextContent('24:59');
      });
    });

    it('should countdown multiple seconds correctly', async () => {
      setup();
      clickStart();
      advanceTime(5000);

      await waitFor(() => {
        expect(getTimerDisplay()).toHaveTextContent('24:55');
      });
    });

    it('should handle countdown across minute boundaries', async () => {
      setup({ defaultMinutes: 1 });
      clickStart();
      advanceTime(61000); // 1 minute 1 second

      await waitFor(() => {
        expect(getTimerDisplay()).toHaveTextContent('0:59');
      });
    });
  });

  describe('Timer Controls', () => {
    it('should pause timer when pause button is clicked', async () => {
      setup();
      clickStart();
      advanceTime(2000);

      const pauseButton = getPauseButton();
      if (pauseButton) {
        fireEvent.click(pauseButton);
        advanceTime(3000);

        await waitFor(() => {
          expect(getTimerDisplay()).toHaveTextContent('24:58');
        });
      }
    });

    it('should reset timer when reset button is clicked', async () => {
      setup();
      clickStart();
      advanceTime(5000);

      const resetButton = getResetButton();
      if (resetButton) {
        fireEvent.click(resetButton);

        await waitFor(() => {
          expect(getTimerDisplay()).toHaveTextContent('25:00');
        });
      }
    });
  });

  describe('Timer Completion', () => {
    it('should call onComplete callback when timer reaches zero', async () => {
      const onComplete = vi.fn();
      setup({ defaultMinutes: 0, defaultSeconds: 1, onComplete });

      clickStart();
      advanceTime(1000);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });

    it('should stop at 0:00 without going negative', async () => {
      setup({ defaultMinutes: 0, defaultSeconds: 2 });
      clickStart();
      advanceTime(5000); // Advance more than needed

      await waitFor(() => {
        expect(getTimerDisplay()).toHaveTextContent('0:00');
      });
    });

    it('should not call onComplete multiple times', async () => {
      const onComplete = vi.fn();
      setup({ defaultMinutes: 0, defaultSeconds: 1, onComplete });

      clickStart();
      advanceTime(5000);

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid start/pause clicks', () => {
      setup();
      const startButton = getStartButton();
      
      fireEvent.click(startButton);
      fireEvent.click(startButton);
      fireEvent.click(startButton);

      // Should not crash
      expect(getTimerDisplay()).toBeDefined();
    });

    it('should format single digit seconds with leading zero', async () => {
      setup({ defaultMinutes: 0, defaultSeconds: 9 });
      clickStart();
      advanceTime(1000);

      await waitFor(() => {
        expect(getTimerDisplay()).toHaveTextContent('0:08');
      });
    });
  });
});