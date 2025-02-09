import  { useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css'

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div
      className="flex items-center reg-bg justify-center min-h-screen bg-cover bg-center"
    >
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2  items-center">
          {/* Left Side */}
          <div className="text-white md:ml-[110px]">
            <h1 className="text-4xl md:text-5xl font-bold">Register</h1>
            <p className="text-lg mt-2">Create an account to get started</p>
            <div className="mt-6 border-b-2 w-12"></div>
            <p className="mt-4 text-sm md:text-base max-w-md">
              Register as a student to store and manage your capstone project.
            </p>
            <p className="font-semibold  pt-6">Already have an account? Please Login Here...</p>
            <Link to='/login'><button className="mt-3 cursor-pointer bg-green-500 font-semibold text-white px-8 py-2 rounded-lg hover:bg-green-600">
              Login
            </button></Link>
          </div>

          {/* Right Side */}
          <div className="md:backdrop-blur-sm md:shadow-sm p-6 md:p-10 rounded-xl shadow-lg max-w-sm mx-auto">
            <h2 className="text-white text-2xl font-bold text-center">Sign Up</h2>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-white text-sm font-bold">EMAIL</label>
                <input
                  type="email"
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="text-white text-sm font-bold">USERNAME</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="text-white text-sm font-bold">PASSWORD</label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full cursor-pointer bg-green-500 text-white py-2 rounded-full hover:bg-green-600"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
