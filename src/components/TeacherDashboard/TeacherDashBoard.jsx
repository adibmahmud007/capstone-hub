/* eslint-disable react/prop-types */
import {  useState,useEffect } from "react";
import { FaUsers, FaTasks, FaClipboardList, FaRegStickyNote } from "react-icons/fa";
import { Menu, X } from 'lucide-react';

// Default Props for groupMembers to prevent undefined error


const TeamDetails = () => {
    // All team data
    const teams = [
        {
            name: 'Intake 48',
            members: [
                { id: 21224103072, name: 'Adib Mahmud', intake: '48', section: '3' },
                { id: 21224103065, name: 'Md. Zahidul Islam Mollik', intake: '48', section: '3' }
            ]
        },
        {
            name: 'Intake 49',
            members: [
                { id: 21224103077, name: 'Meher Afroz Binu', intake: '48', section: '3' },
                { id: 21224103078, name: 'Tasnia Sultana Hema', intake: '48', section: '3' }
            ]
        },
        {
            name: 'Intake 47',
            members: [
                { id: 21224103062, name: 'Sohan Reza', intake: '48', section: '3' }
            ]
        }
    ];

    // Track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);

    // Toggle dropdown
    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className="team-details-wrapper max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Team Details</h2>
            {teams.map((team, index) => (
                <div key={index} className="mb-6 border rounded-lg shadow">
                    <button
                        onClick={() => toggleDropdown(index)}
                        className="w-full flex justify-between items-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-t-lg"
                    >
                        <span>{team.name}</span>
                        <span className="text-xl">{openDropdown === index ? '⬆️' : '⬇️'}</span>
                    </button>
                    {openDropdown === index && (
                        <div className="p-4 bg-white">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">Intake</th>
                                        <th className="px-4 py-2 text-left">Section</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {team.members.map(member => (
                                        <tr key={member.id} className="border-b">
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
            ))}
        </div>
    );
};



const AssignTask = ({ setAssignedTask, setRemarks }) => {
    const [assignTask, setAssignTask] = useState('');
    const [remarks, setRemarksInput] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');  // new state for dropdown

    const teamOptions = ['Intake 1', 'Intake 2', 'Intake 3', 'Intake 4'];

    // Handle task assignment
    const handleAssignTask = () => {
        if (!selectedTeam) {
            alert('Please select a team before assigning a task.');
            return;
        }
        setAssignedTask(assignTask);
        setAssignTask('');
    };

    // Handle remarks submission
    const handleSendRemarks = () => {
        setRemarks(remarks);
        setRemarksInput('');
    };

    return (
        <div className="assign-task-container">
            <h2 className="text-xl font-bold mb-4">Assign Task to Student</h2>

            {/* Team Dropdown */}
            <div className="mb-4">
                <label htmlFor="team-select" className="block text-sm font-medium">Select Team</label>
                <select
                    id="team-select"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="p-2 border border-gray-300 md:w-[350px] lg:w-[500px] rounded"
                >
                    <option value="">-- Select Team --</option>
                    {teamOptions.map((team, index) => (
                        <option key={index} value={team}>{team}</option>
                    ))}
                </select>
            </div>

            {/* Assign Task */}
            <div className="mb-4">
                <label htmlFor="task" className="block text-sm font-medium">Assign Task</label>
                <div className="flex items-center">
                    <input
                        id="task"
                        type="text"
                        value={assignTask}
                        onChange={(e) => setAssignTask(e.target.value)}
                        placeholder="Enter task"
                        className="p-2 border border-gray-300 md:w-[350px] lg:w-[500px] rounded mr-2"
                    />
                    <button 
                        onClick={handleAssignTask}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Assign Task
                    </button>
                </div>
            </div>

            {/* Remarks */}
            <div className="mb-4">
                <label htmlFor="remarks" className="block text-sm font-medium">Remarks</label>
                <div className="flex items-center">
                    <input
                        id="remarks"
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarksInput(e.target.value)}
                        placeholder="Enter remarks"
                        className="p-2 border border-gray-300 md:w-[350px] lg:w-[500px] rounded mr-2"
                    />
                    <button 
                        onClick={handleSendRemarks}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Send Remarks
                    </button>
                </div>
            </div>
        </div>
    );
};







const ShowTask = ({ assignedTask, remarks, team }) => {
    const [tasks, setTasks] = useState([]);

    // Whenever assignedTask, remarks, or team change, add a new task
    useEffect(() => {
        if (assignedTask && remarks && team) {
            const newTask = {
                taskNumber: tasks.length + 1,
                assignedTask,
                remarks,
                team,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    }, [assignedTask, remarks, tasks.length, team]);

    const deleteTask = (taskNumber) => {
        const filtered = tasks.filter((task) => task.taskNumber !== taskNumber);
        setTasks(filtered);
    };

    return (
        <div className="show-task-container mt-10">
            <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>

            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 text-left">#</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Team</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Assigned Task</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Remarks</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No tasks assigned yet.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr key={task.taskNumber}>
                                <td className="px-4 py-2 border border-gray-300">{task.taskNumber}</td>
                                <td className="px-4 py-2 border border-gray-300">{task.team}</td>
                                <td className="px-4 py-2 border border-gray-300">{task.assignedTask}</td>
                                <td className="px-4 py-2 border border-gray-300">{task.remarks}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => deleteTask(task.taskNumber)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};






const AddNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const teamOptions = ['intake1', 'intake2', 'intake3'];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTeam) {
            alert("Please select a team.");
            return;
        }

        const noticeData = {
            title,
            content,
            team: selectedTeam,
        };

        console.log("Notice added:", noticeData);
        // Reset form
        setTitle('');
        setContent('');
        setSelectedTeam('');
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Notice</h2>

            {/* Team Dropdown at the Top */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Team</label>
                <select
                    name="team"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">-- Select Team --</option>
                    {teamOptions.map((team, index) => (
                        <option key={index} value={team}>{team}</option>
                    ))}
                </select>
            </div>

            {/* Existing Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="6"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition">
                    Add Notice
                </button>
            </form>
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
            default:
                return <TeamDetails />;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                </ul>
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 lg:hidden z-20 text-gray-200 bg-gray-700 p-2 rounded-md shadow-md">
                    <Menu size={24} />
                </button>
            )}

            {/* Content Area */}
            <div className="flex-1 p-5 mt-20 mx-3 bg-gray-100">{renderContent()}</div>
        </div>
    );
};

export default TeacherDashboard;
