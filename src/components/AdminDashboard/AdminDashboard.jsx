/* eslint-disable react/prop-types */
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
  FaCog
} from "react-icons/fa";

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
      }else{
        throw new Error("Failed to add teacher");
      }
      

      const addedTeacher = await response.json();
      setTeacherList([...teacherList, addedTeacher]);
      setNewTeacher({ shortName: "", fullName: "",educationalMail: "", defaultPassword: "default123" });
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
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-gray-600 mt-1">Manage your educational platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-3 rounded-xl">
                <FaCog className="text-white text-xl" />
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
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
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
    </div>
  );
};

export default AdminDashboard;