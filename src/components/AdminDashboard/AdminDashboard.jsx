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
  FaSearch, FaEye, FaCalendarAlt, FaCode, FaTags, FaGraduationCap
} from "react-icons/fa";
import { FolderCog } from 'lucide-react';

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

    try {
      await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/internal/project/${id}`, {
        method: "DELETE",
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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

                        {/* Action Button */}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <FaEye />
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="w-full mt-1.5 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 transition-all duration-200 text-sm tracking-wide shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          Delete
                        </button>
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

  // Fetch all team data
  useEffect(() => {
    fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team")
      .then((res) => res.json())
      .then((data) => setTeamData(data.data))
      .catch((err) => console.error("Team fetch error:", err));
  }, []);

  // Fetch teacher list
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

  // Handle PATCH assign
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
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
                      <button
                        onClick={() => setSelectedTeam(team)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                      >
                        <FaEdit />
                        Manage
                      </button>
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
    </div>
  );
};

// ✅ AdminDashboard Main Component
const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [teacherList, setTeacherList] = useState([]);

  const [intakes] = useState(["Spring 2025", "Summer 2025"]);
  const [teams] = useState({
    "Spring 2025": ["Team A", "Team B"],
    "Summer 2025": ["Team C"],
  });

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
              <div className="bg-gradient-to-r from-slate-100 to-blue-200 p-3 rounded-xl">
                <FaCog className="text-black text-xl" />
              </div>
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
                  <FolderCog size={30}  className="text-white text-3xl" />
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