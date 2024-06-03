// src/dashboard/pages/Overview.jsx
import React from "react";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

const Overview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-600 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Total Events
          </h2>
          <p className="text-2xl text-black font-bold">34</p>
        </div>
        <div className="bg-[#f97316] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Total Attendees
          </h2>
          <p className="text-2xl text-black font-bold">1,230</p>
        </div>
        <div className="bg-[#22c55e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Pending Payments
          </h2>
          <p className="text-2xl text-black font-bold">$5,420</p>
        </div>
        <div className="bg-[#fcd34d] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Students Registered
          </h2>
          <p className="text-2xl text-black font-bold">543</p>
        </div>
        <div className="bg-[#f43f5e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">Reviews</h2>
          <p className="text-2xl text-black font-bold">87</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <LineChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
