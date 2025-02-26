import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

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
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-5xl h-[550px] bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col justify-center items-start p-10 text-white reg-bg ">


                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Signup to OpenSpace</h2>
                    <form className="w-full mt-6" onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your Username"
                                value={email}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaUser />
                            </span>
                            <input
                                type="email"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Remember
                            </label>
                            <a href="#" className="hover:text-purple-500">Forgot password?</a>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-rose-500 to-rose-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Signup
                        </button>
                        <div>
                            <p className="font-semibold text-gray-500 pt-6 pb-4">Already have an account? Please Login Here <Link to='/login'><button className=" cursor-pointer text-green-500 font-light rounded-lg hover:text-green-600">
                                Login
                            </button></Link></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Registration;
