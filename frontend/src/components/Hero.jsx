import event1 from "../assets/event 1.jpeg";
import event2 from "../assets/event 2.jpeg";
import event3 from "../assets/event 3.jpeg";

function Hero() {
  const featuredEvents = [
    {
      id: 1,
      title: "Party",
      description: "Description for event 1",
      imageUrl: event1,
    },
    {
      id: 2,
      title: "Work Shop",
      description: "Description for event 2",
      imageUrl: event2,
    },
    {
      id: 3,
      title: "Conference",
      description: "Description for event 3",
      imageUrl: event3,
    },
  ];

  return (
    <div className="py-8 bg-gray-100">
      <h2 className="text-3xl font-bold font-sans text-center mb-6">
        Latest Awesome Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {featuredEvents.map((event) => (
          <div
            key={event.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            ></div>
            <div className="relative p-4 bg-black bg-opacity-50 text-white h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
