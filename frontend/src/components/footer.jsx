// import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg text-[#ffdd50] font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/login" className="hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="/about-Us" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/events" className="hover:underline">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg text-[#ffdd50] font-semibold mb-4">
              Contact Information
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@example.com" className="hover:underline">
                  info@eventcenter2.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline">
                  +1 234 567 890
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h4 className="text-lg text-[#ffdd50] font-semibold mb-4">
              Follow Us
            </h4>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-600 hover:text-blue-500"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-600 hover:text-blue-500"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-600 hover:text-blue-500"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-600 hover:text-blue-500"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center">
            <div className="mb-4 md:mb-0">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </div>
            <div>
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white">Event</span>
              <span className="text-[#DBB610] p-2">Center</span>  
               Management System. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
