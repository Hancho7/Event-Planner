// import React from "react";
import testi3 from "../assets/testi3.jpg";
import testi1 from "../assets/testi1.jpg";
import testi2 from "../assets/testi2.jpg";
import testi4 from "../assets/testi4.jpg";

const testimonials = [
  {
    name: "John Doe",
    image: testi3,
    rating: 5,
    feedback: "Amazing event management service. Everything was perfect!",
  },
  {
    name: "Jane Smith",
    image: testi1,
    rating: 4,
    feedback: "Great experience, will definitely use again.",
  },
  {
    name: "Bob Brown",
    image: testi4,
    rating: 5,
    feedback: "A truly wonderful experience from start to finish.",
  },
  {
    name: "Bob Sandra",
    image: testi2,
    rating: 4,
    feedback: "Professional and seamless event planning.",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-gray-100" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">
          What Our Clients Say
        </h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md min-w-[300px] flex-shrink-0"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold text-center mt-4">
                  {testimonial.name}
                </h3>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-4 text-center">
                  {testimonial.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
