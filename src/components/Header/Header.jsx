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
    error: null
  });

  // Detect user type based on current URL
  const isStudent = location.pathname.includes("student");
  const isTeacher = location.pathname.includes("teacher");

  const handleLogout = async () => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 500; // Minimum loading time in ms (0.5s)
    
    setLogoutState({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No active session found");
      }

      const response = await fetch("https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      localStorage.removeItem("token");
      
      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - elapsed));
      }

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setLogoutState(prev => ({ ...prev, error: error.message }));
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLogoutState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button 
            onClick={() => setIsOpen(true)} 
            className="lg:hidden text-white focus:outline-none"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
          <div className="text-xl font-bold whitespace-nowrap">
            {isStudent && <Link to="/studentHome">Student Portal</Link>}
            {isTeacher && <Link to="/teacherHome">Teacher Portal</Link>}
            {!isStudent && !isTeacher && <Link to="/">App Portal</Link>}
          </div>
        </div>

        {/* Center: Navigation Menu */}
        <nav className="hidden lg:flex flex-grow justify-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          {isStudent && (
            <Link to="/studentDashboard" className="hover:text-gray-300 transition-colors">
              Student Dashboard
            </Link>
          )}
          {isTeacher && (
            <Link to="/teacherDashboard" className="hover:text-gray-300 transition-colors">
              Teacher Dashboard
            </Link>
          )}
          <Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          <Link to="/help" className="hover:text-gray-300 transition-colors">Help</Link>
        </nav>

        {/* Right: Logout Button */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button
            className={`bg-red-600 px-4 py-2 rounded flex items-center justify-center gap-2 min-w-[120px]
              ${logoutState.loading ? "opacity-75 cursor-not-allowed" : "hover:bg-red-700"}
              transition-colors duration-200`}
            onClick={handleLogout}
            disabled={logoutState.loading}
            aria-busy={logoutState.loading}
            aria-label={logoutState.loading ? "Logging out..." : "Logout"}
          >
            {logoutState.loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Nav */}
      <nav
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white focus:outline-none"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link 
              to="/" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          {isStudent && (
            <li>
              <Link 
                to="/studentDashboard" 
                className="block py-2 hover:text-gray-300 transition-colors"
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
                className="block py-2 hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Teacher Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link 
              to="/about" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/help" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Help
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Overlay for mobile menu */}
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