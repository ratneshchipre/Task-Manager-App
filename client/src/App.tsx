import { useState } from 'react';
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'

type Task = {
  id: number;
  task: string;
  completed?: boolean;
};

const App = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  const handleListSelect = (tasks: Task[]) => {
    setActiveTasks(tasks);
  };

  const handleTasksChange = (tasks: Task[]) => {
    setActiveTasks(tasks);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-200">
      <div className="bg-white rounded-xl shadow-lg flex w-[800px] h-[500px] overflow-hidden">
        <Sidebar onListSelect={handleListSelect} />
        <TaskList tasks={activeTasks} onTasksChange={handleTasksChange} />
      </div>
    </div>
  )
}

export default App