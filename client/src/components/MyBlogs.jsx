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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>You need to be logged in to view your blogs.</div>;
  }

  return (
    <div className="my-blogs">
      <h2 className="text-2xl font-semibold mb-4">My Blogs</h2>
      <ul>
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <li
              key={blog.id}
              className="mb-4 p-4 border rounded bg-gray-100 text-black">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-blue-500 hover:underline">
                Read more
              </Link>
            </li>
          ))
        ) : (
          <p>No blogs found. Start writing one!</p>
        )}
      </ul>
    </div>
  );
};

export default MyBlogs;
