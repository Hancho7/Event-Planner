import { useState } from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import event1 from "../assets/event 1.jpeg";
import event2 from "../assets/event 2.jpeg";
import event3 from "../assets/event 3.jpeg";
import event4 from "../assets/event 4.jpeg";
import event5 from "../assets/event 5.jpeg";
import event6 from "../assets/event 6.jpeg";

function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredEvents = [
    {
      id: 1,
      title: "SRC party",
      description: "hjk",
      location: "Location for event 1",
      imageUrl: event1,
    },
    {
      id: 2,
      title: "National Service Workshop",
      location: "Location for event 2",
      imageUrl: event2,
    },
    {
      id: 3,
      title: "Student conference",
      location: "Location for event 3",
      imageUrl: event3,
    },
    {
      id: 4,
      title: "Seminars",
      location: "Description for event 4",
      imageUrl: event4,
    },
    {
      id: 5,
      title: "Board meeting",
      location: "",
      imageUrl: event5,
    },
    {
      id: 6,
      title: "CU Graduation",
      location: "Description for event 6",
      imageUrl: event6,
    },
  ];

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Hero />
      <div className="py-8 bg-gray-100">
        <h2 className="text-3xl font-bold font-sans text-center mb-6">
          Latest Awesome Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              ></div>
              <div className="relative p-4 bg-opacity-50 text-white h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-xl font-mono font-semibold mb-2">
                  {event.title}
                </h3>
                <p className="opacity-0 group-hover:opacity-100 text-[#ffdd50] transition-opacity duration-300">
                  {event.location}
                </p>
                <p className="opacity-0 group-hover:opacity-100 text-black transition-opacity duration-300">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent && (
          <div>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              className="w-full h-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="mb-4">{selectedEvent.location}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Book Now
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Home;
