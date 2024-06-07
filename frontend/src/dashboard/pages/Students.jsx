// import React from "react";
import pay1 from "../../../src/assets/pay1.jpg";
import pay2 from "../../../src/assets/pay2.jpg";
import pay3 from "../../../src/assets/pay3.jpg";
import pay4 from "../../../src/assets/pay4.jpg";
import pay5 from "../../../src/assets/pay5.jpg";

const Students = () => {
  const students = [
    {
      username: "john_doe",
      profile: pay1,
      email: "john.doe@gmail.com",
      phone: "026-567-8901",
    },
    {
      username: "jane_smith",
      profile: pay2,
      email: "jane.smith@gmail.com",
      phone: "050-456-7890",
    },
    {
      username: "hancho",
      profile: pay3,
      email: "hancho@gmail.com",
      phone: "020-345-6789",
    },
    {
      username: "bob_brown",
      profile: pay4,
      email: "bob.brown@gmail.com",
      phone: "054-234-5678",
    },
    {
      username: "alice_johnson",
      profile: pay5,
      email: "alice.johnson@gmail.com",
      phone: "024-123-4567",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Student List</h1>
      <div>
        <ul className="bg-white text-black shadow rounded-lg p-4">
          {students.map((student, index) => (
            <li
              key={index}
              className="border-b last:border-b-0 p-4 flex items-center"
            >
              <img
                src={student.profile}
                alt={student.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold">{student.username}</div>
                <div className="text-sm text-black">Email: {student.email}</div>
                <div className="text-sm text-black">Phone: {student.phone}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Students;
