import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ onImageUpload }) => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onImageUpload(response.data.imageUrl);
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Upload Image</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadImage;
