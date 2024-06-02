import { useState } from "react";
import Hero from "../components/Hero";
import Modal from "../components/Modal";
import event1 from "../assets/event 1.jpeg";
import event2 from "../assets/event 2.jpeg";
import event2b from "../assets/event2b.jpg";
import event3 from "../assets/event 3.jpeg";
import event3b from "../assets/event3b.jpg";
import event4 from "../assets/event 4.jpeg";
import event4b from "../assets/event4b.jpg";
import event5 from "../assets/event 5.jpeg";
import event6 from "../assets/event 6.jpeg";
import event1b from "../assets/event1b.jpg";
import event6b from "../assets/event6b.jpg";
import meeting from "../assets/meeting.jpg";

function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredEvents = [
    {
      id: 1,
      title: "SRC party",
      imageUrl: event1,
      slides: [
        {
          imageUrls: [event1, event1b],
          title: "SRC party",
          location: "Trinity Hall",
          description:
            "Join us for the SRC’s annual Spring Fest, a vibrant celebration that marks the end of the academic year with a day full of fun, entertainment, and community spirit. This event is open to all students, faculty, and staff, promising a memorable experience for everyone!",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
    },
    {
      id: 2,
      title: "National Service Workshop",
      imageUrl: event2,
      slides: [
        {
          imageUrls: [event2, event2b],
          title: "National Service Workshop",
          location: "Location for event 2",
          description: "Slide 1 description",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
    },
    {
      id: 3,
      title: "Student conference",
      imageUrl: event3,
      slides: [
        {
          imageUrls: [event3, event3b],
          title: "Student conference",
          location: "Location for event 3",
          description: "Slide 1 description",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
    },
    {
      id: 4,
      title: "Seminars",
      imageUrl: event4,
      slides: [
        {
          imageUrls: [event4, event4b],
          title: "Seminars",
          location: "Location for event 4",
          description: "Slide 1 description",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
    },
    {
      id: 5,
      title: "Board meeting",
      imageUrl: event5,
      slides: [
        {
          imageUrls: [event5, meeting],
          title: "Board meeting",
          location: "Location for event 5",
          description: "Slide 1 description",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
    },
    {
      id: 6,
      title: "CU Graduation",
      imageUrl: event6,
      slides: [
        {
          imageUrls: [event6, event6b],
          title: "CU Graduation",
          location: "Location  for event 6",
          description: "Slide 1 description",
          date: "20/05/2020",
          time: "10:00 AM",
        },
      ],
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

export default Home;
