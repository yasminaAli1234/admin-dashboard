

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted");
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
        console.log("login success");
        navigate("/"); // Navigate to dashboard
      }, 2000);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">SignUp</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={`w-full py-3 rounded ${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition duration-200`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export default SignUp;


