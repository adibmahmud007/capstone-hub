/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { FaUsers, FaTasks, FaClipboardList, FaRegStickyNote,FaStore } from "react-icons/fa";
import { Menu, X } from 'lucide-react';
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// Default Props for groupMembers to prevent undefined error





const TeamDetails = () => {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openIntake, setOpenIntake] = useState(null);
    const [openSection, setOpenSection] = useState({});
    const [openTeam, setOpenTeam] = useState({});

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/by-teacher", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setTeamData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching team data:", error);
                setLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    const groupedData = useMemo(() => {
        const grouped = {};
        teamData.forEach(team => {
            const { teamName, members } = team;
            const { intake, section } = members[0] || {};

            if (!intake || !section) return;

            if (!grouped[intake]) grouped[intake] = {};
            if (!grouped[intake][section]) grouped[intake][section] = {};
            grouped[intake][section][teamName] = members;
        });
        return grouped;
    }, [teamData]);

    if (loading) {
        return <div className="text-center text-xl text-gray-600 mt-10">⏳ Loading team data...</div>;
    }

    return (
        <div className="max-w-6xl max-h-[75vh] sm:max-h-[80vh] overflow-y-auto mx-auto mt-6 p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">👥 Team Overview</h2>

            {Object.entries(groupedData).map(([intake, sections]) => (
                <div key={intake} className="mb-6 rounded-xl border border-blue-200 overflow-hidden shadow-sm">
                    <button
                        onClick={() => setOpenIntake(openIntake === intake ? null : intake)}
                        className="w-full flex justify-between items-center px-6 py-4 bg-blue-700 hover:bg-blue-800 text-white text-xl font-semibold tracking-wide transition"
                    >
                        <span>🎓 Intake {intake}</span>
                        <span className="text-2xl">{openIntake === intake ? '▲' : '▼'}</span>
                    </button>

                    {openIntake === intake && (
                        <div className="bg-gray-50 px-5 py-5">
                            {Object.entries(sections).map(([section, teams]) => (
                                <div key={section} className="mb-4">
                                    <button
                                        onClick={() => setOpenSection(prev => ({
                                            ...prev,
                                            [`${intake}-${section}`]: !prev[`${intake}-${section}`]
                                        }))}
                                        className="w-full flex justify-between items-center px-5 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-gray-700 shadow-sm"
                                    >
                                        <span>📘 Section {section}</span>
                                        <span className="text-lg">{openSection[`${intake}-${section}`] ? '−' : '+'}</span>
                                    </button>

                                    {openSection[`${intake}-${section}`] && (
                                        <div className="ml-4 sm:ml-6 mt-3 space-y-4">
                                            {Object.entries(teams).map(([teamName, members]) => (
                                                <div key={teamName}>
                                                    <button
                                                        onClick={() => setOpenTeam(prev => ({
                                                            ...prev,
                                                            [`${intake}-${section}-${teamName}`]: !prev[`${intake}-${section}-${teamName}`]
                                                        }))}
                                                        className="w-full flex justify-between items-center px-5 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-md font-medium text-gray-800 shadow-sm"
                                                    >
                                                        <span>👨‍👩‍👧‍👦 Team: {teamName}</span>
                                                        <span className="text-lg">{openTeam[`${intake}-${section}-${teamName}`] ? '−' : '+'}</span>
                                                    </button>

                                                    {openTeam[`${intake}-${section}-${teamName}`] && (
                                                        <div className="mt-2 bg-white rounded-md shadow border border-gray-100 p-4 overflow-x-auto">
                                                            <table className="min-w-[600px] w-full text-sm text-left text-gray-700">
                                                                <thead>
                                                                    <tr className="bg-gray-100 border-b">
                                                                        <th className="px-4 py-2 font-semibold">👤 Name</th>
                                                                        <th className="px-4 py-2 font-semibold">📧 Mail</th>
                                                                        <th className="px-4 py-2 font-semibold">🎓 Intake</th>
                                                                        <th className="px-4 py-2 font-semibold">🏫 Section</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {members.map(member => (
                                                                        <tr key={member.id} className="border-t hover:bg-gray-50">
                                                                            <td className="px-4 py-2">{member.username}</td>
                                                                            <td className="px-4 py-2">{member.educationalMail}</td>
                                                                            <td className="px-4 py-2">{member.intake}</td>
                                                                            <td className="px-4 py-2">{member.section}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};




const AssignTask = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [openIntake, setOpenIntake] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [openTeam, setOpenTeam] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [task, setTask] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
      const fetchTeamData = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/by-teacher", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              const data = await response.json();
              setTeamData(data.data);
              setLoading(false);
          } catch (error) {
              toast.error("Error fetching team data:", error);
              setLoading(false);
          }
      };

      fetchTeamData();
  }, []);

  const groupedData = useMemo(() => {
      const grouped = {};
      teamData.forEach(team => {
          const { teamName, members } = team;
          const { intake, section } = members[0] || {};

          if (!intake || !section) return;

          if (!grouped[intake]) grouped[intake] = {};
          if (!grouped[intake][section]) grouped[intake][section] = {};
          grouped[intake][section][teamName] = members;
      });
      return grouped;
  }, [teamData]);

  const handleTeamClick = (intake, section, teamName) => {
      const key = `${intake}-${section}-${teamName}`;
      setOpenTeam(prev => ({
          ...prev,
          [key]: !prev[key],
      }));

      setSelectedTeam(prev =>
          prev?.intake === intake && prev?.section === section && prev?.teamName === teamName
              ? null
              : { intake, section, teamName }
      );
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      const token = localStorage.getItem('token');
      if (!token) {
          toast.dismiss("❌ Token missing. Please login again.");
          setSubmitting(false);
          return;
      }

      if (!selectedTeam) {
          toast.warning("❌ Please select a team first!");
          setSubmitting(false);
          return;
      }

      const payload = {
          teamName: selectedTeam.teamName,
          assignedTask: task,
          remarks: remark,
      };

      try {
          const response = await fetch('https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (response.ok) {
              toast.success("✅ Task and remarks assigned successfully!");
              setTask('');
              setRemark('');
          } else {
              toast.error(`❌ Failed: ${result?.message || 'Unknown error occurred.'}`);
          }
      } catch (error) {
          console.error("Error assigning task:", error);
          toast.error("❌ Network error. Please try again.");
      } finally {
          setSubmitting(false);
      }
  };

  if (loading) {
      return <div className="text-center text-lg mt-10">Loading team data...</div>;
  }

  return (
      <div className="max-w-5xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">📋 Assign Tasks to Teams</h2>

          {/* Dropdown Section */}
          <div className="mb-10">
              {Object.entries(groupedData).map(([intake, sections]) => (
                  <div key={intake} className="mb-6 border border-blue-300 rounded-lg overflow-hidden shadow-md">
                      <button
                          onClick={() => setOpenIntake(openIntake === intake ? null : intake)}
                          className="w-full flex justify-between items-center px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition"
                      >
                          <span>🎓 Intake {intake}</span>
                          <span>{openIntake === intake ? '▲' : '▼'}</span>
                      </button>

                      {openIntake === intake && (
                          <div className="bg-blue-50 px-5 py-4">
                              {Object.entries(sections).map(([section, teams]) => (
                                  <div key={section} className="mb-4">
                                      <button
                                          onClick={() =>
                                              setOpenSection(prev => ({
                                                  ...prev,
                                                  [`${intake}-${section}`]: !prev[`${intake}-${section}`],
                                              }))
                                          }
                                          className="w-full flex justify-between items-center px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md font-medium text-blue-900 transition"
                                      >
                                          <span>📘 Section {section}</span>
                                          <span>{openSection[`${intake}-${section}`] ? '−' : '+'}</span>
                                      </button>

                                      {openSection[`${intake}-${section}`] && (
                                          <div className="ml-5 mt-3 space-y-2">
                                              {Object.entries(teams).map(([teamName]) => {
                                                  const teamKey = `${intake}-${section}-${teamName}`;
                                                  return (
                                                      <button
                                                          key={teamName}
                                                          onClick={() => handleTeamClick(intake, section, teamName)}
                                                          className={`w-full text-left px-4 py-2 rounded-md transition font-medium 
                                                              ${selectedTeam?.teamName === teamName &&
                                                                  selectedTeam?.intake === intake &&
                                                                  selectedTeam?.section === section
                                                                  ? 'bg-yellow-300 text-blue-900'
                                                                  : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                                                              }`}
                                                      >
                                                          👥 Team: {teamName}
                                                      </button>
                                                  );
                                              })}
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
          </div>

          {/* Always-visible Input Section */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-blue-300 shadow-inner">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">📝 Assign Task and Remark to Team <span className="text-amber-800 font-bold underline">{selectedTeam?.teamName}</span></h3>

              <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-blue-700 font-medium mb-1">Task</label>
                      <input
                          type="text"
                          value={task}
                          onChange={(e) => setTask(e.target.value)}
                          placeholder="Enter task..."
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                      />
                  </div>

                  <div>
                      <label className="block text-blue-700 font-medium mb-1">Remark</label>
                      <textarea
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          placeholder="Add a remark..."
                          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                      />
                  </div>
              </div>

              <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-md transition"
              >
                  {submitting ? '⏳ Assigning...' : '✅ Assign Task'}
              </button>
          </form>
      </div>
  );
};








const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({ assignedTask: '', remarks: '' });
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task");
          if (!response.ok) throw new Error("Failed to fetch tasks");
          const data = await response.json();
          setTasks(data.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }, []);
  
    const deleteTask = async (taskId) => {
      if (!window.confirm("Are you sure you want to delete this task?")) return;
      try {
        const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${taskId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete task");
        toast.success('Task deleted successfully');
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task. Please try again.");
      }
    };
  
    const handleEditClick = (task) => {
      setEditingTask(task);
      setEditForm({ assignedTask: task.assignedTask, remarks: task.remarks });
    };
  
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setEditForm({ ...editForm, [name]: value });
    };
  
    const handleEditSubmit = async () => {
      try {
        const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${editingTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editForm, status: 'Updated' }),
        });
  
        if (!response.ok) throw new Error("Failed to update task");
  
        const updatedTasks = tasks.map((task) =>
          task._id === editingTask._id ? { ...task, ...editForm, status: 'Updated' } : task
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully!");
        setEditingTask(null);
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task.");
      }
    };
  
    return (
      <div className="w-full mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">📋 Assigned Tasks</h2>
  
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white text-gray-700 border rounded-lg overflow-auto shadow-sm">
              <thead className="bg-blue-100 text-blue-800 text-sm uppercase tracking-wider min-w-[200px]">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Team</th>
                  <th className="px-4 min-w-[300px] py-3 text-left">Assigned Task</th>
                  <th className="px-4 min-w-[150px] py-3 text-left">Remarks</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                      No tasks assigned yet.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task, index) => (
                    <tr key={task._id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{task.teamName}</td>
                      <td className="px-4 py-3">{task.assignedTask}</td>
                      <td className="px-4 py-3">{task.remarks}</td>
                      <td className="px-4 flex items-center justify-center  py-3 text-center space-x-2">
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditClick(task)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
  
        {/* Edit Modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-4">✏️ Edit Task</h3>
  
              <label className="block text-gray-700 font-medium mb-1">Assigned Task</label>
              <textarea
                name="assignedTask"
                value={editForm.assignedTask}
                onChange={handleEditChange}
                rows={4}
                className="w-full border border-blue-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
  
              <label className="block text-gray-700 font-medium mb-1">Remarks</label>
              <textarea
                name="remarks"
                value={editForm.remarks}
                onChange={handleEditChange}
                rows={2}
                className="w-full border border-blue-300 px-4 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
  
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };







// const AddNotice = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [selectedTeam, setSelectedTeam] = useState('');

//     const teamOptions = ['Team Alpha', 'Team Bravo', 'Team Delta'];

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedTeam) {
//             alert("Please select a team.");
//             return;
//         }

//         const noticeData = {
//             teamName: selectedTeam,
//             noticeTitle: title,
//             noticeDetails: content,
//         };

//         try {
//             const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(noticeData),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to create notice");
//             }

//             console.log(response)
//             toast.success("Notice added successfully!");

//             // Clear form fields
//             setTitle('');
//             setContent('');
//             setSelectedTeam('');
//         } catch (error) {
//             console.error("Error creating notice:", error);
//             toast.error("Failed to add notice. Please try again.");
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto mt-2 p-4 bg-white rounded-xl shadow-lg">
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">📢 Add New Notice</h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Select Team</label>
//                     <select
//                         name="team"
//                         value={selectedTeam}
//                         onChange={(e) => setSelectedTeam(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     >
//                         <option value="">-- Select Team --</option>
//                         {teamOptions.map((team, index) => (
//                             <option key={index} value={team}>{team}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Notice Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter notice title"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Notice Content</label>
//                     <textarea
//                         id="content"
//                         value={content}
//                         onChange={(e) => setContent(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows="6"
//                         placeholder="Write the full notice content here..."
//                         required
//                     ></textarea>
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
//                 >
//                     Add Notice
//                 </button>
//             </form>
//         </div>
//     );
// };


const AddNotice = () => {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [openIntake, setOpenIntake] = useState(null);
    const [openSection, setOpenSection] = useState({});
    const [openTeam, setOpenTeam] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [submitting, setSubmitting] = useState(false)
  
    useEffect(() => {
      const fetchTeamData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/by-teacher", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setTeamData(data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching team data:", error);
          
          setLoading(false);
        }
      };
      fetchTeamData();
    }, []);
  
    const groupedData = useMemo(() => {
      const grouped = {};
      teamData.forEach(team => {
        const { teamName, members } = team;
        const { intake, section } = members[0] || {};
        if (!intake || !section) return;
        if (!grouped[intake]) grouped[intake] = {};
        if (!grouped[intake][section]) grouped[intake][section] = {};
        grouped[intake][section][teamName] = members;
      });
      return grouped;
    }, [teamData]);
  
    const handleTeamClick = (intake, section, teamName) => {
      const key = `${intake}-${section}-${teamName}`;
      setOpenTeam(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
      setSelectedTeam(prev =>
        prev?.intake === intake && prev?.section === section && prev?.teamName === teamName
          ? null
          : { intake, section, teamName }
      );
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      if (!selectedTeam) {
        alert("Please select a team.");
        return;
      }
  
      const noticeData = {
        teamName: selectedTeam.teamName,
        noticeTitle: title,
        noticeDetails: content,
      };
  
      try {
        const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noticeData),
        });
  
        if (!response.ok) throw new Error("Failed to create notice");
  
        toast.success("Notice added successfully!");
        setTitle('');
        setContent('');
        setSelectedTeam('');
        setSubmitting(false);
      } catch (error) {
        console.error("Error creating notice:", error);
        toast.error("Failed to add notice. Please try again.");
      }
    };
  
    if (loading) {
      return <div className="text-center text-lg mt-10">Loading team data...</div>;
    }
  
    return (
        <div className="max-w-5xl max-h-[75vh] sm:max-h-[80vh] overflow-y-auto mx-auto mt-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">📢 Add Notice to Teams</h2>
      
          {/* Dropdown UI at the top */}
          <div className="mb-8">
            {Object.entries(groupedData).map(([intake, sections]) => (
              <div key={intake} className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIntake(openIntake === intake ? null : intake)}
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition"
                >
                  <span>🎓 Intake {intake}</span>
                  <span className="text-xl">{openIntake === intake ? '▲' : '▼'}</span>
                </button>
      
                {openIntake === intake && (
                  <div className="bg-gray-50 px-4 py-4">
                    {Object.entries(sections).map(([section, teams]) => (
                      <div key={section} className="mb-4">
                        <button
                          onClick={() => setOpenSection(prev => ({
                            ...prev,
                            [`${intake}-${section}`]: !prev[`${intake}-${section}`]
                          }))}
                          className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-blue-700 transition"
                        >
                          <span>📘 Section {section}</span>
                          <span>{openSection[`${intake}-${section}`] ? '−' : '+'}</span>
                        </button>
      
                        {openSection[`${intake}-${section}`] && (
                          <div className="ml-4 sm:ml-6 mt-2">
                            {Object.entries(teams).map(([teamName]) => {
                              const teamKey = `${intake}-${section}-${teamName}`;
                              return (
                                <div key={teamName} className="mb-3">
                                  <button
                                    onClick={() => handleTeamClick(intake, section, teamName)}
                                    className={`w-full flex justify-between items-center px-4 py-2 rounded-md font-medium transition ${selectedTeam?.teamName === teamName &&
                                      selectedTeam?.intake === intake &&
                                      selectedTeam?.section === section
                                      ? 'bg-yellow-300 text-gray-900'
                                      : 'bg-yellow-100 hover:bg-yellow-200 text-gray-800'
                                      }`}
                                  >
                                    <span>👨‍👩‍👧‍👦 Team: {teamName}</span>
                                    <span>{openTeam[teamKey] ? '−' : '+'}</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
      
          {/* Always visible Add Notice Form */}
          <form onSubmit={handleSubmit} className="mt-4 border-t pt-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              📝 Add Notice {selectedTeam ? `for Team ${selectedTeam.teamName}` : '(Please select a team first)'}
            </h3>
      
            <div className="grid gap-4">
              <div>
                <label className="block text-blue-700 font-medium mb-1">Notice Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notice title"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
      
              <div>
                <label className="block text-blue-700 font-medium mb-1">Notice Details</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter full details of the notice"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
            </div>
      
            <button
              type="submit"
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
              disabled={!selectedTeam}
            >
              {submitting ? '⏳ Publishing...' : '✅ Publish Notice'}
            </button>
          </form>
        </div>
      );
      
  };

  
  const ShowNotice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNotice, setEditingNotice] = useState(null);

    const [editTitle, setEditTitle] = useState('');
    const [editDetails, setEditDetails] = useState('');

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice");
            if (!response.ok) throw new Error("Failed to fetch notices");
            const data = await response.json();
            setNotices(data.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error("Failed to delete");

            setNotices(prev => prev.filter(notice => notice._id !== id));
            toast.success("Notice deleted successfully.");
        } catch (error) {
            console.error("Error deleting notice:", error);
            toast.error("Error deleting notice.");
        }
    };

    const handleEditClick = (notice) => {
        setEditingNotice(notice);
        setEditTitle(notice.noticeTitle);
        setEditDetails(notice.noticeDetails);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice/${editingNotice._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamName: editingNotice.teamName,
                    noticeTitle: editTitle,
                    noticeDetails: editDetails,
                }),
            });

            if (!response.ok) throw new Error("Failed to update notice");

            const updatedNotices = notices.map(n =>
                n._id === editingNotice._id ? { ...n, noticeTitle: editTitle, noticeDetails: editDetails } : n
            );

            setNotices(updatedNotices);
            setEditingNotice(null);
        } catch (error) {
            console.error("Error updating notice:", error);
            alert("Error updating notice.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-4 md:p-6 rounded-2xl shadow-xl bg-gradient-to-r from-blue-100 via-blue-50 to-white">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">📘 All Notices</h2>

            {loading ? (
                <p className="text-center text-blue-700">Loading notices...</p>
            ) : notices.length === 0 ? (
                <p className="text-center text-gray-500 italic">No notices available.</p>
            ) : (
                <div className="max-h-[70vh] overflow-y-auto px-1 md:px-2 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                    {notices.map((notice) => (
                        <div key={notice._id} className="bg-white p-4 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition">
                           <div className="flex justify-between items-center mb-3">
                            <h3 className="md:text-xl text-lg font-semibold text-blue-600">{notice.noticeTitle}</h3>
                            <span className="md:text-sm text-xs font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-xl flex flex-col items-start">
                                📌 {notice.teamName}
                                <span className="text-xs mt-2">📅 {
                                    new Date(notice.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                }</span>
                            </span>

                        </div>
                            <p className="text-gray-700 whitespace-pre-line">{notice.noticeDetails}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <button
                                    onClick={() => handleDelete(notice._id)}
                                    className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 text-sm transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEditClick(notice)}
                                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingNotice && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold text-blue-700 mb-4">✏️ Edit Notice</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-blue-800">Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-800">Details</label>
                                <textarea
                                    value={editDetails}
                                    onChange={(e) => setEditDetails(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingNotice(null)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};





const TeacherDashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState("team");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [assignTask, setAssignedTask] = useState('');
    const [remarks, setRemarks] = useState('');

    const renderContent = () => {
        switch (selectedMenu) {
            case "team":
                return <TeamDetails />;
            case "assign":
                return <AssignTask setAssignedTask={setAssignedTask} setRemarks={setRemarks} />;
            case "show":
                return <ShowTask assignTask={assignTask} remarks={remarks} />;
            case "notice":
                return <AddNotice />;
            case "shownotice":
                return <ShowNotice></ShowNotice>;
            default:
                return <TeamDetails />;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#0B1F3A] text-white text-lg p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg`}>
                <div className="flex justify-between items-center lg:hidden">
                    <h2 className="text-md font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Teacher Dashboard</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={24} />
                    </button>
                </div>
                <h2 className="text-xl font-bold pb-3 lg:mb-6 hidden lg:block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"> Teacher Dashboard</h2>

                <ul className="space-y-2 pt-2 lg:pt-0">
                    <li
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-800 ${selectedMenu === "team" ? "bg-blue-700" : ""}`}
                        onClick={() => setSelectedMenu("team")}
                    >
                        <FaUsers className="text-white" /> Team Details
                    </li>
                    <li
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${selectedMenu === "assign" ? "bg-blue-700" : ""}`}
                        onClick={() => setSelectedMenu("assign")}
                    >
                        <FaTasks className="text-white" /> Assign Task
                    </li>
                    <li
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${selectedMenu === "show" ? "bg-blue-700" : ""}`}
                        onClick={() => setSelectedMenu("show")}
                    >
                        <FaClipboardList className="text-white" /> Show Task
                    </li>
                    <li
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${selectedMenu === "notice" ? "bg-blue-700" : ""}`}
                        onClick={() => setSelectedMenu("notice")}
                    >
                        <FaRegStickyNote className="text-white" /> Add Notice
                    </li>
                    <li
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 ${selectedMenu === "shownotice" ? "bg-blue-700" : ""}`}
                        onClick={() => setSelectedMenu("shownotice")}
                    >
                        <FaRegStickyNote className="text-white" /> Show Notice
                    </li>
                    <a href="/teacherHome">
                    <li className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700">
                    <FaStore className="text-white" /> Home
                    </li>
                    </a>
                </ul>
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="absolute top-4 left-4 lg:hidden z-20 text-white bg-blue-700 p-2 rounded-md shadow-md"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Content Area */}
            <div className="flex-1 p-5 pt-6 overflow-auto px-3 bg-gradient-to-br from-blue-50 to-blue-100">{renderContent()}</div>
        </div>

    );
};

export default TeacherDashboard;