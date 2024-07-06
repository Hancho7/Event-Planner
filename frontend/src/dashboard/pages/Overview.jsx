// import React from "react";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

const Overview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-black font-bold mb-4">Overview</h1>
      <div className="flex flex-row justify-between gap-6 mb-6">
        <div className="bg-blue-600 p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Total Events
          </h2>
          <p className="text-2xl text-black font-bold">16</p>
        </div>
        <div className="bg-[#f97316] p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Total Attendees
          </h2>
          <p className="text-2xl text-black font-bold">1,230</p>
        </div>
        <div className="bg-[#22c55e] p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Pending Payments
          </h2>
          <p className="text-2xl text-black font-bold">$5,420</p>
        </div>
       
        
        <div className="bg-[#4c51bf] p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl text-black font-semibold mb-2">
            Total Revenue
          </h2>
          <p className="text-2xl text-black font-bold">$12,345</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow-md">
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
