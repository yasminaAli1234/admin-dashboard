import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import Loading from "../../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please Enter the Email.");
      return;
    }
    if (!password) {
      toast.error("Please Enter the Password.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    setIsLoading(true);
    try {
      const response = await axios.post("https://marfaa-alex.com/api/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        console.log("Response:", response.data);

        const userData = {
          ...response.data.user,
          token: [response.data.token],
          roles: [response.data.user?.role],
        };

        setUserData(userData);
        setUserType(response.data.user.role);
        console.log("response role", response.data.user.role);
      } else {
        toast.error("Unexpected error occurred during login.");
      }
    } catch (error) {
      if (error?.response?.data?.faield === "creational not Valid") {
        toast.error("Email or Password is incorrect");
      } else {
        console.error("Error submitting form:", error);
        toast.error(error?.response?.data?.error || "Network error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      console.log("Calling auth.login with data:", userData);
      auth.login(userData);
      setIsLoading(false);

        navigate("/dashboard", { replace: true });
  
    }
  }, [userData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 shadow-2xl rounded-2xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-mainColor">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mainColor focus:border-mainColor transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mainColor focus:border-mainColor transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-10 right-4 text-2xl cursor-pointer text-gray-500 hover:text-mainColor transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* {showPassword ? <IoMdEyeOff /> : <IoMdEye />} */}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-mainColor text-white bg-green py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all ease-in-out duration-200"
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-lg">
          Don't have an account?{" "}
          <Link to="/sign_agent" className="text-mainColor font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
