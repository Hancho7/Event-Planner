// src/context/AdminContext.js
import React, { createContext, useState } from "react";
import logo from "../assets/logo.png";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    username: "admin_user",
    email: "admin@example.com",
    phone: "024-123-4567",
    profilePic: logo,
  });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
