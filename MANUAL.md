# Task Timer PWA - Production Manual

Welcome to the production manual for adding the Focus Timer feature to Task Timer PWA.

---

## Table of Contents

- [Chapter 1: Environment Setup](#chapter-1-environment-setup)
- [Chapter 2: Test-Driven Development (TDD)](#chapter-2-test-driven-development-tdd)
- [Chapter 3: Build the Focus Timer Component](#chapter-3-build-the-focus-timer-component)
- [Chapter 4: Integration & Polish](#chapter-4-integration--polish)
- [Chapter 5: Submission](#chapter-5-submission)

---

# Chapter 1: Environment Setup

## Context

You're setting up a local React development environment to work on Task Timer PWA. This is a real-world workflow that mirrors how junior developers join existing projects.

## Your Persona

You are a **Junior Frontend Developer** joining an existing codebase. Your job is to get the development environment running, understand the existing code, and prepare to add the focus timer feature.

## Deliverables Checklist

By the end of this chapter:
- [ ] VS Code installed and ready
- [ ] Node.js and npm working
- [ ] Repository cloned to your local machine
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] Dev server running at `http://localhost:5173`
- [ ] Existing app tested (can add/complete/delete tasks)
- [ ] Personal answers committed to git

---

## Step 1: Verify Your Tools

### Check Node.js and npm

Open your terminal and run:

```bash
node --version
npm --version
```

**Expected output:**
- Node: v18.x.x or higher
- npm: 9.x.x or higher

**If not installed:**
- Go to https://nodejs.org
- Download and install the LTS version
- Restart your terminal
- Run the commands again

### Check VS Code

Open VS Code. If you don't have it:
- Go to https://code.visualstudio.com
- Download and install
- Launch it

---

## Step 2: Clone the Repository

In your terminal, navigate to where you want to work:

```bash
cd ~/Desktop
# or wherever you keep code projects
```

Clone the repository (GitHub Classroom gave you a unique link):

```bash
git clone [YOUR_UNIQUE_REPO_URL]
cd [repo-name]
```

Open the project in VS Code:

```bash
code .
```

---

## Step 3: Install Dependencies

In your VS Code terminal (or external terminal):

```bash
npm install
```

**What this does:** Downloads all the libraries the app needs (React, TypeScript, Vite, etc.) into a `node_modules/` folder.

**If you see errors:**
- Make sure you're in the project root directory (where `package.json` lives)
- Try deleting `node_modules/` and `package-lock.json`, then run `npm install` again

---

## Step 4: Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
VITE v4.x.x ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Open your browser** to `http://localhost:5173`

You should see the Task Timer app with:
- A header: "Task Timer PWA"
- An input to add tasks
- A list of tasks (may be empty)

**Test the app:**
1. Add a task: "Test the app"
2. Click the checkbox to mark it complete (text gets line-through)
3. Click the X to delete it
4. Add another task

**If the app works, you're ready to code!**

---

## Step 5: Explore the Codebase

Take 5-10 minutes to read through these files:

### `src/App.tsx`
The main component. Manages tasks state and renders the UI.

### `src/components/TaskList.tsx`
Displays the list of tasks.

### `src/components/TaskCard.tsx`
Individual task item with checkbox and delete button.

### `src/types/index.ts`
TypeScript type definitions (what a Task looks like).

**Don't worry if you don't understand everything!** You'll learn by doing.

---

## Step 6: Answer Personal Questions

Before you write any code, open `CANDIDATE_ANSWERS.md` and answer the 5 questions.

**Why this matters:**
- We want to know you as a person, not just a coder
- Honest answers help us understand your situation
- This is your chance to tell your story

After answering:

```bash
git add CANDIDATE_ANSWERS.md
git commit -m "Add personal answers"
git push
```

---

## Step 7: Verify Everything Works

Run these commands to make sure everything is set up:

```bash
# Check that tests can run (even if no tests exist yet)
npm run test

# Check TypeScript compilation
npm run build
```

**If both commands succeed, you're ready for Chapter 2!**

---

## AI Prompt Templates for Chapter 1

If you get stuck, you can ask Claude or ChatGPT:

### Prompt 1: Troubleshooting npm install

```
I'm trying to run `npm install` for a React + TypeScript project but getting this error:

[paste your error here]

I'm using:
- Node version: [your version]
- npm version: [your version]
- Operating system: [Windows/Mac/Linux]

What's wrong and how do I fix it?
```

### Prompt 2: Understanding the codebase

```
I'm new to this React codebase. Can you explain what's happening in this file?

[paste App.tsx or another file]

Specifically:
1. What is the useState hook doing?
2. How are tasks being added/deleted?
3. Where would I add a new component?
```

---

## Chapter 1 Complete!

**Verification Checklist:**
- [ ] Dev server running at localhost:5173
- [ ] App works (can add/complete/delete tasks)
- [ ] Personal questions answered and committed
- [ ] You understand the basic file structure

**Handoff to Chapter 2:** Now you'll write tests for the focus timer feature BEFORE building it. This is called Test-Driven Development (TDD) and it's a professional best practice.

---

# Chapter 2: Test-Driven Development (TDD)

## Context

Before writing any code for the focus timer, you'll write tests that describe how it should work. This forces you to think through the requirements clearly and gives you a safety net when coding.

## Your Persona

You are a **Software QA Engineer** writing test specifications for a new feature. Your tests will fail at first (red), then you'll write code to make them pass (green).

## Deliverables Checklist

By the end of this chapter:
- [ ] `src/components/FocusTimer.test.tsx` file created
- [ ] At least 3 tests written for timer functionality
- [ ] Tests run and fail (expected - feature doesn't exist yet!)
- [ ] Tests committed to git BEFORE writing the component

---

## Step 1: Understand the Focus Timer Requirements

**What the focus timer should do:**

1. **Display a countdown:** Show minutes and seconds (e.g., "25:00")
2. **Start/Stop button:** Click to start countdown, click again to pause
3. **Reset button:** Return to original time
4. **Default time:** 25 minutes (Pomodoro technique)
5. **Audio alert:** Play a sound when timer reaches 0:00
6. **Visual feedback:** Show different state when active vs paused

**Props the component will accept:**
- `defaultMinutes` (number, default: 25)
- `onComplete` (optional callback function)

---

## Step 2: Create the Test File

Create a new file:

```bash
touch src/components/FocusTimer.test.tsx
```

Open it in VS Code and add this starter code:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FocusTimer from './FocusTimer';

describe('FocusTimer Component', () => {
  beforeEach(() => {
    // Set up before each test
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Clean up after each test
    vi.restoreAllMocks();
  });

  // Your tests go here!
});
```

**What's happening here:**
- `describe`: Groups related tests
- `vi.useFakeTimers()`: Lets us control time in tests
- `render`: Puts the component on a fake page
- `screen`: Lets us find elements (like a user would)
- `fireEvent`: Simulates clicks

---

## Step 3: Write Test 1 - Component Renders

Add this test inside the `describe` block:

```tsx
it('should render with default 25:00 time', () => {
  render(<FocusTimer />);
  
  // Look for the timer display
  const timerDisplay = screen.getByText(/25:00/i);
  expect(timerDisplay).toBeDefined();
  
  // Look for Start button
  const startButton = screen.getByRole('button', { name: /start/i });
  expect(startButton).toBeDefined();
});
```

**What this tests:**
- Timer shows "25:00" when first loaded
- There's a button with "Start" text

---

## Step 4: Write Test 2 - Countdown Works

Add this test:

```tsx
it('should countdown when started', async () => {
  render(<FocusTimer />);
  
  // Click start
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton);
  
  // Fast-forward time by 1 second
  vi.advanceTimersByTime(1000);
  
  // Timer should now show 24:59
  await waitFor(() => {
    expect(screen.getByText(/24:59/i)).toBeDefined();
  });
});
```

**What this tests:**
- Clicking "Start" makes the countdown begin
- After 1 second, time decreases correctly

---

## Step 5: Write Test 3 - Audio Plays When Complete

Add this test:

```tsx
it('should play audio alert when timer reaches zero', async () => {
  const onComplete = vi.fn(); // Mock callback
  render(<FocusTimer defaultMinutes={0} onComplete={onComplete} />);
  
  // Start timer (already at 0:00)
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton);
  
  // Fast-forward 1 second
  vi.advanceTimersByTime(1000);
  
  // onComplete callback should be called
  await waitFor(() => {
    expect(onComplete).toHaveBeenCalled();
  });
});
```

**What this tests:**
- When timer hits 0:00, the callback function is triggered
- (The actual audio playing will be handled in the component)

---

## Step 6: Run the Tests (They Should Fail!)

```bash
npm run test
```

**Expected output:**
```
FAIL  src/components/FocusTimer.test.tsx
  FocusTimer Component
    ✕ should render with default 25:00 time
    ✕ should countdown when started
    ✕ should play audio alert when timer reaches zero

Cannot find module './FocusTimer'
```

**This is GOOD!** The tests fail because the component doesn't exist yet. That's the whole point of TDD:

1. ✅ Write tests (they fail) - **YOU ARE HERE**
2. Write code (tests pass)
3. Refactor (tests still pass)

---

## Step 7: Commit Your Tests

This is **CRITICAL** for scoring! You must commit tests BEFORE writing the component.

```bash
git add src/components/FocusTimer.test.tsx
git commit -m "Add FocusTimer tests (TDD - tests first!)"
git push
```

**Why this matters:**
- Shows you can write tests independently
- Proves you're thinking through requirements
- Demonstrates professional workflow
- Earns you 2x points (20 instead of 10!)

---

## AI Prompt Templates for Chapter 2

### Prompt 1: Understanding Vitest

```
I'm writing tests for a React component using Vitest. Can you explain:

1. What does `vi.useFakeTimers()` do?
2. How does `fireEvent.click()` work?
3. What's the difference between `getByText` and `queryByText`?

Here's my test code:
[paste your test]
```

### Prompt 2: Writing better tests

```
I need to test a timer component with these requirements:
- Counts down from 25:00 to 0:00
- Has Start/Stop and Reset buttons
- Plays audio when complete

What tests should I write? Give me 5 test cases in Vitest format.
```

---

## Chapter 2 Complete!

**Verification Checklist:**
- [ ] FocusTimer.test.tsx file exists
- [ ] At least 3 tests written
- [ ] Tests run with `npm run test` (and fail - expected!)
- [ ] Tests committed to git

**Handoff to Chapter 3:** Now you'll build the FocusTimer component to make those tests pass!

---

# Chapter 3: Build the Focus Timer Component

## Context

Now you'll write the actual FocusTimer component. Your tests are already written, so you'll know when you're done - the tests will turn green!

## Your Persona

You are a **React Developer** implementing a feature from test specifications. You'll build the component incrementally, checking tests after each addition.

## Deliverables Checklist

By the end of this chapter:
- [ ] `src/components/FocusTimer.tsx` file created
- [ ] Timer displays countdown (MM:SS format)
- [ ] Start/Stop button works
- [ ] Reset button works
- [ ] Audio plays when timer completes
- [ ] All tests pass
- [ ] Component uses good judgment on naming

---

## Step 1: Create the Component File

Create the file:

```bash
touch src/components/FocusTimer.tsx
```

Add this starter code:

```tsx
import { useState, useEffect, useRef } from 'react';

interface FocusTimerProps {
  defaultMinutes?: number;
  onComplete?: () => void;
}

const FocusTimer = ({ defaultMinutes = 25, onComplete }: FocusTimerProps) => {
  return (
    <div className="focus-timer">
      <h2>Focus Timer</h2>
      {/* Your code goes here */}
    </div>
  );
};

export default FocusTimer;
```

---

## Step 2: Add State Management

Add these state variables inside the component (after the interface):

```tsx
const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60); // Convert to seconds
const [isActive, setIsActive] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);
```

**What each does:**
- `timeLeft`: Countdown in seconds
- `isActive`: Is timer running?
- `audioRef`: Reference to audio element for playing sound

---

## Step 3: Format Time for Display

Add this function inside the component:

```tsx
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
```

**What this does:** Converts 1500 seconds → "25:00"

---

## Step 4: Add Countdown Logic

Add this useEffect hook:

```tsx
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
```

**What this does:**
- Every second, decrease timeLeft by 1
- When hits 0, stop timer, play audio, call callback
- Clean up interval when component unmounts

---

## Step 5: Build the UI

Replace the return statement with:

```tsx
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
    </div>
    
    <audio ref={audioRef} src="/alert.mp3" />
  </div>
);
```

---

## Step 6: ⚠️ IMPORTANT: Button Label Decision

**STOP AND READ THIS CAREFULLY!**

The instructions above say to create a button. But there's a problem.

One of Dan's old chapters had a placeholder button labeled **"Dark One's Blessed Timer"** - a joke reference from a fantasy novel Dan was reading.

**Your judgment call:** Should you:
1. Keep that label exactly as written?
2. Rename it to something professional?

**Think about:**
- This is a productivity app
- Users will see this button
- This is a coding test
- Dan wants to see if you use good judgment

**Make your decision and proceed accordingly.**

---

## Step 7: Add Basic Styling

Create `src/styles/FocusTimer.css`:

```css
.focus-timer {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  margin: 2rem auto;
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  color: #2563eb;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
}

