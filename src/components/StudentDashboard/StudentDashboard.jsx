import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const StudentDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('createProject');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activeMenu) {
            case 'createProject':
                return <CreateProject />;
            case 'joinProject':
                return <JoinProject />;
            case 'showTask':
                return <ShowTask />;
            case 'approveJoinRequest':
                return <ApproveJoinRequest />;
            default:
                return <CreateProject />;
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
                        { key: 'createProject', label: 'Create Project' },
                        { key: 'joinProject', label: 'Join Project' },
                        { key: 'showTask', label: 'Show Task' },
                        { key: 'approveJoinRequest', label: 'Approve Join Request' }
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

            {/* Hamburger Button (Only visible when sidebar is closed) */}
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 lg:hidden z-20 text-gray-200 bg-gray-700 p-2 rounded-md shadow-md">
                    <Menu size={24} />
                </button>
            )}

            {/* Main Content (Adjusted to remove white background issue) */}
            <div className="flex-1 p-4 pt-10 lg:pl-28 lg:pt-16">
                {renderContent()}
            </div>
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

const JoinProject = () => {
    return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">Join Project Content</div>;
};

const ShowTask = () => {
    return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">Show Task Content</div>;
};

const ApproveJoinRequest = () => {
    return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">Approve Join Request Content</div>;
};

export default StudentDashboard;
