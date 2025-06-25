import { useState, useEffect } from "react";
import Header from "../Header/Header";

const ITEMS_PER_PAGE = 8;

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/internal/project");
                const result = await response.json();
                console.log(result.data);
                setProjects(result.data || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((project) =>
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Enhanced Loader Component
    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-blue-700 text-lg font-semibold animate-pulse">Loading Projects</p>
                <div className="flex justify-center mt-2 space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-200"></div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-gradient-to-t from-white via-indigo-50 to-indigo-100 flex flex-col transition duration-300 ease-in-out">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
                {/* Search */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search for projects..."
                            className="w-full pl-14 pr-6 py-4 text-blue-900 text-lg placeholder:text-blue-900 bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 font-medium"
                            style={{ boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.15)' }}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />


                        <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 015.657 11.313l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243A7 7 0 1111 4z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                        {currentItems.length > 0 ? (
                            currentItems.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                                >
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                                    {/* Top accent bar */}
                                    <div className="h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900"></div>

                                    <div className="p-6 relative z-10">
                                        {/* Header section */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
                                                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{project.projectCategory
}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                                                {project.projectTitle}
                                            </h3>
                                        </div>

                                        {/* Info badges */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                                <span className="font-medium text-gray-700">Team:</span>
                                                <span className="ml-1 text-gray-900">{project.teamName}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                <span className="font-medium text-gray-700">Supervisor:</span>
                                                <span className="ml-1 text-gray-900">{project.supervisor}</span>
                                            </div>
                                        </div>

                                        {/* Abstract */}
                                        <div className="mb-6">
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {project.abstract}
                                            </p>
                                        </div>

                                        {/* Button */}
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 group-hover:from-indigo-700 group-hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                View Details
                                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>

                                    {/* Bottom decoration */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </div>
                            ))
                        ) : (
                            <p className="text-blue-600 col-span-full text-center text-lg font-medium">
                                No matching projects found.
                            </p>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && filteredProjects.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
                            className={`px-4 py-2 rounded-lg font-medium text-white ${currentPage === totalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

            {/* Enhanced Modal */}
            {selectedProject && (
                <div className="fixed inset-0 flex justify-center items-center z-50 px-4 bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white border border-blue-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in-95">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 relative">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 text-2xl font-bold"
                            >
                                ×
                            </button>
                            <h2 className="text-3xl font-bold text-white pr-12 leading-tight">
                                {selectedProject.projectTitle}
                            </h2>
                            <div className="flex flex-wrap gap-4 mt-4 text-blue-100">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    {selectedProject.teamName}
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z" clipRule="evenodd" />
                                    </svg>
                                    {selectedProject.supervisor}
                                </span>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            {/* Abstract Section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                    Abstract
                                </h3>
                                <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                                    {selectedProject.abstract}
                                </p>
                            </div>

                            {/* Project Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-blue-800 mb-1">Category</p>
                                        <p className="text-blue-900 font-medium">{selectedProject.projectCategory}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-blue-800 mb-1">Project Type</p>
                                        <p className="text-blue-900 font-medium">{selectedProject.projectType}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-blue-800 mb-2">Technologies Used</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies?.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                                    {tech}
                                                </span>
                                            )) || <span className="text-gray-500">Not specified</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-purple-800 mb-1">Completion Date</p>
                                        <p className="text-purple-900 font-medium">{new Date(selectedProject.completionDate).toDateString()}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-green-800 mb-1">Created At</p>
                                        <p className="text-green-900 font-medium">{new Date(selectedProject.createdAt).toLocaleString()}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-orange-800 mb-2">Keywords</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.keywords?.map((keyword, index) => (
                                                <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 text-xs font-medium rounded-full">
                                                    #{keyword}
                                                </span>
                                            )) || <span className="text-gray-500">Not specified</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Future Improvement Section */}
                            {selectedProject.furtherImprovement && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                        Future Improvements
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl border-l-4 border-indigo-500">
                                        {selectedProject.furtherImprovement}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .animation-delay-100 {
                    animation-delay: 0.1s;
                }
                .animation-delay-150 {
                    animation-delay: 0.15s;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animate-in {
                    animation: animate-in 0.3s ease-out;
                }
                .fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .zoom-in-95 {
                    animation: zoom-in-95 0.3s ease-out;
                }
                @keyframes animate-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes zoom-in-95 {
                    from {
                        transform: scale(0.95);
                    }
                    to {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;