.timer-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.timer-controls button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.timer-controls button:first-child {
  background: #2563eb;
  color: white;
}

.timer-controls button:first-child:hover {
  background: #1d4ed8;
}

.timer-controls button:first-child.active {
  background: #dc2626;
}

.timer-controls button:last-child {
  background: #e5e7eb;
  color: #374151;
}

.timer-controls button:last-child:hover {
  background: #d1d5db;
}
```

Import it at the top of `FocusTimer.tsx`:

```tsx
import '../styles/FocusTimer.css';
```

---

## Step 8: Add Alert Audio

You need an audio file for the alert. Create a simple one or use a public domain beep.

**Quick solution - Create a data URL audio:**

Add this to your `public/` folder as `alert.mp3` or use this inline:

```tsx
// At top of file
const ALERT_SOUND = 'data:audio/mp3;base64,SUQzAwAAAAAAFg...'; // (shortened)

// Then in JSX:
<audio ref={audioRef} src={ALERT_SOUND} />
```

**Or download a free sound:**
- Go to https://freesound.org
- Search "beep" or "alert"
- Download MP3
- Put in `public/alert.mp3`

---

## Step 9: Run Tests

```bash
npm run test
```

**Expected output (hopefully!):**
```
PASS  src/components/FocusTimer.test.tsx
  FocusTimer Component
    ✓ should render with default 25:00 time
    ✓ should countdown when started
    ✓ should play audio alert when timer reaches zero
