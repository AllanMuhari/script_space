import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert("You must be logged in to create a blog!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs/create",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Blog created successfully:", response.data);
      setLoading(false);

      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Write Your Blog</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="blogTitle"
              className="block mb-2 text-sm font-medium text-gray-400">
              Blog Title
            </label>
            <input
              type="text"
              id="blogTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-700 text-white block w-full p-2.5 rounded border border-gray-600"
              placeholder="Enter your blog title here"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="blogContent"
              className="block mb-2 text-sm font-medium text-gray-400">
              Blog Content
            </label>
            <textarea
              id="blogContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-700 text-white block w-full h-96 p-2.5 rounded border border-gray-600"
              placeholder="Write your blog content here"
              required></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Save Draft
            </button>
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}>
              {loading ? "Submitting..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
