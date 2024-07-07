import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-around items-center">
      <div className="text-2xl font-bold">ScriptSpace</div>

      <ul className="hidden md:flex md:space-x-4 lg:space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-400">
            My Feed
          </Link>
        </li>
        <li>
          <Link to="/discussions" className="hover:text-gray-400">
            Discussions
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-gray-400">
            Blogs
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/myblogs" className="hover:text-gray-400">
              My Blogs
            </Link>
          </li>
        )}
      </ul>
      <div className="flex items-center space-x-2 lg:space-x-4">
        {user ? (
          <>
            <span className="hidden md:inline font-bold">
              Welcome, {user.name}!
            </span>
            <Link to="/profile" className="hover:text-gray-400">
              <img
                src={user.imageUrl || "https://via.placeholder.com/30"}
                alt="User Avatar"
                className="inline-block rounded-full w-8 h-8 border-2 border-white"
              />
            </Link>
            <Link
              to="/createblog"
              className="hidden md:inline bg-blue-500 px-3 py-1 lg:px-4 lg:py-2 rounded hover:bg-blue-600">
              Write
            </Link>
            <button
              onClick={logout}
              className="hidden md:inline bg-red-500 px-3 py-1 lg:px-4 lg:py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hidden md:inline bg-blue-500 px-3 py-1 lg:px-4 lg:py-2 rounded ">
              Login
            </Link>
            <Link
              to="/register"
              className="hidden md:inline bg-green-500 px-3 py-1 lg:px-4 lg:py-2 rounded ">
              Sign Up
            </Link>
          </>
        )}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col space-y-2 mt-4  qqtext-center">
          <li>
            <Link
              to="/"
              className="hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}>
              My Feed
            </Link>
          </li>
          <li>
            <Link
              to="/discussions"
              className="hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}>
              Discussions
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)}>
              Blogs
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/myblogs"
                className="hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}>
                My Blogs
              </Link>
            </li>
          )}
          {user ? (
            <>
              <li className="flex justify-center flex-col  items-center space-x-2 mt-2">
                <Link
                  to="/createblog"
                  className="bg-blue-500 px-4 py-2 my-2 rounded "
                  onClick={() => setIsMenuOpen(false)}>
                  Write
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex justify-center flex-col items-center space-x-2 mt-2">
                <Link
                  to="/login"
                  className="bg-blue-500 px-4 py-2 rounded  my-2"
                  onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 px-4 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
