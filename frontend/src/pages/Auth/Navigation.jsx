import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#0f0f0f] bg-opacity-90 border border-gray-700 shadow-lg rounded-xl px-6 py-3 w-[90%] max-w-xl">
      <section className="flex justify-between items-center">
        {/* Section 1: Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="flex items-center text-white hover:text-teal-400 transition"
          >
            <AiOutlineHome size={24} className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center text-white hover:text-teal-400 transition"
          >
            <MdOutlineLocalMovies size={24} className="mr-1" />
            <span className="hidden sm:inline">Movies</span>
          </Link>
        </div>

        {/* Section 2: User Actions */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center gap-1 hover:text-teal-400"
            >
              {userInfo.username}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    dropdownOpen
                      ? "M5 15l7-7 7 7"
                      : "M19 9l-7 7-7-7"
                  }
                />
              </svg>
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex items-center text-white hover:text-teal-400 transition"
              >
                <AiOutlineLogin size={24} className="mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center text-white hover:text-teal-400 transition"
              >
                <AiOutlineUserAdd size={24} className="mr-1" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </div>
          )}

          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-700 rounded shadow-lg w-40 z-50">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;