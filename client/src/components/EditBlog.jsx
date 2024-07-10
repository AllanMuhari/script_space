import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/UserContext";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/${id}`
        );
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch the blog. Please try again later.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/myblogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update the blog. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p className="text-gray-400">
            You need to be logged in to edit this blog.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="container mx-auto my-10 p-6 bg-gray-800 rounded-lg shadow-lg max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Edit Your Blog</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
              className="bg-gray-700 text-white block w-full p-2.5 rounded border border-gray-600 focus:ring focus:ring-blue-500"
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
            <div className="rounded">
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-96"
                placeholder="Write your blog content here"
                theme="snow"
                modules={{
                  toolbar: [
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                      { align: [] },
                    ],
                    [
                      {
                        color: [
                          "#000000",
                          "#e60000",
                          "#ff9900",
                          "#ffff00",
                          "#008a00",
                          "#0066cc",
                          "#9933ff",
                          "#ffffff",
                          "#facccc",
                          "#ffebcc",
                          "#ffffcc",
                          "#cce8cc",
                          "#cce0f5",
                          "#ebd6ff",
                          "#bbbbbb",
                          "#f06666",
                          "#ffc266",
                          "#ffff66",
                          "#66b966",
                          "#66a3e0",
                          "#c285ff",
                          "#888888",
                          "#a10000",
                          "#b26b00",
                          "#b2b200",
                          "#006100",
                          "#0047b2",
                          "#6b24b2",
                          "#444444",
                          "#5c0000",
                          "#663d00",
                          "#666600",
                          "#003700",
                          "#002966",
                          "#3d1466",
                          "custom-color",
                        ],
                      },
                    ],
                  ],
                }}
              />
            </div>
          </div>
          <div className="flex justify-end mt-14 space-x-4">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}>
              {loading ? "Submitting..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
