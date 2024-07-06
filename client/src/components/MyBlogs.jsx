import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const MyBlogs = () => {
  const { user } = useContext(UserContext);
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("User context:", user);

    const fetchMyBlogs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/myblogs",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("Fetched blogs:", response.data);
        setMyBlogs(response.data || []);
      } catch (error) {
        console.error("Error fetching my blogs:", error);
        setError("Failed to fetch your blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
          <h2 className="text-2xl font-semibold">Loading...</h2>
          <p className="text-gray-400">
            Please wait while we fetch your blogs.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p className="text-gray-400">
            You need to be logged in to view your blogs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-blogs max-w-6xl mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-8">My Blogs</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <li
              key={blog.blogId}
              className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
              <Link to={`/blogs/${blog.blogId}`}>
                <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-400 mb-4">
                  {blog.content.slice(0, 100)}...
                </p>
              </Link>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">
                  By: {blog.author.name}
                </span>
                <div className="flex space-x-4">
                  <Link
                    to={`/edit-blog/${blog.blogId}`}
                    className="text-blue-400 font-semibold hover:underline">
                    Edit
                  </Link>
                  <Link
                    to={`/blogs/${blog.blogId}`}
                    className="text-blue-400 font-semibold hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No blogs found. Start writing one!</p>
        )}
      </ul>
    </div>
  );
};

export default MyBlogs;