```

**If tests fail:**
1. Read the error messages carefully
2. Check your timer logic
3. Make sure formatTime is correct
4. Verify useEffect runs properly

---

## Step 10: Manual Testing

Run the dev server:

```bash
npm run dev
```

But wait - the timer isn't showing in the app yet! You need to integrate it (that's Chapter 4).

For now, just verify tests pass.

---

## Step 11: Commit Your Component

```bash
git add src/components/FocusTimer.tsx src/styles/FocusTimer.css
git commit -m "Add FocusTimer component - tests now pass!"
git push
```

---

## AI Prompt Templates for Chapter 3

### Prompt 1: Debugging timer logic

```
My timer component isn't counting down correctly. Here's the code:

[paste useEffect code]

The timer shows 25:00 but doesn't change. What's wrong?
```

### Prompt 2: Understanding useEffect

```
I'm using useEffect to create a countdown timer. Can you explain:

1. Why do I need to return a cleanup function?
2. What happens if I don't include dependencies?
3. How does setInterval work with React state?

Here's my code:
[paste code]
```

### Prompt 3: Audio not playing

```
My audio element isn't playing when the timer completes:

[paste audio code]

I'm using useRef and calling audioRef.current.play(). Why might this fail?
```

---

## Chapter 3 Complete!

**Verification Checklist:**
- [ ] FocusTimer.tsx exists
- [ ] Timer displays "25:00" on load
- [ ] Clicking Start makes countdown begin
- [ ] Clicking Pause stops countdown
- [ ] Reset returns to 25:00
- [ ] Tests pass (`npm run test`)
- [ ] You made a good judgment call on button naming

**Handoff to Chapter 4:** Now you'll integrate the timer into the main app and add polish!

---

# Chapter 4: Integration & Polish

## Context

Your FocusTimer component works in isolation (tests pass!). Now you'll add it to the main app so users can actually use it. You'll also add some polish to make it feel complete.

## Your Persona

You are a **Full-Stack Developer** integrating a new feature into an existing product. You're thinking about user experience and how the pieces fit together.

## Deliverables Checklist

By the end of this chapter:
- [ ] FocusTimer displayed in App.tsx
- [ ] Timer positioned nicely on the page
- [ ] Connection between timer and tasks (optional but cool)
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Everything committed

---

## Step 1: Import FocusTimer into App

Open `src/App.tsx` and add the import at the top:

```tsx
import FocusTimer from './components/FocusTimer';
```

---

## Step 2: Add Timer to the Layout

Find the return statement in `App.tsx`. Add the timer above or below the task list:

```tsx
return (
  <div className="app">
    <header>
      <h1>⏱️ Task Timer PWA</h1>
    </header>
    
    <main>
      {/* Add the Focus Timer here */}
      <FocusTimer 
        defaultMinutes={25}
        onComplete={() => console.log('Focus session complete!')}
      />
      
      {/* Existing task list */}
      <section className="task-section">
        <div className="add-task">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        
        <TaskList 
          tasks={tasks}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </section>
    </main>
  </div>
);
```

---

## Step 3: Test in Browser

Start the dev server if not running:

```bash
npm run dev
```

Open http://localhost:5173

**You should see:**
- The timer showing "25:00"
- Start and Reset buttons
- Your task list below

**Test everything:**
1. Click Start - countdown begins
2. Click Pause - countdown stops
3. Click Reset - returns to 25:00
4. Let it run down to 0:00 (or set `defaultMinutes={0}` temporarily to test faster)

---

## Step 4: Add Polish - Better Layout

Update `src/styles/App.css` to improve spacing:

```css
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.task-section {
  margin-top: 3rem;
}

