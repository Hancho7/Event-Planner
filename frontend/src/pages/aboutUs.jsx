import TeamMember from "../components/TeamMember";
import team1 from "../assets/team1.jpeg";
import team2 from "../assets/team2.jpeg";
import team3 from "../assets/team3.jpeg";
import aboutus from "../assets/aboutUs.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function AboutUsPage() {
  const team = [
    { name: "Imar Brown", role: "CEO", image: team1 },
    { name: "Future", role: "Manger", image: team2 },
    { name: "Hancho", role: "Director", image: team3 },
  ];

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div>
      <div
        className=" h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${aboutus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          className="lg:text-7xl text-center font-extrabold opacity-[0.7]"
          data-aos="fade-down"
        >
          About Us
        </h1>
      </div>

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h4 className=" text-2xl font-semibold">Know More About Us</h4>
        <div className="max-w-4xl mx-auto">
          <p className="mt-4 text-lg ">
            At <span className="text-black">Event</span><span className="text-[#ffdd50]">Center</span>, we specialize in transforming events into
            unforgettable experiences. Our mission is to provide seamless,
            innovative, and personalized event management solutions that exceed
            our clients expectations. With a strong commitment to integrity,
            excellence, and customer focus, we ensure that every event we manage
            is executed to perfection.
          </p>
          <p className="mt-4 text-lg ">
            Our mission is to provide high-quality services and products to our
            customers. We strive for excellence in everything we do and aim to
            make a positive impact in our community.Leading our team is Imar,
            our Chief Executive Officer, whose vision and 6 years of industry
            experience drive our company forward. Hancho, our Director of
            Operations, meticulously oversees all operational aspects, ensuring
            every detail is flawlessly executed. Our Event Manager, Future,
            works closely with clients to tailor each event to their specific
            needs, bringing creativity and precision to every project.
          </p>
          <p className="mt-4 text-lg ">
            We are passionate about pushing the boundaries of creativity and
            innovation in event management. Whether you are a client, a partner,
            or a team member, we invite you to join us on this exciting journey
            and be a part of our story. At <span className="text-black">Event</span><span className="text-[#ffdd50]">Center</span>, the future of
            event management is bright, and we look forward to creating
            extraordinary events together.
          </p>
          <h2 className="mt-8 text-2xl text-center font-bold text-black-700">
            Here are our team members
          </h2>
          <div className="mt-8 grid md:grid-cols-3 grid-cols-1  gap-6">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
