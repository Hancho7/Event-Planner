// import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom"; 

import pay1 from "../../../src/assets/pay1.jpg";
import pay2 from "../../../src/assets/pay2.jpg";
import pay3 from "../../../src/assets/pay3.jpg";
import pay4 from "../../../src/assets/pay4.jpg";
import pay5 from "../../../src/assets/pay5.jpg";

ChartJS.register(ArcElement, Tooltip, Legend);

const Payment = () => {
  const students = [
    {
      name: "John Doe",
      status: "Fully Paid",
      profile: pay1,
      paymentDate: "2024-05-01",
      paymentReference: "Student Conference Event",
    },
    {
      name: "Jane Smith",
      status: "Pending",
      profile: pay2,
      paymentDate: "",
      paymentReference: "",
    },
    {
      name: "Hancho",
      status: "Fully Paid",
      profile: pay3,
      paymentDate: "2024-05-03",
      paymentReference: "SRC Party Event",
    },
    {
      name: "Bob Brown",
      status: "Pending",
      profile: pay4,
      paymentDate: "",
      paymentReference: "",
    },
    {
      name: "Alice Johnson",
      status: "Fully Paid",
      profile: pay5,
      paymentDate: "2024-04-03",
      paymentReference: "Book Fair Event",
    },
  ];

  const paidStudents = students.filter(
    (student) => student.status === "Fully Paid"
  );
  const unpaidStudents = students.filter(
    (student) => student.status === "Pending"
  );

  const data = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [paidStudents.length, unpaidStudents.length],
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Payment Dashboard</h1>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex-1 mr-4 flex">
          <div className="bg-green-100 text-green-700 shadow rounded-lg p-4 mb-4 w-1/2 mr-2">
            <h2 className="text-xl font-semibold mb-2">
              Total Paid: {paidStudents.length}
            </h2>
          </div>
          <div className="bg-red-100 text-red-700 shadow rounded-lg p-4 mb-4 w-1/2 ml-2">
            <h2 className="text-xl font-semibold mb-2">
              Total Unpaid: {unpaidStudents.length}
            </h2>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold text-black mb-4">
              Payment Overview
            </h2>
            <div className="w-32 mx-auto">
              <Pie data={data} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-black mb-2">
          Payment Options
        </h2>
        <p className="text-gray-600">
          Choose a payment option to manage funds:
        </p>
        <div className="flex justify-center mt-4">
          
          <Link
            to="https://paystack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            View Funds on Paystack
          </Link>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-black mb-4 mt-8">
          Student Payments
        </h2>
        <ul className="bg-white text-black shadow rounded-lg p-4">
          {students.map((student, index) => (
            <li
              key={index}
              className="border-b  last:border-b-0 p-4 flex items-center"
            >
              <img
                src={student.profile}
                alt={student.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold">{student.name}</div>
                <div className="text-sm text-black">
                  Status: {student.status}
                </div>
                {student.paymentDate && (
                  <div className="text-sm text-black">
                    Date: {student.paymentDate}
                  </div>
                )}
                {student.paymentReference && (
                  <div className="text-sm text-black">
                    Reference: {student.paymentReference}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Payment;