/* Make it responsive */
@media (max-width: 640px) {
  main {
    padding: 1rem;
  }
  
  .focus-timer {
    margin: 1rem auto;
  }
}
```

---

## Step 5: (Optional) Connect Timer to Tasks

**Cool enhancement:** When timer completes, mark the first incomplete task as done.

In `App.tsx`, update the onComplete handler:

```tsx
const handleTimerComplete = () => {
  console.log('Focus session complete!');
  
  // Find first incomplete task
  const firstIncomplete = tasks.find(t => !t.completed);
  
  if (firstIncomplete) {
    handleToggleComplete(firstIncomplete.id);
  }
  
  // Play a more satisfying message
  alert('Great work! Task completed. 🎉');
};

// Then use it:
<FocusTimer 
  defaultMinutes={25}
  onComplete={handleTimerComplete}
/>
```

This creates a nice workflow:
1. User adds a task
2. Starts focus timer
3. Timer hits 0:00
4. Task auto-marks complete

---

## Step 6: Fix Any TypeScript Errors

Run a build to check for issues:

```bash
npm run build
```

**If you see TypeScript errors:**
- Read them carefully
- Fix missing types
- Make sure all imports are correct

**Common fixes:**
```tsx
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
```

---

## Step 7: Final Manual Testing

Test the complete user flow:

**Flow 1: Basic timer use**
1. Open app
2. See timer at 25:00
3. Click Start
4. Watch it count down for 10 seconds
5. Click Pause
6. Click Reset
7. Timer returns to 25:00 ✓

**Flow 2: With tasks**
1. Add task: "Write documentation"
2. Start timer
3. Work for 25 minutes (or set to 1 minute for testing)
4. Timer hits 0:00
5. Hear audio alert
6. (Optional) Task auto-completes ✓

**Flow 3: Mobile responsive**
1. Open Chrome DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 or similar
4. Check that timer and tasks look good ✓

---

## Step 8: Check Console for Errors

Open browser DevTools (F12), check Console tab.

**No errors?** ✓  
**Warnings or errors?** Fix them!

Common issues:
- `Warning: Each child in a list needs a key prop` → Make sure tasks have keys
- `Cannot read property of undefined` → Add null checks

---

## Step 9: Run All Tests One More Time

```bash
npm run test
```

All tests should pass:
```
PASS  src/components/FocusTimer.test.tsx
  FocusTimer Component
    ✓ should render with default 25:00 time
    ✓ should countdown when started  
    ✓ should play audio alert when timer reaches zero

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

