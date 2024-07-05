import React, { useEffect, useState } from "react";
import axios from "axios";

const HighlightedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchHighlightedBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/highlighted"
        );
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching highlighted blogs:", error);
      }
    };

    fetchHighlightedBlogs();
  }, []);

  if (!Array.isArray(blogs)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="highlighted-blogs">
      <h2 className="text-2xl font-semibold mb-4">Highlighted Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.blogId}>
            <h3 className="text-xl">{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedBlogs;
