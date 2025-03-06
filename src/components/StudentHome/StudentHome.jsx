import { useState } from "react";
import Header from "../Header/Header";

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

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <div className="mb-6">
                <Header></Header>
            </div>
            <div className="container mx-auto mb-4 p-6">
                {/* Search Bar */}
                <div className="flex justify-center mb-[80px]">
                    <input
                        type="text"
                        placeholder="Search for projects..."
                        className="w-[700px] max-w-full p-4 border border-gray-500 hover:border-gray-800 hover:border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-white p-4 rounded-lg shadow-md border">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-gray-600 mt-2">{project.details}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                                See More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
