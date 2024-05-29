import React from "react";

function Hero() {
  const featuredEvents = [
    { id: 1, title: "Event 1", description: "Description for event 1" },
    { id: 2, title: "Event 2", description: "Description for event 2" },
    { id: 3, title: "Event 3", description: "Description for event 3" },
    { id: 4, title: "Event 4", description: "Description for event 4" },
    { id: 5, title: "Event 5", description: "Description for event 5" },
    { id: 6, title: "Event 6", description: "Description for event 6" },
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
