import TeamMember from "../components/TeamMember";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import team1 from "../assets/team1.jpeg";
import team2 from "../assets/team2.jpeg";
import team3 from "../assets/team3.jpeg";
import aboutus from "../assets/aboutUs.jpg";
function AboutUsPage() {
  const team = [
    { name: "Imar Brown", role: "CEO", image: team1 },
    { name: "Future", role: "Manger", image: team2 },
    { name: "Hancho", role: "Director", image: team3 },
  ];

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
        <h1 className="lg:text-7xl text-center font-extrabold opacity-[0.7]">
          About Us
        </h1>
      </div>

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="mt-4 text-lg text-black-600">
            Welcome to our organization! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam consectetur mauris non magna pulvinar, nec
            eleifend velit vestibulum. Duis feugiat nibh eget est fringilla, at
            blandit justo malesuada.
          </p>
          <p className="mt-4 text-lg text-black-600">
            Our mission is to provide high-quality services and products to our
            customers. We strive for excellence in everything we do and aim to
            make a positive impact in our community.
          </p>
          <p className="mt-4 text-lg text-black-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur mauris non magna pulvinar, nec eleifend velit
            vestibulum. Duis feugiat nibh eget est fringilla, at blandit justo
            malesuada. Integer sit amet lacinia nunc, vitae pharetra lorem. In
            hac habitasse platea dictumst. Duis vitae feugiat turpis. Vivamus
            quis pharetra dui. Vivamus vestibulum neque id ipsum vehicula, in
            tempor turpis lobortis.
          </p>
          <h2 className="mt-8 text-2xl text-center font-bold text-black-700">
            Here are our team members
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2  gap-6">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 mr-4"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 mr-4"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
