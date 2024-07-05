import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs");
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <li
            key={blog.blogId}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200">
            <Link to={`/blogs/${blog.blogId}`}>
              <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-400">{blog.content.slice(0, 100)}...</p>
            </Link>
            <div className="mt-4 text-gray-400 text-sm flex justify-between items-center">
              <span>By: {blog.author?.name || "Unknown"}</span>
              <Link
                to={`/profile/${blog.author?.id}`}
                className="text-blue-400 hover:text-blue-300">
                View Profile
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
