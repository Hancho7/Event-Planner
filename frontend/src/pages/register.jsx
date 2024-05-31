//import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { setField, toggleShowPassword, setError, } from "../features/registerSlice.jsx"

function Register() {
  const dispatch = useDispatch();
  const {
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    showPassword,
    errors,
  } = useSelector((state) => state.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    let error = "";
    if (password.length < 8) {
      error = "Password must be at least 8 characters";
    } else if (!/\d/.test(password)) {
      error = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(password)) {
      error = "Password must contain at least one special character";
    }
    dispatch(setError({ field: "password", error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword){
      dispatch(setError({field: 'confirmPassword',error:'Passwords do not match'}));
      return;
    }

    dispatch(setError({field: 'confirmPassword', error: ''}));
    // Add your form submission logic here
    console.log("Form submitted:", {
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
              required
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 relative">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="button"
              onClick={() => dispatch(toggleShowPassword())}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaPhone className="text-gray-500 mr-3" />
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handleChange}
              required
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            I have an account,{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
