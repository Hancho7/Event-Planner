import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";



ChartJS.register(ArcElement, Tooltip, Legend);

const Payment = () => {
  const students = [
    {
      name: "John Doe",
      status: "Fully Paid",
      paymentDate: "2024-05-01",
      paymentReference: "Student Conference Event",
    },
    {
      name: "Jane Smith",
      status: "Pending",
      paymentDate: "",
      paymentReference: "",
    },
    {
      name: "Hancho",
      status: "Fully Paid",
      paymentDate: "2024-05-03",
      paymentReference: "SRC Party Event",
    },
    {
      name: "Bob Brown",
      status: "Pending",
      paymentDate: "",
      paymentReference: "",
    },
    {
      name: "Alice Johnson",
      status: "Fully Paid",
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
          Student Payments List
        </h2>
        <table className="w-full bg-white text-black shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Payment Date</th>
              <th className="py-2 px-4">Payment Reference</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.status}</td>
                <td className="py-2 px-4">{student.paymentDate}</td>
                <td className="py-2 px-4">{student.paymentReference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
