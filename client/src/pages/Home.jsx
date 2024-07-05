import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";
import HighlightedBlogs from "../components/HighlightedBlogs";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [highlightedBlogs, setHighlightedBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const { data } = await axios.get("/api/blogs");
      setBlogs(data);
    }
    async function fetchHighlightedBlogs() {
      const { data } = await axios.get(
        "http://localhost:3000/api/blogs/highlighted"
      );
      setHighlightedBlogs(data);
    }
    fetchBlogs();
    fetchHighlightedBlogs();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <HighlightedBlogs blogs={highlightedBlogs} />
      <BlogList blogs={blogs} />
    </div>
  );
}

export default Home;
