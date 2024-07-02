import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import { testimonials } from "../components/testimonials";
import ResponsiveSlider from "../components/slider";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsAction } from "../features/events/getAllEvents";

function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState({}); // Track loaded images

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    dispatch(getAllEventsAction());
  }, [dispatch]);

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Hero searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        <div className="py-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold font-sans text-center mb-6">
            Latest Awesome Events
          </h2>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
            data-aos="fade-right"
          >
            {filteredEvents?.slice(0, 6)?.map((event) => (
              <div
                key={event.eventID}
                className="relative bg-white rounded-lg shadow-md h-40 overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(event)}
                data-aos="fade-up"
              >
                {!loaded[event.eventID] && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                )}
                <img
                  src={event.images[0]}
                  alt={event.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded[event.eventID] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(event.eventID)}
                />
                <div className="relative p-4 bg-opacity-50 text-black-900 h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                  <h3 className="text-xl text-white font-sans font-semibold mb-2">
                    {event.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-screen px-2" data-aos="fade-up">
          <ResponsiveSlider testimonials={testimonials} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
        />
      </div>
    </div>
  );
}

export default Home;
