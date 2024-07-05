import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token) => {
    setUser({ token });
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const updateProfilePicture = (imageUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      imageUrl,
    }));
    localStorage.setItem("user", JSON.stringify({ ...user, imageUrl }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};
