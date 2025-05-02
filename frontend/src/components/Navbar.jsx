import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Whenever page loads or path changes, check login status
    const adminStatus = localStorage.getItem("isAdminLoggedIn");
    const userStatus = localStorage.getItem("isUserLoggedIn"); // If you have user login later
    if (adminStatus === "true" || userStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Update when route changes

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isUserLoggedIn"); // If you add user login later
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-blue-500" />
          <span className="text-blue-500 font-bold">ParkSense</span>
        </Link>
        {!isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="bg-black border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-gray-800 transition-all">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
