import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, rememberMe }) // ✅ rememberMe sent to API
            });

            const data = await response.json();
            console.log(data);

            const token = data.accesstoken;
            const decoded = jwtDecode(token);
            const role = decoded.role;
            console.log(decoded, 'from jwt token decoded');
            console.log(role, 'from token getting the role');

            if (response.ok) {
                localStorage.setItem("token", data.accesstoken);
                if (role === "student") {
                    toast.success("Signed in to Student Portal");
                    navigate("/studentHome");
                } else if (role === "teacher") {
                    navigate("/teacherDashboard");
                } else {
                    navigate("/adminDashboard");
                }
            } else {
                toast.error(data.message || "Invalid credentials")
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.", err);
        }
    };

    return (
        <div className="flex bg-gradient-to-t from-slate-100 via-slate-200 to-slate-300 items-center justify-center min-h-screen">
            <div className="w-full max-w-5xl h-[550px] bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:flex flex-col justify-center items-start p-10 text-white login-bg"></div>
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
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)} // ✅ handle change
                                />
                                Remember
                            </label>
                            <span
                                onClick={() => setShowForgotPassword(true)}
                                className="hover:text-purple-500 cursor-pointer"
                            >
                                Forgot password?
                            </span>
                        </div>
                        <div>
                            {showForgotPassword && (
                                <ForgotPassword onClose={() => setShowForgotPassword(false)} />
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-900 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            LOGIN
                        </button>
                        <div>
                            <p className="font-normal text-gray-500 pt-6 pb-4">
                                Dont have an account? Please Signup Here
                                <Link to='/'>
                                    <button className="cursor-pointer text-blue-500 font-semibold rounded-lg hover:text-blue-600">
                                        Signup
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
