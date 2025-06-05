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

    return (
        <div className="min-h-screen bg-white flex flex-col transition duration-300 ease-in-out">
            <Header />

            <main className="flex-grow container mx-auto px-6 lg:px-8 py-12">
                {/* Search */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search for projects..."
                            className="w-full pl-14 pr-6 py-4 text-blue-900 text-lg placeholder:text-blue-900 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 font-medium"
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
                    <p className="text-blue-600 text-center text-lg font-medium">Loading projects...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                        {currentItems.length > 0 ? (
                            currentItems.map((project, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer"
                                >
                                    <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                        {project.projectTitle}
                                    </h3>
                                    <p className="text-sm font-semibold text-blue-700 mb-1">Team: {project.teamName}</p>
                                    <p className="text-sm text-blue-800 mb-1">Supervisor: {project.supervisor}</p>
                                    <p className="text-black leading-relaxed text-sm mt-2 mb-6 line-clamp-3">
                                        {project.abstract}
                                    </p>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-sm tracking-wide shadow-md hover:shadow-lg"
                                    >
                                        See More
                                    </button>
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

            {/* Popup Modal */}
            {selectedProject && (
                <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
                    <div className="bg-gradient-to-br from-white to-blue-50 border-4 border-blue-300 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-3 right-3 text-black hover:text-red-600 text-xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-blue-950 mb-4">{selectedProject.projectTitle}</h2>
                        <div className="space-y-2 text-blue-950 text-sm">
                            <p><strong>Category:</strong> {selectedProject.projectCategory}</p>
                            <p><strong>Type:</strong> {selectedProject.projectType}</p>
                            <p><strong>Technologies:</strong> {selectedProject.technologies?.join(", ")}</p>
                            <p><strong>Keywords:</strong> {selectedProject.keywords?.join(", ")}</p>
                            <p><strong>Completion Date:</strong> {new Date(selectedProject.completionDate).toDateString()}</p>
                            <p><strong>Created At:</strong> {new Date(selectedProject.createdAt).toLocaleString()}</p>
                            {selectedProject.furtherImprovement && (
                                <p><strong>Future Improvement:</strong> {selectedProject.furtherImprovement}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
