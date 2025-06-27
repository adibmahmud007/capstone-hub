/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
// import TeacherDashboard from '../TeacherDashboard/TeacherDashBoard';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // ✅ CORRECT
import {
    Users,
    UserCheck,
    FolderPlus,
    CloudUpload,
    CheckSquare,
    Bell,
    Home,
} from 'lucide-react';


const StudentDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('createGroup');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [supervisor, setSupervisor] = useState("Saifur Rahman");
    // const [newTaskCount, setNewTaskCount] = useState(0);
    // const [lastTaskCheckTime, setLastTaskCheckTime] = useState(new Date());

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
                // console.log(educationalMail, 'mail');

                const response = await fetch(`https://capstone-repo-2933d2307df0.herokuapp.com/api/student/team/myteam/${educationalMail}`);
                const data = await response.json();

                // console.log(data);
                if (response.ok) {
                    setGroupMembers(data.data[0].members);
                    setTeamName(data.data[0].teamName);
                    setSupervisor(data.data[0].assignedTeacher || "");

                    // Initialize last check time if not set
                    // const storedCheckTime = localStorage.getItem('lastTaskCheckTime');
                    // if (storedCheckTime) {
                    //     setLastTaskCheckTime(new Date(storedCheckTime));
                    // }

                    // Fetch tasks to check for new ones
                    // const taskResponse = await fetch(
                    //     `https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${data.data[0].teamName}`
                    // );
                    // const taskData = await taskResponse.json();
                    // const fetchedTasks = taskData.data || [];

                    // Calculate new tasks (created after last check time)
                    // const count = fetchedTasks.filter(task =>
                    //     new Date(task.createdAt) > new Date(lastTaskCheckTime)
                    // ).length;
                    // setNewTaskCount(count);
                } else {
                    console.error(data.message || "Failed to fetch team");
                }
            } catch (error) {
                console.error("Error fetching team:", error.message);
            }
        };

        fetchTeamData();

        // Set up interval to check for new tasks periodically
        const intervalId = setInterval(fetchTeamData, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, [teamName]);

    // const handleTaskView = () => {
    //     // Update last check time to now
    //     const now = new Date();
    //     setLastTaskCheckTime(now);
    //     localStorage.setItem('lastTaskCheckTime', now.toISOString());
    //     setNewTaskCount(0);
    // };

    const renderContent = () => {
        switch (activeMenu) {
            case 'createGroup':
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
            case 'myTeam':
                return <MyTeam teamName={teamName} supervisor={supervisor} groupMembers={groupMembers} />;
            case 'createProject':
                return <CreateProject teamName={teamName} supervisor={supervisor} />;
            case 'showTask':
                return <ShowTask teamName={teamName}  />;
            case 'upload':
                return <Upload></Upload>;
            case 'showNotice':
                return <ShowNotice teamName={teamName} />;
            default:
                return <CreateGroup groupMembers={groupMembers} setGroupMembers={setGroupMembers} />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 lg:pt-5 left-0 w-64 bg-[#0B1F3A] text-white p-4 transition-transform duration-300 shadow-xl z-30 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-4 lg:hidden">
                    <h2 className="text-md font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Student Dashboard</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-blue-300">
                        <X size={24} />
                    </button>
                </div>

                <h2 className="text-xl font-extrabold mb-4 hidden lg:block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    Student Dashboard
                </h2>

                <ul className="space-y-2">
                    {[
                        { key: 'createGroup', label: 'Create Group', icon: <Users size={18} /> },
                        { key: 'myTeam', label: 'My Team', icon: <UserCheck size={18} /> },
                        { key: 'createProject', label: 'Create Project', icon: <FolderPlus size={18} /> },
                        { key: 'upload', label: 'Upload', icon: <CloudUpload size={18} /> },
                        {
                            key: 'showTask',
                            label: 'Show Task',
                            icon: <CheckSquare size={18} />,
                            // badge: newTaskCount > 0 ? newTaskCount : null
                        },
                        { key: 'showNotice', label: 'Show Notice', icon: <Bell size={18} /> },
                        { key: '/studentHome', label: 'Home', icon: <Home size={18} /> },
                    ].map(({ key, label, icon, badge }) => (
                        <li
                            key={key}
                            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 relative ${activeMenu === key
                                ? 'bg-blue-700 text-white shadow'
                                : 'hover:bg-blue-800 text-blue-100 hover:text-white'
                                }`}
                            onClick={() => {
                                if (key === '/studentHome') {
                                    window.location.href = '/studentHome';
                                } else {
                                    setActiveMenu(key);
                                }
                                setSidebarOpen(false);
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                {icon}
                                <span>{label}</span>
                                {badge && (
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {badge}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Hamburger Button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="absolute top-4 left-4 lg:hidden z-20 text-white bg-blue-800 p-2 rounded-md shadow-md hover:bg-blue-900 transition"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 pt-10 lg:pl-28 lg:pt-10">
                {renderContent()}
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

        const isDuplicateMail = groupMembers.some(
            (m) => m.educationalMail === member.educationalMail
        );
        const isDuplicatePhone = groupMembers.some(
            (m) => m.phone === member.phone
        );

        if (!member.educationalMail.trim()) {
            toast.error("Educational mail is required.");
            return;
        }

        const trimmedDept = member.educationalMail.split('@')[1]?.split('.')[0];
        console.log(trimmedDept, member.department.toLowerCase(), 'from create group add member');

        // Validation
        if (trimmedDept !== member.department.toLowerCase()) {
            toast.error(`Educational email domain should match department: "${member.department}"`);
            return; // prevent further action
        }

        const requiredDomain = /^[a-zA-Z0-9._]+@([a-z]+\.)?bubt\.edu\.bd$/;

        if (!requiredDomain.test(member.educationalMail)) {
            toast.error(`Educational mail Required`);
            return;
        }

        if (isDuplicateMail) {
            toast.error("The educational mail is already taken.");
            return;
        }

        if (isDuplicatePhone) {
            toast.error("The phone number is already taken.");
            return;
        }

        if (groupMembers.length >= 5) {
            toast.error("A group can have only 5 members");
            return;
        }

        setGroupMembers([...groupMembers, member]);
        setMember({
            username: "",
            intake: "",
            section: "",
            department: "",
            educationalMail: "",
            phone: "",
        });

        toast.success("Member added successfully");
    };



    const handleCreateGroup = async () => {
        if (groupMembers.length < 3) {
            toast.error("Atleast 3 members required to create a group");
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
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 lg:p-10 border border-blue-100">
            <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                Create Capstone Group
            </h2>

            {/* Team Name */}
            <div className="mb-8">
                <label className="block text-lg font-medium text-gray-800 mb-2">Team Name</label>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    className="w-full px-4 py-3 border hover:border-blue-500 hover:border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Member Form */}
            <form onSubmit={handleAddMember} className="space-y-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Add Member ({groupMembers.length}/5)</h3>
                    <p className="text-sm text-gray-500">Fill out the member information below</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            value={member.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Adib Mahmud"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Intake</label>
                            <input
                                type="text"
                                name="intake"
                                value={member.intake}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 48"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                            <input
                                type="text"
                                name="section"
                                value={member.section}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 3"
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
                            className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="EEE">EEE</option>
                            <option value="BBA">BBA</option>
                            <option value="CIVIL">CIVIL</option>
                            <option value="TEXTILE">TEXTILE</option>
                            <option value="LAW">LAW</option>
                            <option value="ECONOMICS">ECONOMICS</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education Email</label>
                        <input
                            type="email"
                            name="educationalMail"
                            value={member.educationalMail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="example@cse.bubt.edu.bd"
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
                            className="w-full px-4 py-2 border rounded-lg hover:border-blue-500 hover:border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="01XXXXXXXXX"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition mt-4"
                >
                    Add Member
                </button>
            </form>

            {/* Group Submit */}
            <div className="mt-10">
                <button
                    onClick={handleCreateGroup}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-lg hover:brightness-110 transition"
                >
                    Create Group
                </button>
            </div>
        </div>
    );
};






const MyTeam = ({ teamName, supervisor, groupMembers }) => {
    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-10 bg-white rounded-2xl shadow-xl">
            {/* Heading */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text mb-2">
                    OpenSpace - Capstone Repository
                </h1>
                <p className="text-gray-600 text-lg">Empowering Teams with Clarity and Coordination</p>
            </div>

            {/* Supervisor & Team Info - Blue Themed Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <p className="text-md text-blue-700 font-medium mb-1">Supervisor</p>
                    <p className="text-2xl font-semibold text-blue-900">{supervisor || 'N/A'}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                    <p className="text-md text-blue-700 font-medium mb-1">Team Name</p>
                    <p className="text-2xl font-semibold text-blue-900">{teamName || 'N/A'}</p>
                </div>
            </div>

            {/* Group Members Table */}
            {groupMembers.length === 0 ? (
                <p className="text-gray-500 text-center">No members added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
                        <thead className="bg-blue-50 text-blue-800 uppercase text-xs font-bold">
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
                                <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-4 py-3 border font-semibold">{index + 1}</td>
                                    <td className="px-4 py-3 border">{member.username}</td>
                                    <td className="px-4 py-3 border">{member.intake}</td>
                                    <td className="px-4 py-3 border">{member.section}</td>
                                    <td className="px-4 py-3 border">{member.department}</td>
                                    <td className="px-4 py-3 border text-blue-700">{member.educationalMail}</td>
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


const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState('Research Paper');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setSelectedFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        // Handle file upload logic here (e.g., formData and API call)
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("fileType", fileType);

        // Example logging
        console.log("Uploading", selectedFile.name, "as", fileType);
        alert("File uploaded successfully!");
    };

    return (
        <div className="max-w-xl mx-auto p-6 mt-10 bg-blue-50 rounded-xl shadow-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">📤 Upload Section</h2>

            {/* Upload Drop Zone */}
            <div
                className="w-full border-2 border-dashed border-blue-400 bg-white rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100 transition"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer text-blue-600 hover:underline">
                    {selectedFile ? (
                        <span className="font-medium">{selectedFile.name}</span>
                    ) : (
                        <>
                            <p className="text-sm">Drag & Drop your file here or</p>
                            <span className="text-blue-700 font-semibold">Browse</span>
                        </>
                    )}
                </label>
            </div>

            {/* File Type Selection */}
            <div className="mt-6">
                <h4 className="text-blue-700 font-semibold mb-2">Select File Type:</h4>
                <div className="flex flex-wrap gap-4">
                    {['Research Paper', 'Code (zip)', 'Dataset', 'Other Document'].map((type) => (
                        <label key={type} className="flex items-center gap-2 text-blue-800">
                            <input
                                type="radio"
                                value={type}
                                checked={fileType === type}
                                onChange={(e) => setFileType(e.target.value)}
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Upload Button */}
            <div className="mt-6 text-right">
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};






const CreateProject = ({ teamName, supervisor }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [projectType, setProjectType] = useState('Software');
    const [keywords, setKeywords] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [furtherImprovement, setFurtherImprovement] = useState('');
    const [department, setDepartment] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [authors, setAuthors] = useState('');
    const [projectCategory, setProjectCategory] = useState('Thesis');

    const [keywordInput, setKeywordInput] = useState('');
    const [technologyInput, setTechnologyInput] = useState('');
    const [keywordSuggestions, setKeywordSuggestions] = useState([]);
    const [technologySuggestions, setTechnologySuggestions] = useState([]);
    const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
    const [showTechnologySuggestions, setShowTechnologySuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    const keywordInputRef = useRef(null);
    const technologyInputRef = useRef(null);

    const commonKeywords = [
        'Machine Learning', 'Artificial Intelligence', 'Data Science', 'Web Development',
        'Mobile Development', 'Database', 'Algorithm', 'Security', 'Cloud Computing',
        'DevOps', 'Frontend', 'Backend', 'Full Stack', 'API', 'Microservices',
        'Blockchain', 'IoT', 'Computer Vision', 'Natural Language Processing',
        'Deep Learning', 'Neural Networks', 'Big Data', 'Analytics'
    ];

    const commonTechnologies = [
        'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Java',
        'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
        'Flutter', 'React Native', 'Vue.js', 'Angular', 'Express.js',
        'Django', 'Flask', 'Spring Boot', 'MongoDB', 'PostgreSQL',
        'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure',
        'Firebase', 'TensorFlow', 'PyTorch', 'OpenCV', 'Git'
    ];

    const filterSuggestions = (input, suggestions) => {
        return suggestions.filter(item =>
            item.toLowerCase().includes(input.toLowerCase()) &&
            !getCurrentTags(input === keywordInput ? 'keywords' : 'technologies').includes(item)
        );
    };

    const getCurrentTags = (type) => {
        return type === 'keywords' ? keywords : technologies;
    };

    const handleKeywordInputChange = (e) => {
        const value = e.target.value;
        setKeywordInput(value);
        if (value.trim()) {
            setKeywordSuggestions(filterSuggestions(value, commonKeywords));
            setShowKeywordSuggestions(true);
        } else {
            setShowKeywordSuggestions(false);
        }
    };

    const handleTechnologyInputChange = (e) => {
        const value = e.target.value;
        setTechnologyInput(value);
        if (value.trim()) {
            setTechnologySuggestions(filterSuggestions(value, commonTechnologies));
            setShowTechnologySuggestions(true);
        } else {
            setShowTechnologySuggestions(false);
        }
    };

    const addKeyword = (keyword) => {
        if (keyword && !keywords.includes(keyword)) {
            setKeywords([...keywords, keyword]);
            setKeywordInput('');
            setShowKeywordSuggestions(false);
        }
    };

    const addTechnology = (technology) => {
        if (technology && !technologies.includes(technology)) {
            setTechnologies([...technologies, technology]);
            setTechnologyInput('');
            setShowTechnologySuggestions(false);
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    const removeTechnology = (technologyToRemove) => {
        setTechnologies(technologies.filter(technology => technology !== technologyToRemove));
    };

    const handleKeywordKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (keywordSuggestions.length > 0) {
                addKeyword(keywordSuggestions[0]);
            } else if (keywordInput.trim()) {
                addKeyword(keywordInput.trim());
            }
        }
    };

    const handleTechnologyKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (technologySuggestions.length > 0) {
                addTechnology(technologySuggestions[0]);
            } else if (technologyInput.trim()) {
                addTechnology(technologyInput.trim());
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            projectTitle,
            teamName,
            abstract,
            projectType,
            keywords,
            technologies,
            furtherImprovement,
            department,
            completionDate,
            authors,
            projectCategory,
            supervisor
        };

        try {
            const response = await fetch('https://capstone-repo-2933d2307df0.herokuapp.com/api/internal/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add this if authentication is required:
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log(response, 'from prject upload');

            if (!response.ok) {
                // Log error message from backend
                console.error('Server responded with error:', result);
                throw new Error(result.message || 'Failed to submit project');
            }

            console.log('Project submitted:', result);
            toast.success('Project submitted successfully!');

            // ✅ Clear form fields
            setProjectTitle('');
            setAbstract('');
            setProjectType('Software');
            setKeywords([]);
            setTechnologies([]);
            setFurtherImprovement('');
            setDepartment('');
            setCompletionDate('');
            setAuthors('');
            setProjectCategory('Thesis');

            // ✅ Clear input & suggestions
            setKeywordInput('');
            setTechnologyInput('');
            setKeywordSuggestions([]);
            setTechnologySuggestions([]);
            setShowKeywordSuggestions(false);
            setShowTechnologySuggestions(false);

            if (keywordInputRef.current) keywordInputRef.current.blur();
            if (technologyInputRef.current) technologyInputRef.current.blur();

        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error(error.message || 'Submission failed. Try again.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (keywordInputRef.current && !keywordInputRef.current.contains(event.target)) {
                setShowKeywordSuggestions(false);
            }
            if (technologyInputRef.current && !technologyInputRef.current.contains(event.target)) {
                setShowTechnologySuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg lg:shadow-md">
            <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">Create Capstone Project</h2>
            <div className="space-y-6">

                {/* Project Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        1. Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Abstract/Summary */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        2. Abstract/Summary (150-250 words) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="6"
                        placeholder="Provide a comprehensive summary of your project..."
                        required
                    />
                    <div className="text-sm text-gray-500 mt-1">
                        Word count: {abstract.split(' ').filter(word => word.length > 0).length}
                    </div>
                </div>

                {/* Team (Auto-selected) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        3. Team
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                        <span className="text-gray-600">{teamName}</span>
                    </div>
                </div>

                {/* Project Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        4. Project Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Software"
                                checked={projectType === 'Software'}
                                onChange={(e) => setProjectType(e.target.value)}
                                className="mr-2 text-blue-600 focus:ring-blue-500"
                            />
                            Software
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="AI"
                                checked={projectType === 'AI'}
                                onChange={(e) => setProjectType(e.target.value)}
                                className="mr-2 text-blue-600 focus:ring-blue-500"
                            />
                            AI
                        </label>
                    </div>
                </div>

                {/* Keywords */}
                <div className="relative" ref={keywordInputRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        5. Keywords <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                {keyword}
                                <button
                                    type="button"
                                    onClick={() => removeKeyword(keyword)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={handleKeywordInputChange}
                        onKeyPress={handleKeywordKeyPress}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type to search keywords..."
                    />
                    {showKeywordSuggestions && keywordSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {keywordSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addKeyword(suggestion)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Technology */}
                <div className="relative" ref={technologyInputRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        6. Technology <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {technologies.map((technology, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                                {technology}
                                <button
                                    type="button"
                                    onClick={() => removeTechnology(technology)}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={technologyInput}
                        onChange={handleTechnologyInputChange}
                        onKeyPress={handleTechnologyKeyPress}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type to search technologies..."
                    />
                    {showTechnologySuggestions && technologySuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {technologySuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addTechnology(suggestion)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Further Improvement */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        7. Further Improvement (Optional)
                    </label>
                    <textarea
                        value={furtherImprovement}
                        onChange={(e) => setFurtherImprovement(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="4"
                        placeholder="Describe potential improvements or future work..."
                    />
                </div>

                {/* Department/Faculty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        8. Department/Faculty (Optional)
                    </label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Computer Science, Engineering, etc."
                    />
                </div>

                {/* Completion Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        9. Completion Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Author(s)/Team members */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        10. Author(s)/Team Members (Optional)
                    </label>
                    <textarea
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="List all team members with their roles..."
                    />
                </div>

                {/* Primary advisor/supervisor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        11. Primary Advisor/Supervisor (Optional)
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                        <span className="text-gray-600">{supervisor}</span>
                    </div>
                </div>

                {/* Project Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        12. Project Category <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Thesis', 'Research Project', 'Course Project', 'Capstone Project'].map((category) => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="radio"
                                    value={category}
                                    checked={projectCategory === category}
                                    onChange={(e) => setProjectCategory(e.target.value)}
                                    className="mr-2 text-blue-600 focus:ring-blue-500"
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                    >
                        {loading ? 'Creating Project...' : 'Create Project'}
                    </button>
                </div>
            </div>
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







const ShowTask = ({ teamName,  }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskCount, setNewTaskCount] = useState(0);
    const [lastChecked, setLastChecked] = useState(new Date());
    // console.log(onTaskView.setNewTaskCount, 'fromshowtask')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(
                    `https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${teamName}`
                );
                const data = await res.json();
                const fetchedTasks = data.data || [];
                console.log(fetchedTasks);

                const mappedTasks = fetchedTasks
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((taskObj, index) => ({
                        id: index + 1,
                        taskId: taskObj._id,
                        task: taskObj.assignedTask,
                        status: taskObj.status === "Completed", // convert to boolean
                        remark: taskObj.remarks,
                        createdAt: taskObj.createdAt,
                        isNew: new Date(taskObj.createdAt) > lastChecked,
                    }));

                setTasks(mappedTasks);

                // Calculate new tasks count
                const count = mappedTasks.filter(task => new Date(task.createdAt) > lastChecked).length;
                setNewTaskCount(count);

            } catch (err) {
                console.error("Error fetching tasks:", err);
                toast.error("Failed to fetch tasks");
            }
        };

        if (teamName) fetchTasks();
    }, [teamName, lastChecked]);

    // useEffect(() => {
    //     if (onTaskView) {
    //         onTaskView();
    //     }
    // }, [onTaskView]);

    const toggleCompletion = async (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, status: !task.status };
            }
            return task;
        });

        setTasks(updatedTasks);

        const taskToUpdate = updatedTasks.find((task) => task.id === id);
        const backendStatus = taskToUpdate.status ? "Completed" : "Not Completed";

        try {
            const res = await fetch(
                `https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/team/task/${taskToUpdate.taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: backendStatus }),
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to update task status");
            }

            toast.success(`Task marked as ${backendStatus}`);
        } catch (error) {
            console.error("Status update failed:", error);
            toast.error("Failed to update task status on server");
        }
    };

    const resetNewTaskCount = () => {
        setLastChecked(new Date());
        setNewTaskCount(0);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl shadow-xl transition-all relative">
            {/* Notification badge */}
            {newTaskCount > 0 && (
                <div
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg animate-pulse cursor-pointer"
                    onClick={resetNewTaskCount}
                    title="Click to mark as read"
                >
                    {newTaskCount}
                </div>
            )}

            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text mb-8 tracking-tight text-center">
                Team Task Overview
            </h2>

            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Task #</th>
                            <th className="px-6 py-4 min-w-[220px] sm:min-w-[160px]">Task</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 min-w-[140px] sm:min-w-[200px]">Remark</th>
                            <th className="px-6 py-4 min-w-[120px] sm:min-w-[180px]">Assigned Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map(({ id, task, status, remark, createdAt, isNew }) => (
                            <tr key={id} className={`hover:bg-gray-50 transition-colors duration-200 ${isNew ? 'bg-blue-50' : ''}`}>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {id}
                                    {isNew && <span className="ml-1 text-xs text-red-500">• New</span>}
                                </td>
                                <td className={`px-6 py-4 ${!status ? "text-gray-400 line-through italic" : "text-gray-800"} min-w-[220px] sm:min-w-[160px]`}>
                                    {task}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={status}
                                            onChange={() => toggleCompletion(id)}
                                            className="form-checkbox h-5 w-5 text-green-600 rounded transition duration-200"
                                        />
                                        <span className={`ml-2 font-semibold ${!status ? "text-red-600" : "text-green-500"}`}>
                                            {status ? "✔ Done" : "❌ Pending"}
                                        </span>
                                    </label>
                                </td>
                                <td className="px-6 py-4 text-gray-600 min-w-[140px] sm:min-w-[200px]">
                                    {remark}
                                </td>
                                <td className="px-6 py-4 text-gray-600 min-w-[160px] sm:min-w-[220px]">
                                    📅 {new Date(createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};






const ShowNotice = ({ teamName }) => {
    const [notices, setNotices] = useState([]);
    // console.log(teamName, 'from show notice');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`https://capstone-repo-2933d2307df0.herokuapp.com/api/teacher/notice/${teamName}`);
                const fetchedNotices = response.data.data || [];
                console.log(fetchTasks)
                console.log(response.data, 'from show notice');
                setNotices(fetchedNotices);
            } catch (error) {
                toast.error("Failed to fetch Notices");
                toast.error("Error fetching Notice:", error);
            }
        };

        if (teamName) fetchTasks();
    }, [teamName]);

    return (
        <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text mb-8 text-center tracking-tight">
                Team Notices
            </h2>

            <div className="space-y-6 max-h-[500px] overflow-y-auto">
                {notices.map((notice) => (
                    <div
                        key={notice._id}
                        className="p-6 bg-white rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition duration-300"
                    >
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
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {notice.noticeDetails}
                        </p>
                    </div>
                ))}
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