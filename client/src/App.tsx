import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-[#2A2D34]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/log-in" element={<Login />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
