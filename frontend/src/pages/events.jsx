import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import featuredEvents from "../data/featuredEvents";
import Aos from "aos";
import "aos/dist/aos.css";

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    Aos.init({ duration: 1500 });
  });

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className=" flex flex-col gap-12">
        <div>
          <h2
            className="text-3xl lg:text-5xl font-bold text-center"
            data-aos="fade-down"
          >
            All Events
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6 px-6"
          data-aos="fade-up"
        >
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white  text-white rounded-lg shadow-md h-40 overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              ></div>
              <div className="relative p-4 bg-opacity-50 text-black-900 h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-xl font-sans font-semibold mb-2">
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        slides={selectedEvent ? selectedEvent.slides : []}
      />
    </div>
  );
}

export default EventsPage;
