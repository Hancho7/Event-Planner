import { useState } from "react";
import Modal from "../components/Modal";
import featuredEvents from "../data/featuredEvents";

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

  return (
    <div>
      <div className="py-8 bg-gray-100">
        <h2 className="text-3xl font-bold font-sans text-center mb-6">
          All Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
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
