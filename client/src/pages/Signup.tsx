import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

type SignupFormDataType = {
  username: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormDataType>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/sign-up", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response.data.success === true) {
        navigate("/log-in");
        toast.success("Sign Up Successfull!");
      } else {
        toast.error("Sign Up Failed! Try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("User with this email or username already exists");
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-lg min-w-[28rem] p-8">
      <h2 className="text-[#72A1E5] font-bold text-[1.4rem] mb-6 tracking-wide">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#72A1E5]"
            required
          />
        </div>

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
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/log-in" className="text-[#72A1E5] hover:text-[#507FC3]">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
