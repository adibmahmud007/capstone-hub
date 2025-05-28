import { useState } from "react";
import Header from "../Header/Header";

// Dummy Teacher Data (Replace with API later)
const projects = [
    { id: 1, name: "AI Chatbot", details: "An NLP-based chatbot for customer service." },
    { id: 2, name: "E-Commerce Website", details: "A full-stack online shopping platform." },
    { id: 3, name: "Weather App", details: "A real-time weather forecasting application." },
    { id: 4, name: "Library Management System", details: "A digital solution for library book tracking." },
    { id: 5, name: "Portfolio Website", details: "A personal portfolio showcasing projects and skills." },
    { id: 6, name: "Social Media Dashboard", details: "A platform for managing multiple social accounts." },
    { id: 7, name: "Task Manager", details: "A productivity tool for managing tasks and deadlines." },
    { id: 8, name: "Online Learning Platform", details: "An e-learning system for students and teachers." },
    { id: 9, name: "Inventory Tracker", details: "A system to monitor stock levels and supplies." },
    { id: 10, name: "News Aggregator", details: "Collects news from various sources and displays them." },
    { id: 11, name: "Recipe Finder", details: "Find recipes based on ingredients you have." },
    { id: 12, name: "Crypto Dashboard", details: "Track cryptocurrency prices and trends." },
    { id: 13, name: "Job Board", details: "A portal for job listings and applications." },
    { id: 14, name: "Fitness Tracker", details: "Tracks workouts, calories, and progress." },
    { id: 15, name: "Music Player", details: "A web app to play and organize music playlists." },
    { id: 16, name: "Budget Planner", details: "Manage income, expenses, and savings." },
    { id: 17, name: "Blog CMS", details: "A content management system for bloggers." },
    { id: 18, name: "Real Estate Listing", details: "Browse and filter homes for sale." },
    { id: 19, name: "Event Scheduler", details: "Plan and manage events and appointments." },
    { id: 20, name: "Pet Adoption", details: "Platform to connect pets with new owners." },
];

const ITEMS_PER_PAGE = 8;

const TeacherDashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTeachers = projects.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredTeachers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
                {/* Search Box */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search for teachers..."
                            className="w-full pl-14 pr-6 py-4 text-blue-900 text-lg placeholder:text-blue-900 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 font-medium"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-blue-900">
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

                {/* Teacher Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                    {currentItems.length > 0 ? (
                        currentItems.map((projects) => (
                            <div
                                key={projects.id}
                                className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer"
                            >
                                <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                    {projects.name}
                                </h3>
                                <p className="text-black leading-relaxed text-base mb-8 opacity-90">
                                    {projects.details}
                                </p>
                                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-sm tracking-wide shadow-md hover:shadow-lg">
                                    See More
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-blue-600 col-span-full text-center text-lg font-medium">
                            No matching teachers found.
                        </p>
                    )}
                </div>

                {/* Pagination Controls */}
                {filteredTeachers.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium text-white ${
                                currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            Previous
                        </button>
                        <span className="text-blue-800 font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium text-white ${
                                currentPage === totalPages
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TeacherDashboard;
