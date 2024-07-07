import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./components/BlogList";
import HighlightedBlogs from "./components/HighlightedBlogs";
import CreateBlog from "./components/CreateBlog";
import UploadImage from "./components/UploadImage";
import Navbar from "./components/Navbar";
import BlogDetail from "./components/BlogDetail";
import MyBlogs from "./components/MyBlogs";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import EditBlog from "./components/EditBlog.jsx";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
const App = () => {
  const { login } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/" element={<HighlightedBlogs />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
