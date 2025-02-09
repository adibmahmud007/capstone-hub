// import React from 'react';

import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/login_bg.jpg')" }}
        >
            <div className="container mx-auto px-4 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2  items-center">
                    {/* Left Side */}
                    <div className="text-black ml-[90px]">
                        <h1 className="text-4xl md:text-5xl font-bold">Login</h1>
                        <p className="text-lg mt-2">Sign in to continue</p>
                        <div className="mt-6 border-b-2 w-12"></div>
                        <p className="mt-4 text-sm md:text-base max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            semper mauris in magna venenatis suscipit.
                        </p>
                        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
                            Learn More
                        </button>
                    </div>

                    {/* Right Side */}
                    <div className="bg-gray-800 bg-opacity-50 p-6 md:p-10 rounded-xl shadow-lg max-w-lg mx-auto">
                        <h2 className="text-white text-2xl font-bold text-center">Sign in</h2>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-white text-sm font-bold">EMAIL</label>
                                <input
                                    type="email"
                                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="hello@exampleforyou.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="text-white text-sm font-bold">PASSWORD</label>
                                <input
                                    type="password"
                                    className="w-full p-2 mt-1 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-6 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;