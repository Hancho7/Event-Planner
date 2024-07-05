// import React from "react";
import {
  FaCheckCircle,
  FaStar,
  FaCalendarAlt,
  FaHandshake,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-blue-500 w-12 h-12" />,
      title: "Reliable Service",
      description:
        "We provide reliable and trustworthy event management services to ensure your event is a success.",
    },
    {
      icon: <FaStar className="text-yellow-500 w-12 h-12" />,
      title: "High Quality",
      description:
        "Our team ensures the highest quality in every aspect of event planning and execution.",
    },
    {
      icon: <FaCalendarAlt className="text-green-500 w-12 h-12" />,
      title: "Timely Execution",
      description:
        "We guarantee timely execution of all event plans and schedules.",
    },
    {
      icon: <FaHandshake className="text-purple-500 w-12 h-12" />,
      title: "Customer Satisfaction",
      description:
        "Our priority is customer satisfaction, and we strive to exceed your expectations.",
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
