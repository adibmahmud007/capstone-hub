import Header from "../Header/Header";

const Help = () => {
    return (
        <div className="h-screen w-full">
            <Header></Header>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Help & FAQ</h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 How can I search for a project?</h2>
                        <p className="text-gray-700">
                            Use the search bar on the homepage to find projects by title, team name, or keywords. Results will update in real-time.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">📁 How do I view project details?</h2>
                        <p className="text-gray-700">
                            Click on any project card to open a detailed modal view containing abstract, technologies, supervisor info, and more.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">👨‍🏫 Who can upload or manage projects?</h2>
                        <p className="text-gray-700">
                            Currently, only authorized faculty members or admins can add or manage project data. For access, please contact your department head.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">💡 I found a mistake in a project detail. What should I do?</h2>
                        <p className="text-gray-700">
                            You can report any issues by contacting us at <span className="text-blue-700 underline">support@opensapace.edu</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
