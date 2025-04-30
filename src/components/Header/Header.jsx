import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Detect user type based on current URL
  const isStudent = location.pathname.includes("student");
  const isTeacher = location.pathname.includes("teacher");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button onClick={() => setIsOpen(true)} className="lg:hidden text-white focus:outline-none">
            <Menu size={28} />
          </button>
          <div className="text-xl font-bold whitespace-nowrap">
            {isStudent && <Link to="/studentHome">Student Portal</Link>}
            {isTeacher && <Link to="/teacherHome">Teacher Portal</Link>}
          </div>
        </div>

        {/* Center: Navigation Menu */}
        <nav className="hidden lg:flex flex-grow justify-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {isStudent && <Link to="/studentDashboard" className="hover:text-gray-300">Student Dashboard</Link>}
          {isTeacher && <Link to="/teacherDashboard" className="hover:text-gray-300">Teacher Dashboard</Link>}
          <Link to="/about" className="hover:text-gray-300">About Us</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/help" className="hover:text-gray-300">Help</Link>
        </nav>

        {/* Right: Logout Button */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <nav
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col space-y-2">
          <li><Link to="/" className="block py-2 hover:text-gray-300">Home</Link></li>
          {isStudent && (
            <li><Link to="/studentDashboard" className="block py-2 hover:text-gray-300">Student Dashboard</Link></li>
          )}
          {isTeacher && (
            <li><Link to="/teacherDashboard" className="block py-2 hover:text-gray-300">Teacher Dashboard</Link></li>
          )}
          <li><Link to="/contact" className="block py-2 hover:text-gray-300">Contact</Link></li>
          <li><Link to="/help" className="block py-2 hover:text-gray-300">Help</Link></li>
          <li><Link to="/about" className="block py-2 hover:text-gray-300">About Us</Link></li>
        </ul>
      </nav>
    </header>

  );
};

export default Header;
