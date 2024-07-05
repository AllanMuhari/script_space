import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import UploadImage from "./UploadImage";

const Profile = () => {
  const { user, updateProfilePicture } = useContext(UserContext);

  const handleImageUpload = (imageUrl) => {
    updateProfilePicture(imageUrl);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.imageUrl || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="rounded-full w-20 h-20 border-2 border-white"
        />
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <UploadImage onImageUpload={handleImageUpload} />
    </div>
  );
};

export default Profile;
