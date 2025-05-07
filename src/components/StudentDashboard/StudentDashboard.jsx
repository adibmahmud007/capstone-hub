/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// import TeacherDashboard from '../TeacherDashboard/TeacherDashBoard';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // ✅ CORRECT


const StudentDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('createGroup');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [teamName, setTeamName] = useState(''); // Fixed: Consistent naming


    // Move groupMembers state to StudentDashboard
    // const [groupMembers, setGroupMembers] = useState([]);
    // console.log(groupMembers);
    // const isTeacher = window.location.pathname === "/teacherDashboard"; // Example URL check
    const [groupMembers, setGroupMembers] = useState([]);
    // const [teamName, setLocalTeamName] = useState(''); // Fixed: Use local state for display

    const [supervisor, setSupervisor] = useState("Saifur Rahman");

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                const decoded = jwtDecode(token);
                const educationalMail = decoded.email;
                console.log(educationalMail, 'mail');

                const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/myteam/${educationalMail}`);
                const data = await response.json();

                console.log(data);
                if (response.ok) {
                    setGroupMembers(data.data[0].members);
                    // setLocalTeamName(data.data[0].teamName);
                    setTeamName(data.data[0].teamName); // Fixed: Update parent component state

                    setSupervisor(data.data[0].supervisor || "");
                } else {
                    console.error(data.message || "Failed to fetch team");
                }
            } catch (error) {
                console.error("Error fetching team:", error.message);
            }
        };

        fetchTeamData();
    }, [setTeamName]);


    const renderContent = () => {
        switch (activeMenu) {
            case 'createGroup':
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
            case 'myTeam':
                return <MyTeam teamName={teamName} supervisor={supervisor} groupMembers={groupMembers} />; // Fixed: Passing the correct setter
            case 'createProject':
                return <CreateProject />;
            // case 'joinProject':
                // return <JoinProject />;
            case 'showTask':
                return <ShowTask teamName={teamName} />;
            // case 'approveJoinRequest':
                // return <ApproveJoinRequest />;
            default:
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
        }
    };

    return (
        <div className="flex h-screen bg-white lg:bg-gray-100">
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
                
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 lg:hidden z-20 text-gray-200 bg-gray-700 p-2 rounded-md shadow-md">
                    <Menu size={24} />
                </button>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 pt-10 lg:pl-28 lg:pt-16">
                {renderContent()}
                {/* <TeacherDashboard groupMembers={groupMembers} setGroupMembers={setGroupMembers}></TeacherDashboard> */}
            </div>
        </div>
    );
};



const CreateGroup = () => {
    const [teamName, setTeamName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [member, setMember] = useState({
        username: '',
        intake: '',
        section: '',
        department: '',
        educationalMail: '',
        phone: ''
    });

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    };

    const handleAddMember = (e) => {
        e.preventDefault();

        if (groupMembers.length >= 5) {
            toast.error("A group can have only 5 members");
            return;
        }

        setGroupMembers([...groupMembers, member]);
        setMember({
            username: '',
            intake: '',
            section: '',
            department: '',
            educationalMail: '',
            phone: ''
        });

        toast.success("Member added successfully");
    };

    const handleCreateGroup = async () => {
        if (groupMembers.length > 5) {
            toast.error("Exactly 5 members are required to create a group");
            return;
        }

        if (!teamName) {
            toast.error("Team name is required");
            return;
        }

        const teamData = { teamName, members: groupMembers };

        try {
            const response = await fetch('https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teamData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setGroupMembers([]);
                setTeamName('');
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message || "Error submitting group");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white lg:shadow-xl rounded-2xl p-2 lg:p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Create Capstone Group</h2>

            {/* Team Name */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Member Form */}
            <form onSubmit={handleAddMember} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Member ({groupMembers.length}/5)</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="username"
                        value={member.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intake</label>
                        <input
                            type="text"
                            name="intake"
                            value={member.intake}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 54"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                        <input
                            type="text"
                            name="section"
                            value={member.section}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., A"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                        name="department"
                        value={member.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="EEE">EEE</option>
                        <option value="BBA">BBA</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education Email</label>
                    <input
                        type="email"
                        name="educationalMail"
                        value={member.educationalMail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@student.university.edu"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={member.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="01XXXXXXXXX"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Add Member
                </button>
            </form>

            {/* Group Submit */}
            <div className="mt-8">
                <button
                    onClick={handleCreateGroup}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Create Group
                </button>
            </div>
        </div>
    );
};





const MyTeam = ({ teamName,supervisor,groupMembers }) => { // Fixed: Updated prop name
     // Fixed: Add dependency

    return (
        <div className="max-w-5xl mx-auto p-2 lg:p-8 bg-white rounded-lg lg:shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">OpenSpace - Capstone Repository System</h1>
            <div className="mb-4">
                <h2 className="text-2xl text-center font-bold">Supervisor: <span className="text-gray-700">{supervisor}</span></h2>
                <h2 className="text-xl text-center font-semibold mt-2">Team Name: <span className="text-gray-800">{teamName}</span></h2>
            </div>

            {groupMembers.length === 0 ? (
                <p className="text-gray-500 text-center">No members added yet.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-300 text-sm text-left">
                        <thead className="bg-blue-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="px-4 py-3 border">#</th>
                                <th className="px-4 py-3 border">Name</th>
                                <th className="px-4 py-3 border">Intake</th>
                                <th className="px-4 py-3 border">Section</th>
                                <th className="px-4 py-3 border">Department</th>
                                <th className="px-4 py-3 border">Email</th>
                                <th className="px-4 py-3 border">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupMembers.map((member, index) => (
                                <tr key={index} className="bg-white even:bg-gray-50">
                                    <td className="px-4 py-3 border">{index + 1}</td>
                                    <td className="px-4 py-3 border">{member.username}</td>
                                    <td className="px-4 py-3 border">{member.intake}</td>
                                    <td className="px-4 py-3 border">{member.section}</td>
                                    <td className="px-4 py-3 border">{member.department}</td>
                                    <td className="px-4 py-3 border">{member.educationalMail}</td>
                                    <td className="px-4 py-3 border">{member.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg lg:shadow-md">
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






const ShowTask = ({ teamName }) => {
    const [tasks, setTasks] = useState([]);
    console.log(teamName,'from show task')
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${teamName}`);
                const fetchedTasks = response.data.data || [];
                console.log(response.data,'from show task')
                // Assuming the API returns: [{ task: "...", remark: "..." }]
                const mappedTasks = fetchedTasks.map((taskObj, index) => ({
                    id: index + 1,
                    task: taskObj.assignedTask,
                    completed: taskObj.status, // Default to false as API doesn't provide it
                    remark: taskObj.remarks,
                }));

                setTasks(mappedTasks);
            } catch (error) {
                toast.error("Failed to fetch tasks");
                console.error("Error fetching tasks:", error);
            }
        };

        if (teamName) fetchTasks();
    }, [teamName]);

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                const updatedTask = { ...task, completed: !task.completed };
                updatedTask.completed
                    ? toast.success('Task completed successfully!')
                    : toast.error('Task is not completed!');
                return updatedTask;
            }
            return task;
        }));
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-lg transition-all">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">📋 Project Task Manager</h2>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full divide-y divide-gray-500">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Task #</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Task</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Remark</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {tasks.map(({ id, task, completed, remark }) => (
                            <tr key={id} className="hover:bg-gray-50 transition-all">
                                <td className="px-6 py-4 text-sm text-gray-700">{id}</td>
                                <td className={`px-6 py-4 text-sm ${completed ? "text-gray-400 line-through italic" : "text-gray-800"}`}>
                                    {task}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={completed}
                                            onChange={() => toggleCompletion(id)}
                                            className="form-checkbox h-5 w-5 text-green-500 rounded transition duration-300"
                                        />
                                        <span className={`text-sm font-medium ${completed ? "text-green-600" : "text-red-500"}`}>
                                            {completed ? "Completed" : "Not Completed"}
                                        </span>
                                    </label>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{remark}</td>
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