import  { useState } from "react";
import { FaUsers, FaTasks, FaClipboardList, FaRegStickyNote } from "react-icons/fa";

const TeamDetails = () => <div>Team Details Content</div>;
const AssignTask = () => <div>Assign Task Content</div>;
const ShowTask = () => <div>Show Task Content</div>;
const AddNotice = () => <div>Add Notice Content</div>;

const TeacherDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("team");

  const renderContent = () => {
    switch (selectedMenu) {
      case "team":
        return <TeamDetails />;
      case "assign":
        return <AssignTask />;
      case "show":
        return <ShowTask />;
      case "notice":
        return <AddNotice />;
      default:
        return <TeamDetails />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4">Teacher Dashboard</h2>
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

      {/* Content Area */}
      <div className="flex-1 p-5 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default TeacherDashboard;
