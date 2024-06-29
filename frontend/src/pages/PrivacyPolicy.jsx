import { FaEnvelope } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">
        Privacy Policy
      </h1>
      <p className="mb-6 text-lg leading-relaxed">
        Welcome to Event Center Management System. This privacy policy explains
        how we collect, use, and protect your personal information when you use
        our website.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Information We Collect
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        We collect various types of information in connection with the services
        we provide, including:
      </p>
      <ul className="list-disc list-inside mb-6 pl-4 text-lg leading-relaxed">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Login and account information</li>
        <li>Event details and preferences</li>
        <li>Payment information</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        How We Use Your Information
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        We use the collected information for various purposes, including:
      </p>
      <ul className="list-disc list-inside mb-6 pl-4 text-lg leading-relaxed">
        <li>Providing and maintaining our services</li>
        <li>Improving our website and services</li>
        <li>Processing transactions and sending related information</li>
        <li>Communicating with you, including customer support</li>
        <li>Sending promotional information and updates</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        How We Protect Your Information
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        We implement a variety of security measures to maintain the safety of
        your personal information when you enter, submit, or access your
        personal information.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Sharing Your Information
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        We do not sell, trade, or otherwise transfer to outside parties your
        personally identifiable information, except to trusted third parties who
        assist us in operating our website, conducting our business, or
        servicing you, so long as those parties agree to keep this information
        confidential.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Your Consent
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        By using our site, you consent to our privacy policy.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Changes to Our Privacy Policy
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        If we decide to change our privacy policy, we will post those changes on
        this page. This policy was last modified on{" "}
        {new Date().toLocaleDateString()}.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Contact Us</h2>
      <p className="text-lg leading-relaxed mb-6">
        If there are any questions regarding this privacy policy, you may
        contact us using the information below:
      </p>
      <div className="flex justify-center mb-6">
        <div className="flex items-center mr-4">
          <FaEnvelope className="text-[#ffdd50] mr-2" />
          <a
            href="mailto:info@example.com"
            className="text-blue-600 hover:underline"
          >
            info@eventcenter2.com
          </a>
        </div>
        <div className="flex items-center mr-4">
          <FaPhone className="text-[#ffdd50] mr-2" />
          <a href="tel:+1234567890" className="text-blue-600 hover:underline">
            +233 549 671 479
          </a>
        </div>
        <div className="flex items-center mr-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-300"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
        </div>

        <div className="flex items-center mr-4">
          <a
            href="https://wa.me/+233549671479"
            className="text-green-600 hover:text-green-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-6 h-6" />
          </a>
          </div>
          
          <div className="flex items-center mr-4">
            <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    
  );
};

export default PrivacyPolicy;
