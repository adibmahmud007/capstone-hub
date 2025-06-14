import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import '../../App.css';
import { toast } from "react-toastify";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [OtpCode, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleOtpRequest = async () => {
        if (!email) {
            toast.warn("Please enter your email first.");
            return;
        }

        try {
            const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/register-otp-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast.success("OTP sent to your email!");
                setIsOtpSent(true);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error("OTP Error:", error);
            toast.error("Something went wrong while sending OTP.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const userData = {
            email,
            username,
            password,
            OtpCode
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
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                    {/* Left Side - University Branding */}
                    <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
                            <div className="absolute top-1/2 right-10 w-16 h-16 border border-white rounded-full"></div>
                        </div>
                        
                        <div className="text-center z-10">
                            <div className="mb-8">
                                <FaGraduationCap className="text-6xl mx-auto mb-4 text-blue-200" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 leading-tight">
                                Welcome to<br />
                                <span className="text-blue-200">OpenSpace Capstone Repository System</span>
                            </h1>
                            <div className="w-24 h-1 bg-blue-300 mx-auto mb-6"></div>
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                Join our academic community and unlock your potential for excellence in learning and research.
                            </p>
                            
                            <div className="space-y-4 text-left">
                                <div className="flex items-center space-x-3">
                                    <FaShieldAlt className="text-blue-300 text-lg" />
                                    <span className="text-blue-100">Secure & Verified Registration</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaUser className="text-blue-300 text-lg" />
                                    <span className="text-blue-100">Personalized Learning Experience</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FaGraduationCap className="text-blue-300 text-lg" />
                                    <span className="text-blue-100">World-Class Education</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                        <div className="max-w-md mx-auto w-full">
                            {/* Mobile Header */}
                            <div className="lg:hidden text-center mb-8">
                                <FaGraduationCap className="text-4xl text-blue-700 mx-auto mb-3" />
                                <h1 className="text-2xl font-bold text-gray-800">OpenSpace Capstone Repository</h1>
                            </div>

                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                                <p className="text-gray-600">Join our academic community today</p>
                                <div className="w-16 h-1 bg-blue-600 mx-auto mt-3"></div>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Username Field */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                            <FaUser />
                                        </span>
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                            placeholder="Enter your full name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Email & OTP Section */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                                <FaEnvelope />
                                            </span>
                                            <input
                                                type="email"
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleOtpRequest}
                                            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 whitespace-nowrap"
                                        >
                                            Send OTP
                                        </button>
                                    </div>
                                </div>

                                {/* OTP Field */}
                                {isOtpSent && (
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Verification Code
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                                                <FaShieldAlt />
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl bg-green-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
                                                placeholder="Enter 6-digit OTP"
                                                value={OtpCode}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-sm text-green-600 mt-1">
                                            OTP sent successfully! Check your email.
                                        </p>
                                    </div>
                                )}

                                {/* Password Field */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                                            <FaLock />
                                        </span>
                                        <input
                                            type="password"
                                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating Account...</span>
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                {/* Login Link */}
                                <div className="text-center pt-6 border-t border-gray-100">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login">
                                            <button className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                                                Sign In Here
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;