/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TeacherDashboard from '../TeacherDashboard/TeacherDashBoard';

const StudentDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('createGroup');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Move groupMembers state to StudentDashboard
    const [groupMembers, setGroupMembers] = useState([]);
    const isTeacher = window.location.pathname === "/teacherDashboard"; // Example URL check


    const renderContent = () => {
        switch (activeMenu) {
            case 'createGroup':
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
            case 'myTeam':
                return <MyTeam groupMembers={groupMembers} />;
            case 'createProject':
                return <CreateProject />;
            // case 'joinProject':
                // return <JoinProject />;
            case 'showTask':
                return <ShowTask />;
            // case 'approveJoinRequest':
                // return <ApproveJoinRequest />;
            default:
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center lg:hidden">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={24} />
                    </button>
                </div>
                <h2 className="text-lg font-bold mb-4 hidden lg:block">Student Dashboard Menu</h2>
                <ul>
                    {[
                        { key: 'createGroup', label: 'Create Group' },
                        { key: 'myTeam', label: 'My Team' },
                        { key: 'createProject', label: 'Create Project' },
                        // { key: 'joinProject', label: 'Join Project' },
                        { key: 'showTask', label: 'Show Task' },
                        // { key: 'approveJoinRequest', label: 'Approve Join Request' }
                    ].map(({ key, label }) => (
                        <li
                            key={key}
                            className={`cursor-pointer p-2 hover:bg-gray-700 ${activeMenu === key ? 'bg-gray-600' : ''}`}
                            onClick={() => {
                                setActiveMenu(key);
                                setSidebarOpen(false);
                            }}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
                <TeacherDashboard groupMembers={groupMembers}></TeacherDashboard>
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 lg:hidden z-20 text-gray-200 bg-gray-700 p-2 rounded-md shadow-md">
                    <Menu size={24} />
                </button>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 pt-10 lg:pl-28 lg:pt-16">
                {renderContent()}
            </div>
        </div>
    );
};


const CreateGroup = ({ groupMembers, setGroupMembers }) => {
    const [member, setMember] = useState({
        name: '',
        intake: '',
        section: '',
        department: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGroupMembers([...groupMembers, member]); // Update global state
        setMember({ name: '', intake: '', section: '', department: '', email: '', phone: '' });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Group</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={member.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intake</label>
                        <input type="text" name="intake" value={member.intake} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <input type="text" name="section" value={member.section} onChange={handleChange} className="w-full p-2 border rounded" required />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select name="department" value={member.department} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="EEE">EEE</option>
                        <option value="BBA">BBA</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Mail</label>
                    <input type="email" name="email" value={member.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="text" name="phone" value={member.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition">Add Member</button>
            </form>
        </div>
    );
};

// eslint-disable-next-line no-unused-vars
const MyTeam = ({ groupMembers, supervisor }) => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">OpenSpace - Capstone Repository System</h1>
            <h2 className="text-xl font-semibold mb-4">Supervisor: Saifur Rahman</h2>
            <h2 className="text-2xl font-bold mb-6">My Team</h2>
            {groupMembers.length === 0 ? (
                <p className="text-gray-500">No members added yet.</p>
            ) : (
                <ul className="mt-2 border p-4 rounded bg-gray-100">
                    {groupMembers.map((member, index) => (
                        <li key={index} className="border-b py-2">
                            {member.name} - {member.intake} {member.section} - {member.department} - {member.email} - {member.phone}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};







const CreateProject = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teamMembers, setTeamMembers] = useState(['']);
    const [zipFile, setZipFile] = useState(null);

    const handleTeamMemberChange = (index, value) => {
        const newTeamMembers = [...teamMembers];
        newTeamMembers[index] = value;
        setTeamMembers(newTeamMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            projectTitle,
            description,
            teamMembers,
            zipFile,
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (Email/Username)</label>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={member}
                                onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter email or username"
                                required
                            />
                            {index === teamMembers.length - 1 && (
                                <button
                                    type="button"
                                    onClick={addTeamMember}
                                    className="ml-2 text-blue-500 hover:underline"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Project Zip File</label>
                    <input
                        type="file"
                        accept=".zip"
                        onChange={(e) => setZipFile(e.target.files[0])}
                        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
};

// const JoinProject = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [teams] = useState([
//         { id: 1, name: "Tech Wizards", joined: false },
//         { id: 2, name: "Code Masters", joined: false },
//         { id: 3, name: "AI Innovators", joined: false },
//         { id: 4, name: "Cyber Guardians", joined: false },
//         { id: 5, name: "Data Scientists", joined: false },
//     ]);
//     const [joinedTeams, setJoinedTeams] = useState({});

//     const handleJoin = (id) => {
//         setJoinedTeams(prevState => ({ ...prevState, [id]: true }));
//     };

//     const filteredTeams = teams.filter(team =>
//         searchTerm.length > 0 && team.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Join a Team</h2>

//             {/* Search Input */}
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search for a team..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
//                 />
//             </div>

//             {/* Team List (Only shows results if searchTerm is not empty) */}
//             {filteredTeams.length > 0 ? (
//                 <ul className="space-y-4">
//                     {filteredTeams.map(({ id, name }) => (
//                         <li key={id} className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-gray-50">
//                             <span className="text-gray-800 font-medium">{name}</span>
//                             {joinedTeams[id] ? (
//                                 <span className="text-green-600 font-semibold">Request Sent ✅</span>
//                             ) : (
//                                 <button 
//                                     onClick={() => handleJoin(id)}
//                                     className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                                 >
//                                     Join Team
//                                 </button>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : searchTerm.length > 0 ? (
//                 <p className="text-gray-500">No teams found.</p>
//             ) : null}
//         </div>
//     );
// };



const ShowTask = () => {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Complete project proposal", completed: false, remark: "Pending approval" },
        { id: 2, task: "Research related work", completed: false, remark: "Review needed" },
        { id: 3, task: "Develop frontend UI", completed: false, remark: "Looks good" },
        { id: 4, task: "Integrate API", completed: false, remark: "Work in progress" },
        { id: 5, task: "Test project functionality", completed: false, remark: "Tests required" },
    ]);

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-left">Task #</th>
                            <th className="border border-gray-300 p-2 text-left">Task</th>
                            <th className="border border-gray-300 p-2 text-center">Status</th>
                            <th className="border border-gray-300 p-2 text-left">Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(({ id, task, completed, remark }) => (
                            <tr key={id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{id}</td>
                                <td className="border border-gray-300 p-2">{task}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button 
                                        onClick={() => toggleCompletion(id)}
                                        className={`px-3 py-1 rounded-md text-white transition ${completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        {completed ? "Completed" : "Not Completed"}
                                    </button>
                                </td>
                                <td className="border border-gray-300 p-2">{remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// const ApproveJoinRequest = () => {
//     const [requests, setRequests] = useState([
//         { id: 1, name: "John Doe", status: "pending" },
//         { id: 2, name: "Jane Smith", status: "pending" },
//         { id: 3, name: "Alice Johnson", status: "pending" },
//     ]);

//     const handleApprove = (id) => {
//         setRequests(requests.map(req => req.id === id ? { ...req, status: "approved" } : req));
//     };

//     const handleDecline = (id) => {
//         setRequests(requests.filter(req => req.id !== id));
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Approve Join Requests</h2>
//             {requests.length > 0 ? (
//                 <ul className="space-y-4">
//                     {requests.map(({ id, name, status }) => (
//                         <li key={id} className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-gray-50">
//                             <span className="text-gray-800 font-medium">{name}</span>
//                             {status === "pending" ? (
//                                 <div className="flex space-x-2">
//                                     <button 
//                                         onClick={() => handleApprove(id)} 
//                                         className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//                                     >
//                                         Approve
//                                     </button>
//                                     <button 
//                                         onClick={() => handleDecline(id)} 
//                                         className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//                                     >
//                                         Decline
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <span className="text-green-600 font-semibold">Approved ✅</span>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-500">No pending requests.</p>
//             )}
//         </div>
//     );
// };


export default StudentDashboard;
