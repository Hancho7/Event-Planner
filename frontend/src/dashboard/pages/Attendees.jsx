// import React from "react";

const AttendeeOverview = ({ total, newRegistrations, attendanceRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-blue-600 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-xl text-black font-semibold mb-2">
          Total Attendees
        </h2>
        <p className="text-2xl text-black font-bold">{total}</p>
      </div>
      <div className="bg-[#f97316] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-xl text-black font-semibold mb-2">
          New Registrations
        </h2>
        <p className="text-2xl text-black font-bold">{newRegistrations}</p>
      </div>
      <div className="bg-[#22c55e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="text-xl text-black font-semibold mb-2">
          Attendance Rate
        </h2>
        <p className="text-2xl text-black font-bold">{attendanceRate}%</p>
      </div>
    </div>
  );
};

const PaymentStatus = ({ paid, unpaid }) => {
  return (
    <div className="bg-[#f97316] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">Payment Status</h2>
      <p className="text-2xl text-black font-bold">Paid: {paid}%</p>
      <p className="text-2xl text-black font-bold">Unpaid: {unpaid}%</p>
    </div>
  );
};

const GeographicDistribution = () => {
  return (
    <div className="bg-[#4c51bf] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Geographic Distribution
      </h2>
      <div className="h-32 bg-gray-200"></div> {/* Placeholder for a map */}
    </div>
  );
};

const GenderDistribution = () => {
  return (
    <div className="bg-[#22c55e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Gender Distribution
      </h2>
      <div className="h-32 bg-gray-200"></div>{" "}
      {/* Placeholder for a pie chart */}
    </div>
  );
};

const PopularSessions = () => {
  return (
    <div className="bg-[#fcd34d] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Popular Sessions
      </h2>
      <div className="h-32 bg-gray-200"></div>{" "}
      {/* Placeholder for a bar chart */}
    </div>
  );
};

const RealTimeCheckIns = () => {
  return (
    <div className="bg-[#f43f5e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Real-Time Check-Ins
      </h2>
      <div className="h-32 bg-gray-200"></div> {/* Placeholder for live feed */}
    </div>
  );
};

const EngagementMetrics = () => {
  return (
    <div className="bg-[#4c51bf] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Engagement Metrics
      </h2>
      <div className="h-32 bg-gray-200"></div> {/* Placeholder for graphs */}
    </div>
  );
};

const SurveyResponses = () => {
  return (
    <div className="bg-[#22c55e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Survey Responses
      </h2>
      <div className="h-32 bg-gray-200"></div> {/* Placeholder for graphs */}
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="bg-[#f43f5e] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">Notifications</h2>
      <ul className="list-disc pl-5">
        <li>Registration Deadline: June 10</li>
        <li>Pending Payments: 5</li>
        <li>Session Starting in 10 mins</li>
      </ul>
    </div>
  );
};

const DownloadReports = () => {
  return (
    <div className="bg-[#f97316] p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl text-black font-semibold mb-2">
        Download Reports
      </h2>
      <button className="bg-blue-600 mb-2 text-white px-4 py-2 rounded ml-2">
        Download CSV
      </button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
        Download PDF
      </button>
    </div>
  );
};

const Dashboard = () => {
  const attendeeData = {
    total: 1230,
    newRegistrations: 56,
    attendanceRate: 85,
    paid: 90,
    unpaid: 10,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-black font-bold mb-4">Attendee Dashboard</h1>
      <AttendeeOverview
        total={attendeeData.total}
        newRegistrations={attendeeData.newRegistrations}
        attendanceRate={attendeeData.attendanceRate}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <PaymentStatus paid={attendeeData.paid} unpaid={attendeeData.unpaid} />
        <GeographicDistribution />
        <GenderDistribution />
        <PopularSessions />
        <RealTimeCheckIns />
        <EngagementMetrics />
        <SurveyResponses />
        <Notifications />
        <DownloadReports />
      </div>
    </div>
  );
};

export default Dashboard;
