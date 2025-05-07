import { useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loading state changed:", loading);
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Optional: simulate delay for visual feedback
        await new Promise((resolve) => setTimeout(resolve, 5500));

        try {
            const response = await fetch(
                "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, rememberMe }),
                }
            );

            const data = await response.json();
            const token = data.accesstoken;

            if (response.ok && token) {
                const decoded = jwtDecode(token);
                const role = decoded.role;

                localStorage.setItem("token", token);
                toast.success(
                    `Signed in to ${role.charAt(0).toUpperCase() + role.slice(1)} Portal`
                );

                if (role === "student") {
                    navigate("/studentHome");
                } else if (role === "teacher") {
                    navigate("/teacherDashboard");
                } else {
                    navigate("/adminDashboard");
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.",err);
        } finally {
            setLoading(false);
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
                                required
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
                                required
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
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
                        {showForgotPassword && (
                            <ForgotPassword onClose={() => setShowForgotPassword(false)} />
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-rose-500 to-rose-900 text-white py-3 rounded-lg font-semibold transition ${
                                loading
                                    ? "opacity-70 cursor-not-allowed"
                                    : "hover:opacity-90 hover:cursor-pointer"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                    Logging in...
                                </div>
                            ) : (
                                "LOGIN"
                            )}
                        </button>
                        <p className="font-normal text-gray-500 pt-6 pb-4">
                            Don’t have an account? Please Signup Here{" "}
                            <Link to="/">
                                <button className="text-blue-500 font-semibold hover:text-blue-600">
                                    Signup
                                </button>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
