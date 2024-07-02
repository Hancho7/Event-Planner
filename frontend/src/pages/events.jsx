import  { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsAction } from "../features/events/getAllEvents";

function EventsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState({}); // Track loaded images

  useEffect(() => {
    dispatch(getAllEventsAction());
  }, [dispatch]);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const filteredEvents = data?.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="flex flex-col gap-12">
        <div>
          <h2
            className="text-3xl lg:text-5xl font-bold text-center"
            data-aos="fade-down"
          >
            All Events
          </h2>
          <div className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-sm h-10 md:w-[22rem] px-3 font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6 px-6">
          {filteredEvents?.map((event) => (
            <div
              key={event.eventID}
              className="relative bg-white rounded-lg shadow-md h-40 overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              data-aos="fade-up"
              onClick={() => openModal(event)}
            >
              {!loaded[event.eventID] && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
              )}
              <img
                src={event.images[1]}
                alt={event.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  loaded[event.eventID] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(event.eventID)}
              />
              <div className="relative p-4 bg-opacity-50 text-black-900 h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-xl font-sans text-white font-semibold mb-2">
                  {event.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
}

export default EventsPage;
