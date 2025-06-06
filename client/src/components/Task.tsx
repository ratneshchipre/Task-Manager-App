import { Link } from "react-router-dom";

type Task = {
  _id: string;
  title: string;
  status?: boolean;
};

interface TaskProps {
  task: Task;
  onDelete: () => void;
}

const Task = ({ task, onDelete }: TaskProps) => {
  return (
    <div
      className={`bg-white rounded shadow p-4 select-none transition border-[1px] group relative ${
        task.status === true
          ? "line-through border-green-500 bg-green-50 text-gray-600"
          : "border-gray-100"
      }`}
    >
      {task.title}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/edit-task/${task._id}`} className="cursor-pointer">
          <button
            className={`p-1 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill={"currentColor"}
              viewBox="0 0 24 24"
            >
              <path d="m19.41,3c-.78-.78-2.05-.78-2.83,0L4.29,15.29c-.13.13-.22.29-.26.46l-1,4c-.08.34.01.7.26.95.19.19.45.29.71.29.08,0,.16,0,.24-.03l4-1c.18-.04.34-.13.46-.26l12.29-12.29c.78-.78.78-2.05,0-2.83l-1.59-1.59Zm-11.93,15.1l-2.11.53.53-2.11L15,7.41l1.59,1.59-9.1,9.1Zm10.51-10.51l-1.59-1.59,1.59-1.59,1.59,1.58-1.59,1.59Z"></path>
            </svg>
          </button>
        </Link>
        <button
          className={`p-1 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={"currentColor"}
            viewBox="0 0 24 24"
          >
            <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
            <path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
