/* eslint-disable react/prop-types */
import {  useState } from "react";
import { FaUsers, FaTasks, FaClipboardList, FaRegStickyNote } from "react-icons/fa";
import { Menu, X } from 'lucide-react';

// Default Props for groupMembers to prevent undefined error
const TeamDetails = () => {
    // Hardcoding the team members data instead of passing it through props
    const membersData = [
        { id: 21224103072, name: 'Adib Mahmud', intake: '48', section: '3' },
        { id: 21224103065, name: 'Md. Zahidul Islam Mollik', intake: '48', section: '3' },
        { id: 21224103077, name: 'Meher Afroz Binu', intake: '48', section: '3' },
        { id: 21224103078, name: 'Tasnia Sultana Hema', intake: '48', section: '3' },
        { id: 21224103062, name: 'Sohan Reza', intake: '48', section: '3' }
    ];

    return (
        <div className="team-details-container">
            <h2 className="text-xl font-bold mb-4">Team Details</h2>
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
                    {membersData.map(member => (
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
    );
};

const AssignTask = ({ setAssignedTask, setRemarks }) => {
    const [assignTask, setAssignTask] = useState('');
    const [remarks, setRemarksInput] = useState('');

    // Handle task assignment
    const handleAssignTask = () => {
        setAssignedTask(assignTask);
        setAssignTask('');  // Reset input field after assigning
    };

    // Handle remarks submission
    const handleSendRemarks = () => {
        setRemarks(remarks);
        setRemarksInput('');  // Reset input field after sending remarks
    };

    return (
        <div className="assign-task-container">
            <h2 className="text-xl font-bold mb-4">Assign Task to Student</h2>

            {/* Assign Task */}
            <div className="mb-4 ">
                <label htmlFor="task" className="block text-sm font-medium">Assign Task</label>
                <div className="flex  items-center">
                    <input
                        id="task"
                        type="text"
                        value={assignTask}
                        onChange={(e) => setAssignTask(e.target.value)}
                        placeholder="Enter task"
                        className="p-2 border border-gray-300 w-[500px] rounded mr-2"
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
                        className="p-2 border border-gray-300 w-[500px] rounded mr-2"
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



const ShowTask = ({ assignTask, remarks }) => {
    const [tasks, setTasks] = useState([
        { taskNumber: 1, assignedTask: assignTask, remarks: remarks },
    ]);

    // Delete a task by its task number
    const deleteTask = (taskNumber) => {
        const filteredTasks = tasks.filter(task => task.taskNumber !== taskNumber);
        setTasks(filteredTasks);
    };

    return (
        <div className="show-task-container">
            <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>

            {/* Table for displaying assigned tasks and remarks */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 text-left">Task Number</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Assigned Task</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Remarks</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.taskNumber}>
                            <td className="px-4 py-2 border border-gray-300">{task.taskNumber}</td>
                            <td className="px-4 py-2 border border-gray-300">{task.assignedTask}</td>
                            <td className="px-4 py-2 border border-gray-300">{task.remarks}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteTask(task.taskNumber)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* For adding a new task */}
            <div className="mt-4">
                <button
                    onClick={() => setTasks([...tasks, { taskNumber: tasks.length + 1, assignedTask: "New Task", remarks: "New Remarks" }])}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};




const AddNotice = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Handle notice submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            // Here, you can send the data to a server or update the state
            console.log("Notice added:", { title, content });
            setTitle(''); // Clear input field after submission
            setContent(''); // Clear input field after submission
        } else {
            alert('Please fill in both title and content.');
        }
    };

    return (
        <div className="add-notice-container">
            <h2 className="text-xl font-bold mb-4">Add a Notice</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Notice Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter notice title"
                        className="p-2 border border-gray-300 w-full rounded"
                    />
                </div>

                {/* Notice Content */}
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter notice content"
                        rows="6"
                        className="p-2 border border-gray-300 w-full rounded"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Add Notice
                    </button>
                </div>
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
