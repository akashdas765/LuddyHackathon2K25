import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-yellow-400">FinAgent</div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-yellow-400 font-semibold">Home</Link>
            <Link to="/how-it-works" className="text-gray-400 hover:text-yellow-400">How it Works</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black px-4 pt-4 pb-6 border-t border-gray-800 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="block text-yellow-400 font-semibold">Home</Link>
            <Link to="/how-it-works" className="block text-gray-400 hover:text-yellow-400">How it Works</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full">
                  Login
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
