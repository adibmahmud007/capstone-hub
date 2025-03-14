// import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4 shadow-md py-6.5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-xl font-bold">Student Portal</div>
        
        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-9">
            <li>
              <a href="/" className="hover:text-gray-300">Home</a>
            </li>
            <li>
              <a href="/studentDashboard" className="hover:text-gray-300">Student Dashboard</a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </li>
            <li>
              <a href="/help" className="hover:text-gray-300">Help</a>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>
    </header>
  );
};

export default Header;
