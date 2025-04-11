import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

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
    <header className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4 shadow-md py-6.5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Student Portal</div>

        <nav>
          <ul className="flex space-x-9">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/studentDashboard" className="hover:text-gray-300">Student Dashboard</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            <li><a href="/help" className="hover:text-gray-300">Help</a></li>
          </ul>
        </nav>

        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
