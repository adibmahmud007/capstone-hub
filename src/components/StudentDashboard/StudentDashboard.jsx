import { useState } from 'react';

const StudentDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('createProject');

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
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Student Dashboard Menu</h2>
                <ul>
                    <li
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeMenu === 'createProject' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveMenu('createProject')}
                    >
                        Create Project
                    </li>
                    <li
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeMenu === 'joinProject' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveMenu('joinProject')}
                    >
                        Join Project
                    </li>
                    <li
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeMenu === 'showTask' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveMenu('showTask')}
                    >
                        Show Task
                    </li>
                    <li
                        className={`cursor-pointer p-2 hover:bg-gray-700 ${activeMenu === 'approveJoinRequest' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveMenu('approveJoinRequest')}
                    >
                        Approve Join Request
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 bg-gray-100">
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
        // Handle form submission logic here
        console.log({
            projectTitle,
            description,
            teamMembers,
            zipFile,
        });
    };
    return <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create Project</h2>
        <form onSubmit={handleSubmit}>
            {/* Project Title */}
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

            {/* Short Description */}
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

            {/* Team Members */}
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

            {/* Project Zip File Upload */}
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

            {/* Create Project Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Create Project
            </button>
        </form>
    </div>;
};

const JoinProject = () => {
    return <div>Join Project Content</div>;
};

const ShowTask = () => {
    return <div>Show Task Content</div>;
};

const ApproveJoinRequest = () => {
    return <div>Approve Join Request Content</div>;
};

export default StudentDashboard;