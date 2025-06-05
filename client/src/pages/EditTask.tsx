import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <label className="text-lg font-[500] mb-4">Edit Task</label>
        <input
          name="edit-task"
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Edit task name"
        />
        <label htmlFor="select" className="text-lg font-[500] mb-4">
          Status
        </label>
        <select
          name="status"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
