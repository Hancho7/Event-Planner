import  { useState, useContext } from "react";
import classnames from "classnames";
import { AdminContext } from "../Context/AdminContext.jsx";

const UserProfile = () => {
  const { admin, setAdmin } = useContext(AdminContext);
  const [editing, setEditing] = useState(false);
  const [phoneError, setPhoneError] = useState("");

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

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    const validPrefixes = ["024", "054", "055", "059", "020", "050"];
    const isValidNumber = validPrefixes.some((prefix) =>
      phoneNumber.startsWith(prefix)
    );

    if (!isValidNumber) {
      setPhoneError(
        "Please enter a valid MTN (024, 054, 055, 059) or Telecel (020, 050) number"
      );
    } else {
      setPhoneError("");
    }

    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      phone: phoneNumber,
    }));
  };

  const handleSave = () => {
    if (!phoneError) {
      setEditing(false);
      // Save the changes (e.g., send to backend)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                onChange={handlePhoneChange}
                className={classnames(
                  "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                  { "border-red-500": phoneError }
                )}
                placeholder="Enter phone number"
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
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

export default UserProfile;
