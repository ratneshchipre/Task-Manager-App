import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type EditFormDataType = {
  title: string;
  status: boolean;
};

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<EditFormDataType>({
    title: "",
    status: false,
  });

  const getTaskDetailsById = async () => {
    try {
      const response = await axios.get(`/api/tasks/edit-task/${id}`);
      console.log(response);
      if (response.data.success === true) {
        setFormData({
          title: response.data.task.title,
          status: response.data.task.status,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get task data");
    }
  };

  useEffect(() => {
    getTaskDetailsById();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value === "Completed",
    });
  };

  const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/tasks/edit-task/${id}`, {
        title: formData.title,
        status: formData.status,
      });
      console.log(response);
      if (response.data.success === true) {
        navigate("/");
        toast.success("Task Edited Successfully!");
      } else {
        toast.error("Failed to edit task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-100">
      <form onSubmit={handleEditFormSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <label className="text-lg font-[500] mb-4">Edit Task</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Edit task name"
          />
          <label htmlFor="select" className="text-lg font-[500] mb-4">
            Status
          </label>
          <select
            name="status"
            value={formData.status ? "Completed" : "Incomplete"}
            onChange={handleSelectChange}
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
            <button
              type="submit"
              className="px-4 py-2 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
