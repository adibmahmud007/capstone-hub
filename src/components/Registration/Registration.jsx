import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

import '../../App.css'
import { toast } from "react-toastify";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            email,
            username,
            password
        };

        try {
            const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success("Registration successful! Redirecting to login...");
                navigate("/login");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex items-center bg-gradient-to-t from-slate-100 via-slate-200 to-slate-300  justify-center min-h-screen ">
            <div className="w-full max-w-5xl h-[550px] bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col justify-center items-start p-10 text-white reg-bg "></div>

                {/* Right Side - Signup Form */}
                <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Signup to OpenSpace</h2>
                    <form className="w-full mt-6" onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative mb-4">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaUser />
                            </span>
                            <input
                                type="email"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Remember
                            </label>
                            <a href="#" className="hover:text-purple-500">Forgot password?</a>
                        </div> */}
                        
                        <button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Signup
                        </button>
                        <div>
                            <p className="font-normal text-gray-500 pt-6 pb-4">Already have an account? Please Login Here <Link to='/login'><button className=" cursor-pointer text-green-500 font-semibold rounded-lg hover:text-green-600">
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
