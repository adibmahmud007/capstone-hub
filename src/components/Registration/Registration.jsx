// import React from 'react';

import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [userType, setUserType] = useState('student');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log({ email, username, password });
    };
    return (
        <section className=" bg-gray-100 h-screen flex justify-center items-center">
            <div className="flex justify-center gap-10 items-center max-w-max bg-white h-[500px] p-5 rounded-xl shadow-md">
                <div className="text-4xl font-bold leading-relaxed ">
                    Register as a Student <br />
                    to Store your <br />
                    Capstone Project
                </div>
                <div className="flex items-center w-[400px] justify-center min-h-screen ">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg  w-full max-w-sm"
                    >
                        {/* <h2 className="text-2xl font-bold mb-6 text-center">Register</h2> */}

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="Enter Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        >
                            Register
                        </button>
                        <div className="mt-6">
                            <p className="text-lg">Already Have an account? <Link to='/login'><span className="text-green-600 hover:text-green-700 cursor-pointer  font-bold">Login</span></Link> Here</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Registration;