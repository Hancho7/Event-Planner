import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import featuredEvents from "../data/featuredEvents";
import { testimonials } from "../components/testimonials";
import ResponsiveSlider from "../components/slider";
import Aos from "aos"
import "aos/dist/aos.css";

function Home() {
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
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Hero />
        <div className="py-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold font-sans text-center mb-6">
            Latest Awesome Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6" data-aos="fade-right">
            {featuredEvents.slice(0, 6).map((event) => (
              <div
                key={event.id}
                className="relative bg-white rounded-lg shadow-md h-64 overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(event)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                ></div>
                <div className="relative p-4 bg-opacity-50 text-black-900 h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                  <h3 className="text-xl text-white font-sans font-semibold mb-2">
                    {event.title}
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
          slides={selectedEvent ? selectedEvent.slides : []}
        />
      </div>
    </div>
  );
}

export default Home;
