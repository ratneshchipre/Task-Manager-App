import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import { useEffect, useState } from "react";
import axios from "axios";

type tasks = {
  _id: string;
  title: string;
  status?: boolean;
};

const Homepage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<tasks[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        console.log(response.data.tasks);
        setTasks(Array.isArray(response.data.tasks) ? response.data.tasks : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-lg min-w-[28rem] h-[30rem] overflow-hidden">
      <div className="p-8 relative">
        <h2 className="text-[#72A1E5] font-bold text-[1.4rem] mb-6 tracking-wide">
          Task Manager
        </h2>
        <div className="flex flex-col h-[400px] px-1.5 py-1 pb-6 overflow-auto">
          <div className="flex flex-col gap-4">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => <Task key={task._id} task={task} />)
            ) : (
              <div>No tasks available</div>
            )}
          </div>
        </div>
        <button
          className="absolute bottom-17 right-7 w-12 h-12 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded-full flex items-center justify-center shadow-lg transition cursor-pointer"
          onClick={() => navigate("/create-task")}
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default Homepage;
