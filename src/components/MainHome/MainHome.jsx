/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Search, User, BookOpen, Phone, HelpCircle, X, Users, Calendar, Tag, Lightbulb, GraduationCap, BookOpenCheck, FolderOpenDot, FolderSearch, Menu } from "lucide-react";

// import logo from "../../assets/bubt-seeklogo";

const ITEMS_PER_PAGE = 8;

const MainHome = () => {
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
                console.log(projects.projectCategory, 'from fetch project')
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
        project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-blue-300 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-blue-600 text-xl font-semibold animate-pulse">Discovering Amazing Projects</p>
                <div className="flex justify-center mt-3 space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                </div>
            </div>
        </div>
    );



    const Header = () => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        return (
            <>
                <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl sticky top-0 z-40">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-300 rounded-xl flex items-center justify-center shadow-lg">
                                        <GraduationCap className="w-6 h-6 text-blue-900" />
                                    </div>
                                    <span className="text-2xl font-bold text-white">
                                        OpenSpace
                                    </span>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-8">
                                <a href="/" className="flex items-center space-x-2 text-blue-200 font-semibold hover:text-white transition-colors duration-200">
                                    <span>Home</span>
                                </a>
                                <a href="/contacts" className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-200">
                                    <Phone className="w-4 h-4" />
                                    <span>Contacts</span>
                                </a>
                                <a href="/about" className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-200">
                                    <Users className="w-4 h-4" />
                                    <span>About</span>
                                </a>
                                <a href="/help" className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors duration-200">
                                    <HelpCircle className="w-4 h-4" />
                                    <span>Help</span>
                                </a>
                            </nav>

                            {/* Desktop Auth Buttons */}
                            <div className="hidden md:flex items-center space-x-3">
                                <a href="/register" className="px-4 py-2 text-blue-200 font-semibold hover:text-white transition-colors duration-200">
                                    Sign Up
                                </a>
                                <a href="/login" className="px-6 py-2 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg">
                                    Sign In
                                </a>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-blue-200 hover:text-white focus:outline-none"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-blue-900 bg-opacity-95 z-30 pt-16">
                        <div className="container mx-auto px-6 py-4">
                            <nav className="flex flex-col space-y-6">
                                <a
                                    href="/"
                                    className="flex items-center space-x-3 text-blue-200 text-lg font-semibold hover:text-white transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span>Home</span>
                                </a>
                                <a
                                    href="/contacts"
                                    className="flex items-center space-x-3 text-blue-300 text-lg hover:text-white transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>Contacts</span>
                                </a>
                                <a
                                    href="/about"
                                    className="flex items-center space-x-3 text-blue-300 text-lg hover:text-white transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Users className="w-5 h-5" />
                                    <span>About</span>
                                </a>
                                <a
                                    href="/help"
                                    className="flex items-center space-x-3 text-blue-300 text-lg hover:text-white transition-colors duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    <span>Help</span>
                                </a>
                            </nav>

                            <div className="mt-8 pt-6 border-t border-blue-800 flex flex-col space-y-4">
                                <a
                                    href="/register"
                                    className="px-6 py-3 text-center text-blue-200 font-semibold hover:text-white transition-colors duration-200 border border-blue-200 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </a>
                                <a
                                    href="/login"
                                    className="px-6 py-3 text-center bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign In
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />

            <main className="container mx-auto px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4">
                        Explore OpenSpace Capstone Repository
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover groundbreaking projects and research from talented students and researchers
                    </p>
                </div>

                {/* Search Section */}
                <div className="flex justify-center mb-16">
                    <div className="relative w-full max-w-3xl">
                        <input
                            type="text"
                            placeholder="Search projects, technologies, or teams..."
                            className="w-full pl-14 pr-6 py-5 text-gray-700 text-lg placeholder:text-gray-400 bg-white border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                            <Search className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                        {currentItems.length > 0 ? (
                            currentItems.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-blue-100"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Top accent */}
                                    <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"></div>

                                    <div className="p-6 relative z-10">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                {/* Dynamic icon based on project category */}
                                                {project.projectCategory === 'Thesis' ? (
                                                    <GraduationCap className="w-6 h-6 text-white" />
                                                ) : project.projectCategory === 'Research Project' ? (
                                                    <BookOpenCheck className="w-6 h-6 text-white" />
                                                ) : project.projectCategory === 'Capstone Project' ? (
                                                    <FolderOpenDot className="w-6 h-6 text-white" />
                                                ) : (
                                                    // Default icon
                                                    <FolderSearch className="w-6 h-6 text-white" />
                                                )}
                                            </div>
                                            <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-blue-200">
                                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                                    {project.projectCategory}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                                            {project.projectTitle}
                                        </h3>

                                        {/* Info */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Users className="w-4 h-4 text-blue-500 mr-2" />
                                                <span className="font-medium text-gray-700">Team:</span>
                                                <span className="ml-2 text-gray-900 truncate">{project.teamName}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <User className="w-4 h-4 text-purple-500 mr-2" />
                                                <span className="font-medium text-gray-700">Supervisor:</span>
                                                <span className="ml-2 text-gray-900 truncate">{project.supervisor}</span>
                                            </div>
                                        </div>

                                        {/* Abstract */}
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                                            {project.abstract}
                                        </p>

                                        {/* Button */}
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:shadow-blue-500/25">
                                            <span className="flex items-center justify-center">
                                                Explore Project
                                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-10 h-10 text-blue-400" />
                                </div>
                                <p className="text-gray-500 text-lg font-medium">No projects found matching your search.</p>
                                <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or browse all projects.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {!loading && filteredProjects.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center items-center gap-6">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg border border-blue-200"
                                }`}
                        >
                            Previous
                        </button>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Page</span>
                            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                                {currentPage}
                            </span>
                            <span className="text-gray-600">of {totalPages}</span>
                        </div>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg border border-blue-200"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

            {/* Enhanced Modal */}
            {selectedProject && (
                <div className="fixed inset-0 flex justify-center items-center z-50 px-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in-95 border border-blue-100">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6 relative">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-3xl font-bold text-white pr-12 leading-tight mb-3">
                                {selectedProject.projectTitle}
                            </h2>
                            <div className="flex flex-wrap gap-4 text-blue-100">
                                <span className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {selectedProject.teamName}
                                </span>
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {selectedProject.supervisor}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(selectedProject.completionDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            {/* Abstract Section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    Project Abstract
                                </h3>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedProject.abstract}
                                    </p>
                                </div>
                            </div>

                            {/* Project Details Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">Category</h4>
                                        <p className="text-gray-900 font-medium text-lg">{selectedProject.projectCategory}</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-purple-600 mb-2 uppercase tracking-wide">Project Type</h4>
                                        <p className="text-gray-900 font-medium text-lg">{selectedProject.projectType}</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-green-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies?.map((tech, index) => (
                                                <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-full shadow-sm">
                                                    {tech}
                                                </span>
                                            )) || <span className="text-gray-500 italic">Not specified</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-orange-600 mb-2 uppercase tracking-wide">Completion Date</h4>
                                        <p className="text-gray-900 font-medium text-lg">{new Date(selectedProject.completionDate).toDateString()}</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">Created At</h4>
                                        <p className="text-gray-900 font-medium text-lg">{new Date(selectedProject.createdAt).toLocaleString()}</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm">
                                        <h4 className="text-sm font-semibold text-pink-600 mb-3 uppercase tracking-wide">Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.keywords?.map((keyword, index) => (
                                                <span key={index} className="px-3 py-1 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 text-sm font-medium rounded-full border border-pink-300">
                                                    #{keyword}
                                                </span>
                                            )) || <span className="text-gray-500 italic">Not specified</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Future Improvements */}
                            {selectedProject.furtherImprovement && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-amber-500" />
                                        Future Improvements
                                    </h3>
                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-amber-500">
                                        <div className="overflow-y-auto max-h-64 pr-2"> {/* Added max height and scroll */}
                                            <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                                                {selectedProject.furtherImprovement}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
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
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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

export default MainHome;