import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AdminReviewPage = () => {
  const [showTransactions, setShowTransactions] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showSupportRequests, setShowSupportRequests] = useState(true);

  const reviews = [
    {
      id: "review_001",
      user: "John Doe",
      rating: 5,
      comment: "Excellent event! Had a great time.",
      date: "2024-05-01",
      event: "Student Conference",
    },
    {
      id: "review_002",
      user: "Jane Smith",
      rating: 3,
      comment: "It was okay, but could have been better organized.",
      date: "2024-05-02",
      event: "Tech Meetup",
    },
    {
      id: "review_003",
      user: "Hancho",
      rating: 4,
      comment: "Good event, learned a lot.",
      date: "2024-05-03",
      event: "SRC Party",
    },
    {
      id: "review_004",
      user: "Bob Brown",
      rating: 2,
      comment: "Not very enjoyable, had several issues.",
      date: "2024-05-04",
      event: "Book Fair",
    },
    {
      id: "review_005",
      user: "Alice Johnson",
      rating: 5,
      comment: "Fantastic event! Would attend again.",
      date: "2024-05-05",
      event: "Music Festival",
    },
  ];

  const transactions = [
    {
      id: "trans_001",
      user: "John Doe",
      amount: "$100",
      date: "2024-05-01",
      status: "Completed",
      reference: "Student Conference",
    },
    {
      id: "trans_002",
      user: "Jane Smith",
      amount: "$50",
      date: "2024-05-02",
      status: "Pending",
      reference: "Tech Meetup",
    },
    {
      id: "trans_003",
      user: "Hancho",
      amount: "$75",
      date: "2024-05-03",
      status: "Completed",
      reference: "SRC Party",
    },
    {
      id: "trans_004",
      user: "Bob Brown",
      amount: "$30",
      date: "2024-05-04",
      status: "Failed",
      reference: "Book Fair",
    },
    {
      id: "trans_005",
      user: "Alice Johnson",
      amount: "$120",
      date: "2024-05-05",
      status: "Completed",
      reference: "Music Festival",
    },
  ];

  const events = [
    {
      name: "Student Conference",
      date: "2024-05-01",
      organizer: "University",
      participants: 150,
    },
    {
      name: "Tech Meetup",
      date: "2024-05-02",
      organizer: "Tech Society",
      participants: 100,
    },
    {
      name: "SRC Party",
      date: "2024-05-03",
      organizer: "SRC",
      participants: 200,
    },
    {
      name: "Book Fair",
      date: "2024-05-04",
      organizer: "Library",
      participants: 80,
    },
    {
      name: "Music Festival",
      date: "2024-05-05",
      organizer: "Music Club",
      participants: 250,
    },
  ];

  const users = [
    {
      id: "user_001",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      role: "student",
    },
    {
      id: "user_002",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "inactive",
      role: "teacher",
    },
    {
      id: "user_003",
      name: "Hancho",
      email: "hancho@example.com",
      status: "active",
      role: "student",
    },
    {
      id: "user_004",
      name: "Bob Brown",
      email: "bob@example.com",
      status: "inactive",
      role: "admin",
    },
    {
      id: "user_005",
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "active",
      role: "student",
    },
  ];

  const supportRequests = [
    {
      id: "support_001",
      user: "John Doe",
      issue: "Unable to register for an event",
      date: "2024-05-01",
      status: "Open",
    },
    {
      id: "support_002",
      user: "Jane Smith",
      issue: "Payment issue",
      date: "2024-05-02",
      status: "Resolved",
    },
    {
      id: "support_003",
      user: "Hancho",
      issue: "Event details missing",
      date: "2024-05-03",
      status: "Pending",
    },
    {
      id: "support_004",
      user: "Bob Brown",
      issue: "Login problems",
      date: "2024-05-04",
      status: "Closed",
    },
    {
      id: "support_005",
      user: "Alice Johnson",
      issue: "Profile update error",
      date: "2024-05-05",
      status: "Open",
    },
  ];

  const data = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [50, 20], // Example data
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  const toggleSection = (section) => {
    switch (section) {
      case "transactions":
        setShowTransactions(!showTransactions);
        break;
      case "events":
        setShowEvents(!showEvents);
        break;
      case "users":
        setShowUsers(!showUsers);
        break;
      case "supportRequests":
        setShowSupportRequests(!showSupportRequests);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">
         Review 
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">User Reviews</h2>
        <div className="bg-white text-black shadow rounded-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr className=" border-b">
                <th className="py-2">User</th>
                <th className="py-2">Rating</th>
                <th className="py-2">Comment</th>
                <th className="py-2">Date</th>
                <th className="py-2">Event</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2">{review.user}</td>
                  <td className="py-2">{review.rating}</td>
                  <td className="py-2">{review.comment}</td>
                  <td className="py-2">{review.date}</td>
                  <td className="py-2">{review.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex justify-between items-center">
          Payment Overview
          <button
            onClick={() => toggleSection("transactions")}
            className="text-gray-600 focus:outline-none"
          >
            {showTransactions ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h2>
        {showTransactions && (
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold text-black mb-4">
              Transactions
            </h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Transaction ID</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Reference</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-2">{transaction.id}</td>
                    <td className="py-2">{transaction.user}</td>
                    <td className="py-2">{transaction.amount}</td>
                    <td className="py-2">{transaction.date}</td>
                    <td className="py-2">{transaction.status}</td>
                    <td className="py-2">{transaction.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 w-1/4 mx-auto">
              <Pie data={data} />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex justify-between items-center">
          Events
          <button
            onClick={() => toggleSection("events")}
            className="text-gray-600 focus:outline-none"
          >
            {showEvents ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h2>
        {showEvents && (
          <ul className="bg-white text-black shadow rounded-lg p-4">
            {events.map((event, index) => (
              <li
                key={index}
                className="border-b last:border-b-0 p-4 hover:bg-gray-100"
              >
                <div className="font-semibold">{event.name}</div>
                <div className="text-sm text-black">Date: {event.date}</div>
                <div className="text-sm text-black">
                  Organizer: {event.organizer}
                </div>
                <div className="text-sm text-black">
                  Participants: {event.participants}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex justify-between items-center">
          User Management
          <button
            onClick={() => toggleSection("users")}
            className="text-gray-600 focus:outline-none"
          >
            {showUsers ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h2>
        {showUsers && (
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="py-2">User ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
                <th className="py-2">Role</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.status}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                    {" | "}
                    <button className="text-red-500 hover:underline focus:outline-none">
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex justify-between items-center">
          Support Requests
          <button
            onClick={() => toggleSection("supportRequests")}
            className="text-gray-600 focus:outline-none"
          >
            {showSupportRequests ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h2>
        {showSupportRequests && (
          <ul className="bg-white text-black shadow rounded-lg p-4">
            {supportRequests.map((request, index) => (
              <li
                key={index}
                className="border-b last:border-b-0 p-4 hover:bg-gray-100"
              >
                <div className="font-semibold">{request.user}</div>
                <div className="text-sm text-black">Issue: {request.issue}</div>
                <div className="text-sm text-black">Date: {request.date}</div>
                <div className="text-sm text-black">
                  Status: {request.status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminReviewPage;
