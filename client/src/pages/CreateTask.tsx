import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
  const navigate = useNavigate();

  const handleTaskCreation = () => {
    navigate("/");
  };

  const createTask = async () => {
    try {
      await axios.post("/api/tasks");
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
        <input
          type="text"
          name="title"
          onChange={(e) => e.target.value}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter task name"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded cursor-pointer"
            onClick={handleTaskCreation}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
