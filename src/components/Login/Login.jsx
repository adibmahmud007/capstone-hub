import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../App.css";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="flex bg-gradient-to-t from-slate-100 via-slate-200 to-slate-300  items-center justify-center min-h-screen ">
            <div className="w-full max-w-5xl h-[550px] bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col justify-center items-start p-10 text-white login-bg ">
                    
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Login To OpenSpace</h2>
                    <form className="w-full mt-6" onSubmit={handleSubmit}>
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
                        <div className="flex justify-between text-sm text-gray-600 mb-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Remember
                            </label>
                            <a href="#" className="hover:text-purple-500">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            LOGIN
                        </button>
                        <div>
                            <p className="font-normal text-gray-500 pt-6 pb-4">Dont have an account? Please Signup Here <Link to='/'><button className=" cursor-pointer text-blue-500 font-semibold rounded-lg hover:text-blue-600">
                                Signup
                            </button></Link></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
