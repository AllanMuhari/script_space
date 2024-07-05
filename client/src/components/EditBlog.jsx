import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { blogId } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log(`Fetching blog with ID: ${blogId}`);
        const response = await axios.get(
          `http://localhost:3000/api/blogs/${blogId}`
        );
        console.log("Response data:", response.data);
        setBlog(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/blogs/${blogId}`, {
        title,
        content,
      });
      setUpdateMessage("Blog updated successfully!");
      setTimeout(() => {
        navigate(`/blogs/${blogId}`); 
      }, 1000);
    } catch (error) {
      console.error("Failed to update blog:", error);
      setError("Failed to update the blog. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 mb-4"></div>
          <h2 className="text-2xl font-semibold">Loading...</h2>
          <p className="text-gray-400">Please wait while we load your blog.</p>
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Edit Blog</h2>
      {updateMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {updateMessage}
        </div>
      )}
      {blog ? (
        <div>
          <input
            className="block w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="block w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Update Blog
          </button>
        </div>
      ) : (
        <p>Blog not found.</p>
      )}
    </div>
  );
};

export default EditBlog;
