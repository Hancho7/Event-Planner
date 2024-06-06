import React, { useState, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext.jsx";

const AdminProfile = () => {
  const { admin, setAdmin } = useContext(AdminContext); // Use AdminContext
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the changes (e.g., send to backend)
    setEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <img
            className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 w-24 rounded-full object-cover"
            src={admin.profilePic}
            alt="Admin Profile"
          />
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <p className="text-xl leading-tight">{admin.username}</p>
            <p className="text-sm leading-tight text-gray-600">{admin.email}</p>
            <p className="text-sm leading-tight text-gray-600">{admin.phone}</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-400"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
          {editing && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Update Your Profile Picture Here
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={admin.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                onClick={handleSave}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-400"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
