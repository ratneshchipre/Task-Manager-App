import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<string>("");

  const handleTaskFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tasks", { title: task });
      console.log(response);
      if (response.data.success === true) {
        navigate("/");
        toast.success("Task created");
      } else {
        toast.error("Failed to create task");
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sm:w-80">
      <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
      <form onSubmit={handleTaskFormSubmit}>
        <input
          type="text"
          name="title"
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter task name"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
