import { useState } from 'react';

type Task = {
  id: number;
  task: string;
  completed?: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
};

const TaskList = ({ tasks, onTasksChange }: TaskListProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleTaskClick = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onTasksChange(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        task: newTaskName,
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskName('');
      setShowPopup(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    onTasksChange(updatedTasks);
  };

  return (
    <div className="w-2/3 p-8 relative">
      <h2 className="text-teal-500 font-bold text-xl mb-6 tracking-wide">TASKS</h2>
      <div className='flex flex-col h-[400px] px-1.5 py-1 overflow-auto'>
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded shadow p-4 cursor-pointer select-none transition group relative ${task.completed ? "line-through text-gray-400" : "hover:bg-gray-50"}`}
              onClick={() => handleTaskClick(task.id)}
            >
              {task.task}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  ✏️
                </button>
                <button
                  className="p-1 bg-red-200 hover:bg-red-300 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute bottom-8 right-8 w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition"
        onClick={() => setShowPopup(true)}
      >
        <span className="text-2xl">+</span>
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter task name"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList; 