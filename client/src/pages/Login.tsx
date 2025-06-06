import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type LoginFormDataType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/log-in", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response.data.success === true) {
        navigate("/");
        toast.success("Log In Successfull!");
      } else {
        toast.error("Error during login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-lg min-w-[28rem] p-8">
      <h2 className="text-[#72A1E5] font-bold text-[1.4rem] mb-6 tracking-wide">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#72A1E5]"
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#72A1E5]"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#72A1E5] hover:bg-[#507FC3] text-white rounded transition cursor-pointer"
        >
          Log In
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-[#72A1E5] hover:text-[#507FC3]">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
