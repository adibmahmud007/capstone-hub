import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTachometerAlt,
  FaMemory,
  FaBug,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedIntake, setSelectedIntake] = useState("");
  const [intakes] = useState(["Spring 2025", "Summer 2025"]);
  const [teams] = useState({
    "Spring 2025": ["Team A", "Team B"],
    "Summer 2025": ["Team C"],
  });

  const [editTeam, setEditTeam] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    shortName: "",
    email: "",
    fullName: "",
    password: "default123",
  });

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleAddTeacher = () => {
    setTeacherList([...teacherList, newTeacher]);
    setNewTeacher({ shortName: "", email: "", fullName: "", password: "default123" });
    setActiveModal(null);
  };

  const TeamList = () => (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Team List by Intake</h2>

        <select
          className="border p-2 rounded w-full mb-4"
          value={selectedIntake}
          onChange={(e) => setSelectedIntake(e.target.value)}
        >
          <option value="">Select Intake</option>
          {intakes.map((intake, i) => (
            <option key={i} value={intake}>
              {intake}
            </option>
          ))}
        </select>

        {selectedIntake && (
          <div className="space-y-3">
            {teams[selectedIntake]?.map((team, idx) => (
              <div key={idx} className="flex justify-between items-center border-b py-2">
                <span>{team}</span>
                <button
                  onClick={() => setEditTeam(team)}
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {editTeam && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Assign Teachers to {editTeam}</h3>
            {teacherList.length === 0 ? (
              <p className="text-gray-500">No teachers added yet.</p>
            ) : (
              teacherList.map((teacher, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <div>
                    <p>{teacher.fullName}</p>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Assign
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => {
            setActiveModal(null);
            setEditTeam("");
          }}
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );

  const TeacherAdd = () => (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Short Name"
            value={newTeacher.shortName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, shortName: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newTeacher.email}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, email: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newTeacher.fullName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, fullName: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Default Password"
            value={newTeacher.password}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, password: e.target.value })
            }
            className="border p-2 w-full rounded"
          />
          <button
            onClick={handleAddTeacher}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Teacher
          </button>
        </div>

        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="text-2xl font-bold text-left text-blue-700 mb-8">
        Admin Portal
      </div>

      {/* Main Content Centered */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
        {/* Menu Options */}
        <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
          <div
            onClick={() => setActiveModal("team")}
            className="cursor-pointer bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all"
            data-aos="fade-up"
          >
            <FaUsers className="text-blue-600 text-3xl mb-3" />
            <h2 className="text-xl font-semibold">Team List</h2>
            <p className="text-gray-500 text-sm">Manage teams by intake, assign teachers</p>
          </div>

          <div
            onClick={() => setActiveModal("teacher")}
            className="cursor-pointer bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaPlus className="text-green-600 text-3xl mb-3" />
            <h2 className="text-xl font-semibold">Teacher Add</h2>
            <p className="text-gray-500 text-sm">Add new teachers with default credentials</p>
          </div>
        </div>

        {/* Performance Monitor */}
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6" data-aos="fade-left" data-aos-delay="200">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTachometerAlt className="text-yellow-500" /> Performance Monitor
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between items-center">
              <span>Speed</span>
              <span className="text-green-600 font-medium">Excellent ⚡</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Memory Usage</span>
              <span className="text-blue-600 font-medium">
                132MB <FaMemory className="inline ml-1" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Issues</span>
              <span className="text-red-500 font-medium">
                None <FaBug className="inline ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Modals */}
      {activeModal === "team" && <TeamList />}
      {activeModal === "teacher" && <TeacherAdd />}
    </div>
  );
};

export default AdminDashboard;
