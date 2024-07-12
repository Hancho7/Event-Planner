import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill out both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate API call to update password
    setTimeout(() => {
      setMessage("Password updated successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl text-center font-semibold mb-4">Update Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#45556b] focus:border-[#45556b] sm:text-sm"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#45556b] focus:border-[#45556b] sm:text-sm"
              placeholder="Confirm your new password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-[#45556b]"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
