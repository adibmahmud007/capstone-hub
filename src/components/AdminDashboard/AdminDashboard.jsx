/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUsers,
  FaPlus,
  FaTachometerAlt,
  FaMemory,
  FaBug,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

// ✅ TeacherAdd Component
const TeacherAdd = ({ setActiveModal, setTeacherList, teacherList }) => {
  const [newTeacher, setNewTeacher] = useState({
    shortName: "",
    fullName: "",
    educationalMail: "",
    defaultPassword: "default123",
  });

  const handleAddTeacher = async () => {
    console.log(newTeacher)
    try {
      const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/admin/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });

      if (response.ok) {
        toast.success("Teacher Added Successful")
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
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Short Name"
            value={newTeacher.shortName}
            onChange={(e) => setNewTeacher({ ...newTeacher, shortName: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newTeacher.educationalMail}
            onChange={(e) => setNewTeacher({ ...newTeacher, educationalMail: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newTeacher.fullName}
            onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Default Password"
            value={newTeacher.defaultPassword}
            onChange={(e) => setNewTeacher({ ...newTeacher, defaultPassword: e.target.value })}
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
};

// ✅ TeamList Component
// const TeamList = ({ intakes, teams, teacherList, setActiveModal }) => {
//   const [selectedIntake, setSelectedIntake] = useState("");
//   const [editTeam, setEditTeam] = useState("");

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-50">
//       <div className="bg-white w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Team List by Intake</h2>

//         <select
//           className="border p-2 rounded w-full mb-4"
//           value={selectedIntake}
//           onChange={(e) => setSelectedIntake(e.target.value)}
//         >
//           <option value="">Select Intake</option>
//           {intakes.map((intake, i) => (
//             <option key={i} value={intake}>
//               {intake}
//             </option>
//           ))}
//         </select>

//         {selectedIntake && (
//           <div className="space-y-3">
//             {teams[selectedIntake]?.map((team, idx) => (
//               <div key={idx} className="flex justify-between items-center border-b py-2">
//                 <span>{team}</span>
//                 <button
//                   onClick={() => setEditTeam(team)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
//                 >
//                   <FaEdit /> Edit
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {editTeam && (
//           <div className="mt-6 border-t pt-4">
//             <h3 className="text-lg font-semibold mb-3">Assign Teachers to {editTeam}</h3>
//             {teacherList.length === 0 ? (
//               <p className="text-gray-500">No teachers added yet.</p>
//             ) : (
//               teacherList.map((teacher, i) => (
//                 <div key={i} className="flex justify-between items-center mb-2">
//                   <div>
//                     <p>{teacher.fullName}</p>
//                     <p className="text-sm text-gray-500">{teacher.email}</p>
//                   </div>
//                   <button className="bg-blue-600 text-white px-3 py-1 rounded">
//                     Assign
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         <button
//           onClick={() => setActiveModal(null)}
//           className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// };
const TeamList = ({ setActiveModal }) => {
  const [teamData, setTeamData] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedIntake, setSelectedIntake] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

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
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Team List by Intake</h2>

        <select
          className="border p-2 rounded w-full mb-4"
          value={selectedIntake}
          onChange={(e) => {
            setSelectedIntake(e.target.value);
            setSelectedTeam("");
          }}
        >
          <option value="">Select Intake</option>
          {uniqueIntakes.map((intake, i) => (
            <option key={i} value={intake}>
              {intake}
            </option>
          ))}
        </select>

        {selectedIntake && (
          <div className="space-y-3">
            {teamsForSelectedIntake.map((team, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{team.teamName}</span>
                <button
                  onClick={() => setSelectedTeam(team)}
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedTeam && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">
              Assign Teacher to <span className="text-blue-600">{selectedTeam.teamName}</span>
            </h3>
            {teacherList.length === 0 ? (
              <p className="text-gray-500">No teachers found.</p>
            ) : (
              teacherList.map((teacher, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-medium">{teacher.fullName}</p>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                  </div>
                  <button
                    onClick={() => handleAssignTeacher(teacher, selectedTeam._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Assign
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black"
        >
          ×
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

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="text-2xl font-bold text-left text-blue-700 mb-8">
        Admin Portal
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
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

        <div
          className="bg-white w-full max-w-sm rounded-2xl shadow-lg p-6"
          data-aos="fade-left"
          data-aos-delay="200"
        >
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
