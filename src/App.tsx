import { useState } from 'react';
import TaskList from './components/TaskList';
import type { Task } from './types';
import './styles/App.css';

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
        <p className="subtitle">Simple task tracking by Dan Donahue</p>
      </header>

      <main>
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
