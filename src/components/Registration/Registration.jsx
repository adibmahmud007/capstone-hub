// import React from 'react';

import { useState } from "react";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log({ email, username, password, userType });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="userType">Register As</label>
                    <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;