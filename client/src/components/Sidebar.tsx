import { useState } from 'react';

type List = {
  id: number;
  name: string;
  tasks: Task[];
};

type Task = {
  id: number;
  task: string;
  completed?: boolean;
};

const initialLists: List[] = [
  {
    id: 1,
    name: "List #1",
    tasks: [
      { id: 1, task: "Task 1 for List #1" },
      { id: 2, task: "Task 2 for List #1" },
    ],
  },
  {
    id: 2,
    name: "List #2",
    tasks: [
      { id: 1, task: "Task 1 for List #2" },
      { id: 2, task: "Task 2 for List #2" },
    ],
  },
  {
    id: 3,
    name: "List #3",
    tasks: [
      { id: 1, task: "Task 1 for List #3" },
      { id: 2, task: "Task 2 for List #3" },
    ],
  },
];

const Sidebar = ({ onListSelect }: { onListSelect: (tasks: Task[]) => void }) => {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [showPopup, setShowPopup] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList: List = {
        id: lists.length + 1,
        name: newListName,
        tasks: [],
      };
      setLists([...lists, newList]);
      setNewListName('');
      setShowPopup(false);
    }
  };

  return (
    <div className="w-1/3 p-8 border-r border-gray-200 flex flex-col h-full">
      <h2 className="text-teal-500 font-bold text-xl mb-6 tracking-wide">LISTS</h2>
      <div className="flex flex-col gap-2 mb-8">
        {lists.map((list) => (
          <button
            key={list.id}
            className="hover:bg-gray-100 rounded px-4 py-2 text-left"
            onClick={() => onListSelect(list.tasks)}
          >
            {list.name}
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded transition"
          onClick={() => setShowPopup(true)}
        >
          + New List
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add New List</h3>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter list name"
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
                onClick={handleAddList}
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

export default Sidebar; 