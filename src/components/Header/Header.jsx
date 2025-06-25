import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";
import { FaSpinner } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutState, setLogoutState] = useState({
    loading: false,
    error: null,
  });

  const isStudent = location.pathname.includes("student");
  const isTeacher = location.pathname.includes("teacher");

  const homePath = isStudent
    ? "/studentHome"
    : isTeacher
    ? "/teacherHome"
    : "/";

  const handleLogout = async () => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 500;

    setLogoutState({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No active session found");
      }

      const response = await fetch(
        "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      localStorage.removeItem("token");

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsed)
        );
      }

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLogoutState((prev) => ({ ...prev, error: error.message }));
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLogoutState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <header className="bg-[#0B1F3A] text-white shadow-lg z-50 relative">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white hover:text-blue-300 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
          <div className="text-2xl font-extrabold tracking-wide text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
            {isStudent && <Link to="/studentHome">Student Portal</Link>}
            {isTeacher && <Link to="/teacherHome">Teacher Portal</Link>}
            {!isStudent && !isTeacher && <Link to="/">App Portal</Link>}
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex flex-grow justify-center space-x-8 text-base font-medium">
          <Link to={homePath} className="hover:text-blue-300 transition-colors">
            Home
          </Link>
          {isStudent && (
            <Link
              to="/studentDashboard"
              className="hover:text-blue-300 transition-colors"
            >
              Student Dashboard
            </Link>
          )}
          {isTeacher && (
            <Link
              to="/teacherDashboard"
              className="hover:text-blue-300 transition-colors"
            >
              Teacher Dashboard
            </Link>
          )}
          <Link to="/about" className="hover:text-blue-300 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-blue-300 transition-colors">
            Contact
          </Link>
          <Link to="/help" className="hover:text-blue-300 transition-colors">
            Help
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className={`bg-gradient-to-r from-red-600 to-red-700 px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ease-in-out
              ${
                logoutState.loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:from-red-700 hover:to-red-800"
              }`}
            onClick={handleLogout}
            disabled={logoutState.loading}
            aria-busy={logoutState.loading}
          >
            {logoutState.loading ? (
              <div className="flex items-center space-x-2">
                <FaSpinner className="animate-spin" />
                <span>Logging out...</span>
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-[#132F4C] text-white p-5 transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-blue-300 focus:outline-none"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-4 text-base">
          <li>
            <Link to={homePath} className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          {isStudent && (
            <li>
              <Link
                to="/studentDashboard"
                className="block hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Student Dashboard
              </Link>
            </li>
          )}
          {isTeacher && (
            <li>
              <Link
                to="/teacherDashboard"
                className="block hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Teacher Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/help" className="block hover:text-blue-300" onClick={() => setIsOpen(false)}>
              Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
