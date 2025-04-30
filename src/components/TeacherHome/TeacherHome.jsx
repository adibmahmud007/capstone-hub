import Header from "../Header/Header";
import { useState } from "react";


const TeacherHome = () => {
    const projects = [
        { id: 1, name: "AI Chatbot", details: "An NLP-based chatbot for customer service." },
        { id: 2, name: "E-Commerce Website", details: "A full-stack online shopping platform." },
        { id: 3, name: "Weather App", details: "A real-time weather forecasting application." },
        { id: 4, name: "Library Management System", details: "A digital solution for library book tracking." },
        { id: 5, name: "Portfolio Website", details: "A personal portfolio showcasing projects and skills." },
        { id: 6, name: "Social Media Dashboard", details: "A platform for managing multiple social accounts." },
        { id: 7, name: "Task Manager", details: "A productivity tool for managing tasks and deadlines." },
        { id: 8, name: "Online Learning Platform", details: "An e-learning system for students and teachers." },
    ];
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <Header />

                {/* Content */}
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Search */}
                    <div className="flex justify-center mb-12">
                        <div className="relative bg-gradient-to-r from-[#4a4d59] via-[#70718c] to-[#f6f6f8] rounded-xl  w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="Search for projects..."
                                className="w-full pl-12 pr-4 py-3 text-white text-lg placeholder:text-white placeholder:text-lg  border-2 border-gray-800 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 4a7 7 0 015.657 11.313l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243A7 7 0 1111 4z"
                                    />
                                </svg>
                            </span>


                        </div>
                    </div>

                    {/* Projects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <div key={project.id} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">{project.details}</p>
                                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                                        See More
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">No matching projects found.</p>
                        )}
                    </div>
                </main>


            </div>


        </div>
    );
};

export default TeacherHome;