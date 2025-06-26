/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Section } from "lucide-react";
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaPlus,
  FaTachometerAlt,
  FaMemory,
  FaBug,
  FaEdit,
  FaTimes,
  FaChartLine,
  FaUserGraduate,
  FaCog,
  FaSearch, FaEye, FaSave, FaTrash, FaCalendarAlt, FaCode, FaTags, FaGraduationCap
} from "react-icons/fa";
import { FolderCog } from 'lucide-react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

// ✅ TeacherAdd Component
const TeacherAdd = ({ setActiveModal, setTeacherList, teacherList }) => {
  const [newTeacher, setNewTeacher] = useState({
    shortName: "",
    fullName: "",
    educationalMail: "",
    defaultPassword: "default123",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTeacher = async () => {
    console.log(newTeacher)
    setIsLoading(true);
    try {
      const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/admin/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });

      if (response.ok) {
        // toast.success("Teacher Added Successful")
        alert("Teacher Added Successfully!");
      } else {
        throw new Error("Failed to add teacher");
      }


      const addedTeacher = await response.json();
      setTeacherList([...teacherList, addedTeacher]);
      setNewTeacher({ shortName: "", fullName: "", educationalMail: "", defaultPassword: "default123" });
      setActiveModal(null);
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Failed to add teacher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden transform transition-all duration-300 hover:scale-105">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaUserGraduate className="text-blue-300" />
            Add New Teacher
          </h2>
          <p className="text-blue-200 text-sm mt-1">Create a new teacher account</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Short Name"
                value={newTeacher.shortName}
                onChange={(e) => setNewTeacher({ ...newTeacher, shortName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Educational Email"
                value={newTeacher.educationalMail}
                onChange={(e) => setNewTeacher({ ...newTeacher, educationalMail: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={newTeacher.fullName}
                onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Default Password"
                value={newTeacher.defaultPassword}
                onChange={(e) => setNewTeacher({ ...newTeacher, defaultPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddTeacher}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FaPlus />
                  Add Teacher
                </>
              )}
            </button>

            <button
              onClick={() => setActiveModal(null)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>

        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 text-white hover:text-red-300 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 6;
const ShowProject = ({ setActiveModal }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);


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

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    setDeletingId(id); // Start loading for this item

    try {
      await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/internal/project/${id}`, {
        method: "DELETE",
      });
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null); // Stop loading
    }
  };


  const handleEdit = (project) => {
    setEditProject({
      ...project,
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : '',
      keywords: Array.isArray(project.keywords) ? project.keywords.join(', ') : '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      authors: Array.isArray(project.authors) ? project.authors.join(', ') : ''
    });
  };

  const handleEditSubmit = async (e) => {
  e.preventDefault();
  setEditLoading(true);

  try {
    // ✅ Prepare payload
    const updateData = {
      projectTitle: editProject.projectTitle,
      abstract: editProject.abstract,
      projectType: editProject.projectType,
      keywords: editProject.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k),
      technologies: editProject.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t),
      furtherImprovement: editProject.furtherImprovement,
      department: editProject.department,
      completionDate: editProject.completionDate,
      authors: editProject.authors
        .split(',')
        .map(a => a.trim())
        .filter(a => a),
      projectCategory: editProject.projectCategory
    };

    console.log("📦 Sending Update Data:", updateData);

    const response = await fetch(
      `https://capstone-repo-2933d2307df0.herokuapp.com/api/internal/project/${editProject._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }
    );

    if (response.ok) {
      await fetchProjects(); // ✅ Refresh list
      setEditProject(null);
      toast.success("✅ Project updated successfully!");
    } else {
      // 🔍 Try to parse error
      let errorMessage = "Something went wrong";

      try {
        const errorData = await response.json();
        console.error("❌ Error details from server:", errorData);
        errorMessage = errorData.message || errorMessage;
      } catch {
        const errorText = await response.text();
        console.error("❌ Raw error response:", errorText);
        errorMessage = errorText || errorMessage;
      }

      toast.error(errorMessage);
    }
  } catch (error) {
    console.error("❌ Request failed:", error);
    toast.error("Error updating project. Please try again.");
  } finally {
    setEditLoading(false);
  }
};

  const handleEditChange = (field, value) => {
    setEditProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Main Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <FaGraduationCap className="text-blue-300" />
                  Project Gallery
                </h2>
                <p className="text-blue-200 text-sm mt-1">
                  Browse and explore all capstone projects
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-6 relative">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search projects by title, team, or supervisor..."
                  className="w-full pl-12 pr-6 py-3 text-gray-800 placeholder:text-gray-500 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-white transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-blue-600 text-lg font-medium">Loading projects...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentItems.length > 0 ? (
                    currentItems.map((project, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      >
                        {/* Project Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 leading-tight line-clamp-2">
                            {project.projectTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-blue-700 mb-1">
                            <FaUsers className="text-xs" />
                            <span className="font-semibold">Team:</span>
                            <span>{project.teamName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-blue-700 mb-3">
                            <FaGraduationCap className="text-xs" />
                            <span className="font-semibold">Supervisor:</span>
                            <span>{project.supervisor}</span>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <FaTags />
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {project.projectCategory}
                            </span>
                          </div>
                          {project.completionDate && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <FaCalendarAlt />
                              <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Abstract Preview */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.abstract}
                        </p>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <FaEye />
                            View Details
                          </button>
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(project);
                              }}
                              className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 transition-all duration-200 text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(project._id);
                              }}
                              disabled={deletingId === project._id}
                              className={`w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl 
              hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 transition-all duration-200 
              text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 
              flex items-center justify-center gap-2 
              ${deletingId === project._id ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                              {deletingId === project._id ? (
                                <>
                                  <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                  </svg>
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <FaTrash />
                                  Delete
                                </>
                              )}
                            </button>

                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <div className="text-gray-400 mb-4">
                        <FaSearch size={48} className="mx-auto opacity-50" />
                      </div>
                      <p className="text-gray-600 text-lg font-medium">
                        No projects found matching your search.
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Try adjusting your search terms or browse all projects.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {!loading && filteredProjects.length > ITEMS_PER_PAGE && (
                  <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 ${currentPage === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105"
                        }`}
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === pageNum
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-6 py-3 rounded-xl font-medium text-white transition-all duration-200 ${currentPage === totalPages
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Results Info */}
                {!loading && filteredProjects.length > 0 && (
                  <div className="text-center text-sm text-gray-500 mt-4">
                    Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Project Modal */}
      {editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-70 p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden">

            {/* Edit Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <FaEdit className="text-green-300" />
                    Edit Project
                  </h2>
                  <p className="text-green-200 text-sm mt-1">
                    Modify project details and save changes
                  </p>
                </div>
                <button
                  onClick={() => setEditProject(null)}
                  className="text-white hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={editProject.projectTitle || ''}
                      onChange={(e) => handleEditChange('projectTitle', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      value={editProject.projectType || ''}
                      onChange={(e) => handleEditChange('projectType', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select Type</option>
                      <option value="Software">Software</option>
                      <option value="AI">AI</option>
                      
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Category
                    </label>
                    <select
                      value={editProject.projectCategory || ''}
                      onChange={(e) => handleEditChange('projectCategory', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select Category</option>
                      <option value="Thesis">Thesis</option>
                      <option value="Research Project">Research Project</option>
                      <option value="Course Project">Course Project</option>
                      <option value="Capstone Project">Capstone Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={editProject.department || ''}
                      onChange={(e) => handleEditChange('department', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={editProject.completionDate || ''}
                      onChange={(e) => handleEditChange('completionDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Authors (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editProject.authors || ''}
                      onChange={(e) => handleEditChange('authors', e.target.value)}
                      placeholder="John Doe, Jane Smith, ..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Abstract *
                    </label>
                    <textarea
                      value={editProject.abstract || ''}
                      onChange={(e) => handleEditChange('abstract', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editProject.keywords || ''}
                      onChange={(e) => handleEditChange('keywords', e.target.value)}
                      placeholder="React, Node.js, MongoDB, ..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editProject.technologies || ''}
                      onChange={(e) => handleEditChange('technologies', e.target.value)}
                      placeholder="React, Express, PostgreSQL, ..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Further Improvements
                    </label>
                    <textarea
                      value={editProject.furtherImprovement || ''}
                      onChange={(e) => handleEditChange('furtherImprovement', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none"
                      placeholder="Describe possible future enhancements..."
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditProject(null)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-60 p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden">

            {/* Detail Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 leading-tight">
                    {selectedProject.projectTitle}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <FaUsers />
                      <span>Team: {selectedProject.teamName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGraduationCap />
                      <span>Supervisor: {selectedProject.supervisor}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-full ml-4"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Detail Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                      Project Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Category:</span>
                        <span className="text-gray-800">{selectedProject.projectCategory}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Type:</span>
                        <span className="text-gray-800">{selectedProject.projectType}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Completion:</span>
                        <span className="text-gray-800">
                          {new Date(selectedProject.completionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Created:</span>
                        <span className="text-gray-800">
                          {new Date(selectedProject.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaCode className="text-blue-600" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.keywords && selectedProject.keywords.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <FaTags className="text-blue-600" />
                        Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                      Abstract
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {selectedProject.abstract}
                      </p>
                    </div>
                  </div>

                  {selectedProject.furtherImprovement && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
                        Future Improvements
                      </h3>
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {selectedProject.furtherImprovement}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detail Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex gap-3 justify-end">

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};






// ✅ TeamList Component
const TeamList = ({ setActiveModal }) => {
  const [teamData, setTeamData] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedIntake, setSelectedIntake] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editFormData, setEditFormData] = useState({
    teamName: "",
    members: []
  });

  // ✅ Fetch all team data
  useEffect(() => {
    fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team")
      .then((res) => res.json())
      .then((data) => setTeamData(data.data))
      .catch((err) => console.error("Team fetch error:", err));
  }, []);

  // ✅ Fetch teacher list
  useEffect(() => {
    fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/admin//teachers")
      .then((res) => res.json())
      .then((data) => setTeacherList(data.data))
      .catch((err) => console.error("Teacher fetch error:", err));
  }, []);

  const uniqueIntakes = [...new Set(teamData.map((team) => team.members[0]?.intake))];

  const teamsForSelectedIntake = teamData.filter(
    (team) => team.members[0]?.intake === selectedIntake
  );

  // ✅ Handle DELETE
  const handleDelete = async (teamId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/${teamId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete team");
      }

      toast.success("Team deleted successfully");

      // ✅ Remove deleted team from teamData
      setTeamData(prev => prev.filter(team => team._id !== teamId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  // ✅ Handle Assign Teacher
  const handleAssignTeacher = async (teacher, teamId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/assign-teacher",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamId: teamId,
            teacherId: teacher._id,
            teacherName: teacher.fullName,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(`✅ ${teacher.fullName} assigned to the team successfully!`);
      } else {
        alert(`❌ Failed to assign: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Assignment error:", error);
      alert("Something went wrong while assigning teacher.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle Edit Team
  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setEditFormData({
      teamName: team.teamName,
      members: team.members.map(member => ({
        username: member.username || "",
        intake: member.intake || "",
        section: member.section || "",
        department: member.department || "",
        educationalMail: member.educationalMail || "",
        phone: member.phone || ""
      }))
    });
  };

  // ✅ Handle form input changes
  const handleInputChange = (e, memberIndex = null, field = null) => {
    if (memberIndex !== null && field) {
      // Update member field
      setEditFormData(prev => ({
        ...prev,
        members: prev.members.map((member, index) => 
          index === memberIndex 
            ? { ...member, [field]: e.target.value }
            : member
        )
      }));
    } else {
      // Update team name
      setEditFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  // ✅ Handle Save Team
  const handleSaveTeam = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Get the first member's educational email (assuming team leader or primary member)
      const primaryMember = editFormData.members[0];
      if (!primaryMember || !primaryMember.educationalMail) {
        throw new Error("Primary member's educational email is required");
      }
      
      console.log("Sending data:", editFormData); // Debug log
      console.log("Team Name:", editFormData.teamName); // Debug log
      console.log("Educational Mail:", primaryMember.educationalMail); // Debug log
      
      const response = await fetch(
        `https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/${editingTeam._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      console.log("Response status:", response.status); // Debug log
      console.log("API URL:", `https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/${editingTeam._id}`); // Debug log

      // Check if response is HTML (error page)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        const htmlText = await response.text();
        console.error("Received HTML instead of JSON:", htmlText.substring(0, 200));
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}`);
      }

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          const textResponse = await response.text();
          console.error("Error response text:", textResponse);
          errorMessage = `${errorMessage} - ${textResponse.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }

      let updatedTeam;
      try {
        updatedTeam = await response.json();
      } catch (jsonError) {
        console.warn("Response is not JSON, but request was successful");
        updatedTeam = editFormData; // Use local data if response isn't JSON
      }
      
      // Update the team in teamData
      setTeamData(prev => prev.map(team => 
        team._id === editingTeam._id 
          ? { ...team, ...editFormData }
          : team
      ));

      alert("Team updated successfully!"); // Using alert instead of toast for now
      setEditingTeam(null);
      setEditFormData({ teamName: "", members: [] });
    } catch (error) {
      console.error("Update error:", error);
      alert(`Update failed: ${error.message}`); // Using alert instead of toast for now
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white max-w-6xl rounded-3xl shadow-2xl relative overflow-hidden w-[900px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaUsers className="text-blue-300" />
            Team Management
          </h2>
          <p className="text-blue-200 text-sm mt-1">Manage teams and assign teachers</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Intake</label>
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                value={selectedIntake}
                onChange={(e) => {
                  setSelectedIntake(e.target.value);
                  setSelectedTeam("");
                }}
              >
                <option value="">Choose an intake...</option>
                {uniqueIntakes.map((intake, i) => (
                  <option key={i} value={intake}>
                    {intake}
                  </option>
                ))}
              </select>
            </div>

            {selectedIntake && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaChartLine className="text-blue-600" />
                  Teams in {selectedIntake}
                </h3>
                <div className="grid gap-3">
                  {teamsForSelectedIntake.map((team, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                    >
                      <div>
                        <span className="font-semibold text-gray-800">{team.teamName}</span>
                        <p className="text-sm text-gray-500">{team.members?.length || 0} members</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTeam(team)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md text-sm md:text-lg"
                        >
                          <FaEdit />
                          Manage
                        </button>
                        <button
                          onClick={() => handleEditTeam(team)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md text-sm md:text-lg"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(team._id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-1 md:gap-2 hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md text-sm md:text-lg"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTeam && (
              <div className="mt-6 p-6 border-2 border-blue-200 rounded-2xl bg-blue-50">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Assign Teacher to{' '}
                  <span className="text-blue-600">{selectedTeam.teamName}</span>
                </h3>
                {teacherList.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaUserGraduate size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No teachers found.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teacherList.map((teacher, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{teacher.fullName}</p>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                        <button
                          onClick={() => handleAssignTeacher(teacher, selectedTeam._id)}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <FaPlus size={12} />
                              Assign
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 text-white hover:text-red-300 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
          <div className="bg-white max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden w-full max-h-[90vh] flex flex-col">
            {/* Edit Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaEdit className="text-green-300" />
                Edit Team: {editingTeam.teamName}
              </h2>
              <p className="text-green-200 text-sm mt-1">Update team details and member information</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Team Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    value={editFormData.teamName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                    placeholder="Enter team name"
                  />
                </div>

                {/* Members */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaUsers className="text-green-600" />
                    Team Members
                  </h3>
                  <div className="space-y-4">
                    {editFormData.members.map((member, index) => (
                      <div key={index} className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                        <h4 className="font-semibold text-gray-700 mb-3">Member {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                            <input
                              type="text"
                              value={member.username}
                              onChange={(e) => handleInputChange(e, index, 'username')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Intake</label>
                            <input
                              type="text"
                              value={member.intake}
                              onChange={(e) => handleInputChange(e, index, 'intake')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter intake"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Section</label>
                            <input
                              type="text"
                              value={member.section}
                              onChange={(e) => handleInputChange(e, index, 'section')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter section"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                            <input
                              type="text"
                              value={member.department}
                              onChange={(e) => handleInputChange(e, index, 'department')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter department"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Educational Email</label>
                            <input
                              type="email"
                              value={member.educationalMail}
                              onChange={(e) => handleInputChange(e, index, 'educationalMail')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter educational email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(e) => handleInputChange(e, index, 'phone')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Modal Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingTeam(null);
                  setEditFormData({ teamName: "", members: [] });
                }}
                className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTeam}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSave size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>

            {/* Close Edit Modal */}
            <button
              onClick={() => {
                setEditingTeam(null);
                setEditFormData({ teamName: "", members: [] });
              }}
              className="absolute top-4 right-4 text-white hover:text-red-300 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ AdminDashboard Main Component
const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [showLogout, setShowLogout] = useState(false);


  const [intakes] = useState(["Spring 2025", "Summer 2025"]);
  const [teams] = useState({
    "Spring 2025": ["Team A", "Team B"],
    "Summer 2025": ["Team C"],
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 500;

    setLoading(true); // Start loader

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No active session found");
      }

      const response = await fetch(
        "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      localStorage.removeItem("token");

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsed)
        );
      }

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white bg-clip-text">
                Admin Portal
              </h1>
              <p className="text-gray-300 mt-1">Manage your educational platform</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Step 2: Cog Icon Div */}
              <div
                onClick={() => setShowLogout(!showLogout)}
                className="bg-gradient-to-r from-slate-100 to-blue-200 p-3 rounded-xl cursor-pointer hover:shadow-md transition duration-200 inline-block"
              >
                <FaCog className="text-black text-xl" />
              </div>

              {/* Step 3: Conditionally show Logout */}
              {showLogout && (
                <div className="mt-2">
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition-all text-sm flex items-center justify-center gap-2 hover:bg-red-600 ${loading ? "cursor-not-allowed opacity-60" : ""
                      }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Logging out...
                      </>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Management Card */}
            <div
              onClick={() => setActiveModal("team")}
              className="group cursor-pointer bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaUsers className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Team Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Organize teams by intake periods and assign qualified teachers to guide student projects
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Manage Teams</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Show projects */}
            <div
              onClick={() => setActiveModal("showproject")}
              className="group cursor-pointer bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FolderCog size={30} className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Manage Projects</h3>
                <p className="text-gray-600 leading-relaxed">
                  Organize teams by intake periods and assign qualified teachers to guide student projects
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Manage Teams</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Teacher Management Card */}
            <div
              onClick={() => setActiveModal("teacher")}
              className="group cursor-pointer bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-600/20 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaUserGraduate className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Add Teachers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Register new faculty members with default credentials and educational email addresses
                </p>
                <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  <span>Add Teacher</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Monitor Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-red-500 to-red-500 p-3 rounded-xl">
                  <FaTachometerAlt className="text-white text-xl" />
                </div>
                System Monitor
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div>
                    <span className="text-gray-700 font-medium">Performance</span>
                    <p className="text-xs text-gray-500">System Speed</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold text-lg">Excellent</span>
                    <p className="text-xs text-green-500">⚡ 98% uptime</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div>
                    <span className="text-gray-700 font-medium">Memory</span>
                    <p className="text-xs text-gray-500">RAM Usage</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <FaMemory className="text-blue-600" />
                    <div>
                      <span className="text-blue-600 font-bold text-lg">132MB</span>
                      <p className="text-xs text-blue-500">Normal</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-gray-700 font-medium">Issues</span>
                    <p className="text-xs text-gray-500">System Health</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <FaBug className="text-gray-400" />
                    <div>
                      <span className="text-gray-600 font-bold text-lg">None</span>
                      <p className="text-xs text-gray-500">All Clear</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Active Teams</span>
                  <span className="text-2xl font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Total Teachers</span>
                  <span className="text-2xl font-bold">{teacherList.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">This Month</span>
                  <span className="text-2xl font-bold text-green-400">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Modals */}
      {activeModal === "team" && (
        <TeamList
          intakes={intakes}
          teams={teams}
          teacherList={teacherList}
          setActiveModal={setActiveModal}
        />
      )}
      {activeModal === "teacher" && (
        <TeacherAdd
          setActiveModal={setActiveModal}
          teacherList={teacherList}
          setTeacherList={setTeacherList}
        />
      )}
      {activeModal === "showproject" && (
        <ShowProject
          intakes={intakes}
          teams={teams}
          teacherList={teacherList}
          setActiveModal={setActiveModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;