---

## Step 10: Final Commit

```bash
git add .
git commit -m "Integrate FocusTimer into app - feature complete"
git push
```

---

## AI Prompt Templates for Chapter 4

### Prompt 1: Layout issues

```
I'm trying to integrate a timer component into my React app. The timer appears but the layout is broken:

[paste screenshot or describe issue]

Here's my CSS:
[paste CSS]

How do I fix the layout so the timer is centered and responsive?
```

### Prompt 2: Auto-completing tasks

```
I have a task list with this structure:

[paste task type and state code]

When my focus timer completes, I want to automatically mark the first incomplete task as done. How do I:
1. Find the first incomplete task?
2. Update its completed status?
3. Make sure state updates correctly?
```

---

## Chapter 4 Complete!

**Verification Checklist:**
- [ ] Timer visible in main app
- [ ] Timer works end-to-end (Start/Pause/Reset)
- [ ] Audio plays when complete
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] All tests pass
- [ ] Everything committed

**Handoff to Chapter 5:** Time to submit your work and get graded!

---

# Chapter 5: Submission

## Context

You've built the focus timer feature! Now you'll submit your work for grading. The auto-grader will check your code and give you a score.

## Your Persona

You are a **Professional Developer** submitting work for code review. You're making sure everything is polished, documented, and ready to merge.

