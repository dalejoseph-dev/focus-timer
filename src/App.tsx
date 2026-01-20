import { useState } from 'react';
import TaskList from './components/TaskList';
import type { Task } from './types';
import './styles/App.css';
import FocusTimer from './components/FocusTimer.tsx' 

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  // Find first incomplete task
  const handleTimerComplete = () => {
    console.log('Focus session complete!');

    const firstIncomplete = tasks.find(t => !t.completed);

    if(firstIncomplete){
      handleToggleComplete(firstIncomplete.id);
    }

    // Play a more satisfying message
    alert('Great work! task completed 🎉')
  };

  // Then use it:
    <FocusTimer 
      defaultMinutes={25}
      onComplete={handleTimerComplete}
    />

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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
              aria-label="New task"
            />
            <button onClick={handleAddTask} aria-label="Add task">
              Add
            </button>
          </div>

          <TaskList 
            tasks={tasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        </section>
      </main>

      <footer>
        <p>Built for coding test · Part-time Junior Developer Position</p>
      </footer>
    </div>
  );
}

export default App;
