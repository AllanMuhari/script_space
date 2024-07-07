// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HighlightedBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchHighlightedBlogs = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/blogs/highlighted"
//         );
//         if (Array.isArray(response.data)) {
//           setBlogs(response.data);
//         } else {
//           console.error("Expected an array, but got:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching highlighted blogs:", error);
//       }
//     };

//     fetchHighlightedBlogs();
//   }, []);

//   if (!Array.isArray(blogs)) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="highlighted-blogs">
//       <h2 className="text-2xl font-semibold mb-4">Highlighted Blogs</h2>
//       <ul>
//         {blogs.map((blog) => (
//           <li key={blog.blogId}>
//             <h3 className="text-xl">{blog.title}</h3>
//             <p>{blog.content.slice(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HighlightedBlogs;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HighlightedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    const mockBlogs = [
      {
        blogId: 1,
        title: "Exploring the Wonders of JavaScript",
        content:
          "JavaScript is a versatile language that allows you to build interactive web applications...",
      },
      {
        blogId: 2,
        title: "Mastering React for Modern Web Development",
        content:
          "React is a powerful library for building user interfaces with a component-based architecture...",
      },
      {
        blogId: 3,
        title: "Understanding Node.js and Its Ecosystem",
        content:
          "Node.js is a runtime environment that allows you to run JavaScript on the server side...",
      },
      {
        blogId: 4,
        title: "CSS Tricks and Tips for Responsive Design",
        content:
          "Responsive design is crucial for building websites that work well on various devices...",
      },
      {
        blogId: 5,
        title: "Getting Started with Next.js for Server-Side Rendering",
        content:
          "Next.js is a popular framework for building server-side rendered applications with React...",
      },
      {
        blogId: 6,
        title: "Exploring the Power of TypeScript",
        content:
          "TypeScript is a superset of JavaScript that adds static typing to the language, enhancing development...",
      },
    ];

    setBlogs(mockBlogs);
  }, []);

  return (
    <div className="highlighted-blogs p-4">
      <h2 className="text-2xl font-semibold mb-4">Highlighted Blogs</h2>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li
            key={blog.blogId}
            className="text-gray-400 bg-slate-800 p-4 rounded shadow-md">
            <Link to={`/blogs/${blog.blogId}`}>
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighlightedBlogs;