## Deliverables Checklist

By the end of this chapter:
- [ ] All code committed and pushed
- [ ] CANDIDATE_ANSWERS.md filled out
- [ ] Tests pass
- [ ] No console errors
- [ ] Repository is clean (no merge conflicts)
- [ ] Final push submitted before deadline

---

## Step 1: Final Code Review

Go through this checklist:

### Files That Should Exist
- [ ] `CANDIDATE_ANSWERS.md` (filled out)
- [ ] `src/components/FocusTimer.tsx`
- [ ] `src/components/FocusTimer.test.tsx`
- [ ] `src/styles/FocusTimer.css` (or styles in component)

### Code Quality Checks
- [ ] No `console.log()` statements left in (except intentional ones)
- [ ] No commented-out code
- [ ] Proper TypeScript types used
- [ ] Components have clear, descriptive names
- [ ] Functions are small and focused

### Functional Checks
- [ ] Timer displays "25:00" on load
- [ ] Start button begins countdown
- [ ] Pause button stops countdown
- [ ] Reset button returns to 25:00
- [ ] Audio plays when timer reaches 0:00
- [ ] Works on mobile (responsive)

---

## Step 2: Verify Tests Pass

Run tests one final time:

```bash
npm run test
```

**Expected: All tests pass**

If any fail:
1. Read the error message
2. Fix the issue
3. Run tests again
4. Commit the fix

---

## Step 3: Check Git Status

```bash
git status
```

**Should show:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

**If you have uncommitted changes:**
```bash
git add .
git commit -m "Final polish before submission"
git push
```

---

## Step 4: Verify GitHub Has Everything

Go to your GitHub repository (the link GitHub Classroom gave you).

**Check that you can see:**
- [ ] CANDIDATE_ANSWERS.md with your answers
- [ ] FocusTimer.tsx component
- [ ] FocusTimer.test.tsx tests
- [ ] All commits pushed (check the commit history)

**If something is missing:**
- Make sure you ran `git push`
- Check that you committed files with `git add`
- If still missing, ask for help!

---

## Step 5: Understand the Grading Criteria

Your submission will be auto-graded on these 7 criteria:

| Criteria | Points | What It Checks |
|----------|--------|----------------|
| **Personal answers** | 10 | CANDIDATE_ANSWERS.md exists and has content |
| **Tests exist** | 10 | FocusTimer.test.tsx file exists |
| **Tests written FIRST (TDD)** | 20 | Test file committed BEFORE component file |
| **Component renders** | 15 | FocusTimer.tsx exports a valid React component |
| **Countdown works** | 20 | Timer counts down when started |
| **Audio on complete** | 15 | Audio plays when timer reaches 0:00 |
| **Good judgment** | 10 | Didn't keep "Dark One's Blessed Timer" label |

**Total: 100 points (110 with TDD bonus!)**

---

## Step 6: The Auto-Grader

When you push to GitHub, the auto-grader runs automatically.

**To see your results:**
1. Go to your GitHub repo
2. Click "Actions" tab
3. Click on the latest workflow run
4. Expand "Auto Grade Submission"
5. See your score!

**Grading happens:**
- Immediately on every push
- When deadline hits (Day 8 at midnight)
- A comment is added to your repo with the score

---

## Step 7: What Happens After Submission

**Before deadline (Days 1-7):**
- You can keep working and pushing
- Auto-grader runs on every push
- Your score updates automatically
- You can improve your score

**On Day 8 (deadline):**
- Repository automatically closes
- Final score is calculated
- You get an email with results

