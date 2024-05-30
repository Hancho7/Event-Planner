import event1 from "../assets/event 1.jpeg";
import event2 from "../assets/event 2.jpeg";
import event3 from "../assets/event 3.jpeg";
import event4 from "../assets/event 4.jpeg";
import event5 from "../assets/event 5.jpeg";
import event6 from "../assets/event 6.jpeg";
import Hero from "../components/Hero";
function Home() {
  const featuredEvents = [
    {
      id: 1,
      title: "SRC party",
      description: "Description for event 1",
      imageUrl: event1,
    },
    {
      id: 2,
      title: "National Service Workshop",
      description: "Description for event 2",
      imageUrl: event2,
    },
    {
      id: 3,
      title: "Student conference",
      description:
        "",
      imageUrl: event3,
    },
    {
      id: 4,
      title: "Seminars",
      description: "Description for event 4",
      imageUrl: event4,
    },
    {
      id: 5,
      title: " Board meeting ",
      description:
        "We recently held our quarterly Board Meeting on 10th, June 2023, bringing together our board of directors to deliberate on pivotal topics impacting our organization. This session was instrumental in guiding our strategic direction and enhancing our corporate governance.",
      imageUrl: event5,
    },
    {
      id: 3,
      title: "CU Graduation ",
      description: "Description for event 6",
      imageUrl: event6,
    },
  ];
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
              className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              ></div>
              <div className="relative p-4  bg-opacity-50 text-white h-full flex flex-col justify-end transition-opacity duration-300 group-hover:bg-opacity-70">
                <h3 className="text-xl font-mono font-semibold mb-2">
                  {event.title}
                </h3>
                <p className="opacity-0 group-hover:opacity-100 text-[#ffdd50] transition-opacity duration-300">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
