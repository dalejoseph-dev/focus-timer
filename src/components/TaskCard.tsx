import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="task-text">{task.text}</span>
      </div>
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label={`Delete "${task.text}"`}
      >
        ✕
      </button>
    </div>
  );
};

export default TaskCard;