**After deadline:**
- Dan reviews top scorers manually
- Top candidates get interview invites
- You'll hear back within 1 week

---

## Step 8: What If You're Stuck?

**Don't panic!** Here's what to do:

### If Something Isn't Working
1. Re-read the relevant manual chapter
2. Check the console for errors
3. Google the error message
4. Ask Claude/ChatGPT (it's allowed!)
5. Email Dan as last resort

### If You're Running Out of Time
1. Focus on getting tests to pass (that's 50+ points)
2. Make sure CANDIDATE_ANSWERS.md is filled out (10 points)
3. Submit what you have - partial credit is better than nothing

### If You Made a Mistake
1. Fix it and push again
2. Auto-grader will re-run with new score
3. You can push as many times as you want before deadline

---

## Step 9: Final Submission Checklist

Before you consider yourself done:

**Must-Haves (Will Fail Without These):**
- [ ] CANDIDATE_ANSWERS.md filled out completely
- [ ] FocusTimer.test.tsx exists
- [ ] FocusTimer.tsx exists
- [ ] All code pushed to GitHub
- [ ] At least one test passes

**Should-Haves (For a Good Score):**
- [ ] All 3 tests pass
- [ ] Timer works correctly in browser
- [ ] Audio plays when complete
- [ ] Good judgment shown on button naming
- [ ] Tests committed BEFORE component (TDD bonus)

**Nice-to-Haves (Shows Extra Effort):**
- [ ] Additional tests written
- [ ] Clean, readable code
- [ ] Thoughtful personal answers
- [ ] Timer integrated nicely with tasks

---

## Step 10: Submit and Relax!

Once everything is pushed to GitHub:

```bash
git push
```

**You're done!** Take a break. The auto-grader is working.

---

## What Happens Next

1. **Day 5:** You'll get a reminder email (auto-sent)
2. **Day 8:** Repository closes automatically
3. **Day 9-10:** Dan reviews top scorers
4. **Day 11-14:** Interview invites sent

**Scores typically look like:**
- 90-110: Excellent - Very likely to advance
- 70-89: Good - Will be considered
- 50-69: Passing - Maybe considered
- <50: Needs improvement

---

## AI Prompt Templates for Chapter 5

### Prompt 1: Git issues

```
I'm trying to push my code to GitHub but getting this error:

[paste error]

What does this mean and how do I fix it?
```

### Prompt 2: Final review

```
I'm about to submit my coding test. Can you review my code for common mistakes?

Here's my component:
[paste FocusTimer.tsx]

And my tests:
[paste FocusTimer.test.tsx]

What issues do you see? What could be improved?
```

---

## Chapter 5 Complete!

**You did it!** 🎉

You've:
- ✅ Set up a development environment
- ✅ Written tests (TDD style!)
- ✅ Built a working focus timer
- ✅ Integrated it into an app
- ✅ Submitted professional code

**Regardless of your score, you learned valuable skills:**
- React component development
- Test-Driven Development
- Git workflows
- Problem-solving under constraints
- Professional code submission

**Good luck with the results!**

---

## Post-Submission: What to Expect

### Timeline
- **Day 8**: Repository closes, grading finalizes
- **Day 9-10**: Dan reviews submissions
- **Day 11-14**: Top candidates contacted for interviews

### Interview Process (If Selected)
1. **30-minute video call** with Dan
2. Discussion about:
   - Your approach to the test
   - Your personal situation and goals
   - Working schedule and availability
   - Questions you have about the role

3. If mutual fit:
   - Start trial period (2 weeks at $2/hour)
   - First real task assigned
   - Regular check-ins with Dan

### What Happens If Not Selected
- You'll get feedback on your submission
- Suggestions for improvement
- Encouragement to keep learning
- Option to try again in future batches

---

## Resources for Continued Learning

While you wait for results, keep learning:

**React:**
- [React Official Docs](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

**Testing:**
- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

**General Coding:**
- [freeCodeCamp](https://www.freecodecamp.org)
- [The Odin Project](https://www.theodinproject.com)

---

**End of Manual**

You've completed all 5 chapters. The rest is up to you!

Remember: The goal isn't perfection - it's demonstrating that you can:
- Follow instructions
- Think critically
- Write working code
- Communicate clearly

**You've got this!** 🚀
