import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-[#2A2D34]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
