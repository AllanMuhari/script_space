import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">ScriptSpace</div>
      <ul className="flex space-x-4">
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
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-bold">Welcome, {user.name}!</span>
            <Link to="/profile" className="hover:text-gray-400">
              <img
                src={user.imageUrl || "https://via.placeholder.com/30"}
                alt="User Avatar"
                className="inline-block rounded-full w-8 h-8 border-2 border-white"
              />
            </Link>
            <Link
              to="/createblog"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              Write
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
