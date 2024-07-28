import { useEffect, useState } from "react";
import TeamMember from "../components/TeamMember";
import team1 from "../assets/jose.jpg";
import team2 from "../assets/mathias.jpg";
import team3 from "../assets/nana.jpeg";
import aboutus from "../assets/aboutUs.jpg";
import aboutusLowRes from "../assets/aboutusLowRes.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

function AboutUsPage() {
  const team = [
    {
      name: "Mathias Lawson Prince",
      role: "Frontend-dev",
      image: team2,
      lowResImage: aboutusLowRes,
    },
    {
      name: "Jose Jefferson",
      role: "Backend-dev",
      image: team1,
      lowResImage: aboutusLowRes,
    },
    {
      name: "Nana Aduseh Poku",
      role: "Data Scientist",
      image: team3,
      lowResImage: aboutusLowRes,
    },
  ];

  const [aboutImageLoaded, setAboutImageLoaded] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleAboutImageLoad = () => {
    setAboutImageLoaded(true);
  };

  return (
    <div>
      <div className="h-[70vh] flex items-center justify-center relative">
        <img
          loading="lazy"
          className={`object-cover h-full w-full transition-opacity duration-700 ${
            aboutImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={aboutus}
          alt="About Us"
          onLoad={handleAboutImageLoad}
        />
        {!aboutImageLoaded && (
          <img
            className="object-cover h-full w-full absolute inset-0 filter blur-lg"
            src={aboutusLowRes}
            alt="About Us Low Res"
          />
        )}
        <h1
          className="text-3xl lg:text-7xl text-white text-center font-extrabold opacity-[0.7] absolute"
          data-aos="fade-down"
        >
          About Us
        </h1>
      </div>

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h4 className="text-xl md:text-2xl font-semibold">
          Know More About Us
        </h4>
        <div className="max-w-4xl mx-auto">
          <p className="mt-4 md:text-lg">
            At <span className="text-black">Event</span>
            <span className="text-[#ffdd50]">Center</span>, we specialize in
            transforming events into unforgettable experiences. Our mission is
            to provide seamless, innovative, and personalized event management
            solutions that exceed our clients' expectations. With a strong
            commitment to integrity, excellence, and customer focus, we ensure
            that every event we manage is executed to perfection.
          </p>
          <p className="mt-4 md:text-lg">
            Our mission is to provide high-quality services and products to our
            customers. We strive for excellence in everything we do and aim to
            make a positive impact in our community. Leading our team is Elton,
            our Chief Executive Officer, whose vision and 6 years of industry
            experience drive our company forward. Frank, our Director of
            Operations, meticulously oversees all operational aspects, ensuring
            every detail is flawlessly executed. Our Event Manager, Nasiru,
            works closely with clients to tailor each event to their specific
            needs, bringing creativity and precision to every project.
          </p>
          <p className="mt-4 md:text-lg">
            We are passionate about pushing the boundaries of creativity and
            innovation in event management. Whether you are a client, a partner,
            or a team member, we invite you to join us on this exciting journey
            and be a part of our story. At{" "}
            <span className="text-black">Event</span>
            <span className="text-[#ffdd50]">Center</span>, the future of event
            management is bright, and we look forward to creating extraordinary
            events together.
          </p>
          <h2 className="mt-8 text-2xl text-center font-bold text-black-700">
            Here are our team members
          </h2>
          <div className="mt-8 grid md:grid-cols-3 grid-cols-1 gap-6">
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
