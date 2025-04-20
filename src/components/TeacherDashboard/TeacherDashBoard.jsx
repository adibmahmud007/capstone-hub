/* eslint-disable react/prop-types */
import {  useState,useEffect } from "react";
import { FaUsers, FaTasks, FaClipboardList, FaRegStickyNote } from "react-icons/fa";
import { Menu, X } from 'lucide-react';
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// Default Props for groupMembers to prevent undefined error



const TeamDetails = () => {
    const teams = [
        {
            name: 'Intake 48',
            sections: {
                section1: [
                    { id: 21224103072, name: 'Adib Mahmud', intake: '48', section: '3' },
                    { id: 21224103065, name: 'Md. Zahidul Islam Mollik', intake: '48', section: '3' }
                ]
            }
        },
        {
            name: 'Intake 49',
            sections: {
                section1: [
                    { id: 21224103077, name: 'Meher Afroz Binu', intake: '48', section: '3' }
                ],
                section2: [
                    { id: 21224103078, name: 'Tasnia Sultana Hema', intake: '48', section: '3' }
                ]
            }
        },
        {
            name: 'Intake 47',
            sections: {
                section1: [
                    { id: 21224103062, name: 'Sohan Reza', intake: '48', section: '3' }
                ]
            }
        }
    ];

    const [openIntake, setOpenIntake] = useState(null);
    const [openSections, setOpenSections] = useState({});

    const toggleIntake = (index) => {
        setOpenIntake(openIntake === index ? null : index);
        setOpenSections({});
    };

    const toggleSection = (intakeIndex, sectionKey) => {
        const key = `${intakeIndex}-${sectionKey}`;
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">👥 Team Overview</h2>

            {teams.map((team, intakeIndex) => (
                <div key={intakeIndex} className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    {/* Intake Header */}
                    <button
                        onClick={() => toggleIntake(intakeIndex)}
                        className="w-full flex justify-between items-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition"
                    >
                        <span>{team.name}</span>
                        <span className="text-xl">{openIntake === intakeIndex ? '▲' : '▼'}</span>
                    </button>

                    {/* Sections inside intake */}
                    {openIntake === intakeIndex && (
                        <div className="bg-gray-50 px-4 py-4">
                            {Object.entries(team.sections).map(([sectionKey, members], sectionIndex) => {
                                const key = `${intakeIndex}-${sectionKey}`;
                                const isOpen = openSections[key];

                                return (
                                    <div key={sectionKey} className="mb-4">
                                        {/* Section Header */}
                                        <button
                                            onClick={() => toggleSection(intakeIndex, sectionKey)}
                                            className="w-full flex justify-between items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium text-gray-700 transition"
                                        >
                                            <span>📘 Section {sectionIndex + 1}</span>
                                            <span>{isOpen ? '−' : '+'}</span>
                                        </button>

                                        {/* Section Content */}
                                        {isOpen && (
                                            <div className="mt-2 bg-white rounded-md shadow p-4">
                                                <table className="w-full table-auto text-sm">
                                                    <thead>
                                                        <tr className="bg-gray-100 text-gray-700">
                                                            <th className="text-left px-4 py-2">Name</th>
                                                            <th className="text-left px-4 py-2">ID</th>
                                                            <th className="text-left px-4 py-2">Intake</th>
                                                            <th className="text-left px-4 py-2">Section</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {members.map((member) => (
                                                            <tr key={member.id} className="border-t hover:bg-gray-50 transition">
                                                                <td className="px-4 py-2">{member.name}</td>
                                                                <td className="px-4 py-2">{member.id}</td>
                                                                <td className="px-4 py-2">{member.intake}</td>
                                                                <td className="px-4 py-2">{member.section}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};






const AssignTask = ({ setAssignedTask, setRemarks }) => {
    const [assignTask, setAssignTask] = useState('');
    const [remarks, setRemarksInput] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [loading, setLoading] = useState(false);

    const teams = [
        { name: 'Team Alpha' },
        { name: 'Team Bravo' },
        { name: 'Team Delta' },
        { name: 'Team Sigma' }
    ];

    const API_URL = 'https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task';

    const handleAssignTask = async () => {
        if (!selectedTeam || !assignTask) {
            alert('Please select a team and enter a task before assigning.');
            return;
        }

        const payload = {
            teamId: selectedTeam,
            assignedTask: assignTask,
            remarks : remarks
        };

        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Task assigned successful');
                setAssignedTask(assignTask);
                setRemarks(remarks);
                setAssignTask('');
                setRemarksInput('');
                setSelectedTeam('');
            } else {
                toast.error(data);
                toast.error('Failed to assign task.');
            }
        } catch (error) {
            toast.error('Error:', error);
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 lg:bg-white lg:shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📋 Assign Task to Team</h2>

            {/* Select Team */}
            <div className="mb-5">
                <label htmlFor="team-select" className="block text-sm font-semibold text-gray-700 mb-1">Select Team</label>
                <select
                    id="team-select"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">-- Choose Team --</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team.name}>{team.name}</option>
                    ))}
                </select>
            </div>

            {/* Assign Task Input */}
            <div className="mb-5">
                <label htmlFor="task" className="block text-sm font-semibold text-gray-700 mb-1">Assign Task</label>
                <div className="flex gap-2">
                    <input
                        id="task"
                        type="text"
                        value={assignTask}
                        onChange={(e) => setAssignTask(e.target.value)}
                        placeholder="Enter task..."
                        className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* Remarks Input */}
            <div className="mb-5">
                <label htmlFor="remarks" className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
                <div className="flex gap-2">
                    <input
                        id="remarks"
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarksInput(e.target.value)}
                        placeholder="Write a note or feedback..."
                        className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleAssignTask}
                    disabled={loading}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition ${loading && 'opacity-50 cursor-not-allowed'}`}
                >
                    {loading ? 'Assigning...' : 'Assign Task'}
                </button>
            </div>
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
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Failed to delete task");
            toast.success('Task deleted Successfully');
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assignedTask: editForm.assignedTask,
                    remarks: editForm.remarks,
                    status: 'Updated'
                })
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
        <div className="max-w-4xl mx-auto mt-12 p-6 lg:overflow-x-hidden overflow-x-scroll bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📌 Assigned Tasks</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading tasks...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-600">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-700 border-b">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Team</th>
                                <th className="px-4 py-3">Assigned Task</th>
                                <th className="px-4 py-3">Remarks</th>
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
                                    <tr key={task._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3">{task.team}</td>
                                        <td className="px-4 py-3">{task.assignedTask}</td>
                                        <td className="px-4 py-3">{task.remarks}</td>
                                        <td className="px-4 py-3 text-center space-x-2">
                                            <button
                                                onClick={() => deleteTask(task._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleEditClick(task)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Edit Task</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Assigned Task</label>
                            <input
                                type="text"
                                name="assignedTask"
                                value={editForm.assignedTask}
                                onChange={handleEditChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Remarks</label>
                            <textarea
                                name="remarks"
                                value={editForm.remarks}
                                onChange={handleEditChange}
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setEditingTask(null)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
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







const AddNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const teamOptions = ['Team Alpha', 'Team Bravo', 'Team Delta'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeam) {
            alert("Please select a team.");
            return;
        }

        const noticeData = {
            teamName: selectedTeam,
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

            if (!response.ok) {
                throw new Error("Failed to create notice");
            }

            console.log(response)
            toast.success("Notice added successfully!");

            // Clear form fields
            setTitle('');
            setContent('');
            setSelectedTeam('');
        } catch (error) {
            console.error("Error creating notice:", error);
            toast.error("Failed to add notice. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-2 p-4 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">📢 Add New Notice</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Team</label>
                    <select
                        name="team"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">-- Select Team --</option>
                        {teamOptions.map((team, index) => (
                            <option key={index} value={team}>{team}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Notice Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter notice title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Notice Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="6"
                        placeholder="Write the full notice content here..."
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Add Notice
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
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📃 All Notices</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading notices...</p>
            ) : notices.length === 0 ? (
                <p className="text-center text-gray-400 italic">No notices available.</p>
            ) : (
                <div className="space-y-6">
                    {notices.map((notice) => (
                        <div key={notice._id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">{notice.noticeTitle}</h3>
                                <span className="text-sm text-gray-500">📌 {notice.teamName}</span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">{notice.noticeDetails}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleDelete(notice._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEditClick(notice)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
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
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Notice</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Details</label>
                                <textarea
                                    value={editDetails}
                                    onChange={(e) => setEditDetails(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingNotice(null)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-lg text-white p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center lg:hidden">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={24} />
                    </button>
                </div>
                <h2 className="text-lg font-bold mb-4 hidden lg:block">Teacher Dashboard Menu</h2>
                
                <ul>
                    <li
                        className={`p-3 cursor-pointer flex items-center gap-2 ${selectedMenu === "team" ? "bg-gray-700" : ""}`}
                        onClick={() => setSelectedMenu("team")}
                    >
                        <FaUsers /> Team Details
                    </li>
                    <li
                        className={`p-3 cursor-pointer flex items-center gap-2 ${selectedMenu === "assign" ? "bg-gray-700" : ""}`}
                        onClick={() => setSelectedMenu("assign")}
                    >
                        <FaTasks /> Assign Task
                    </li>
                    <li
                        className={`p-3 cursor-pointer flex items-center gap-2 ${selectedMenu === "show" ? "bg-gray-700" : ""}`}
                        onClick={() => setSelectedMenu("show")}
                    >
                        <FaClipboardList /> Show Task
                    </li>
                    <li
                        className={`p-3 cursor-pointer flex items-center gap-2 ${selectedMenu === "notice" ? "bg-gray-700" : ""}`}
                        onClick={() => setSelectedMenu("notice")}
                    >
                        <FaRegStickyNote /> Add Notice
                    </li>
                    <li
                        className={`p-3 cursor-pointer flex items-center gap-2 ${selectedMenu === "shownotice" ? "bg-gray-700" : ""}`}
                        onClick={() => setSelectedMenu("shownotice")}
                    >
                        <FaRegStickyNote /> Show Notice
                    </li>
                    {/* <li className="p-3 cursor-pointer flex items-center gap-2">
                      <Link to='/'>Home</Link>
                    </li> */}
                </ul>
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 lg:hidden z-20 text-gray-200 bg-gray-700 p-2 rounded-md shadow-md">
                    <Menu size={24} />
                </button>
            )}

            {/* Content Area */}
            <div className="flex-1 p-5 pt-20 px-3 bg-gray-100">{renderContent()}</div>
        </div>
    );
};

export default TeacherDashboard;
