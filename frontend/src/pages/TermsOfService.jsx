// import React from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter} from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">
        Terms of Service
      </h1>
      <p className="mb-6 text-lg leading-relaxed">
        Welcome to Event Center Management System. These terms of service
        outline the rules and regulations for the use of our website and
        services.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Acceptance of Terms
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        By accessing and using our services, you accept and agree to be bound by
        the terms and provision of this agreement. If you do not agree to abide
        by the above, please do not use this service.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Modification of Terms
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        We reserve the right to change these terms of service at any time. We
        will notify you of significant changes by sending a notice to the
        primary email address specified in your account or by placing a
        prominent notice on our site.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Use of Service
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        You agree to use the service only for purposes that are permitted by
        these terms and any applicable law, regulation, or generally accepted
        practices or guidelines in the relevant jurisdictions.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Account Security
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        You are responsible for maintaining the confidentiality of your account
        and password and for restricting access to your computer. You agree to
        accept responsibility for all activities that occur under your account
        or password.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Limitation of Liability
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        In no event shall Event Center Management System, nor its directors,
        employees, partners, agents, suppliers, or affiliates, be liable for any
        indirect, incidental, special, consequential or punitive damages,
        including without limitation, loss of profits, data, use, goodwill, or
        other intangible losses, resulting from (i) your use or inability to use
        the service; (ii) any unauthorized access to or use of our servers
        and/or any personal information stored therein.
      </p>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Governing Law
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        These terms shall be governed and construed in accordance with the laws
        of Ghana, without regard to its conflict of law provisions.
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
            className="text-blue-500 hover:text-blue-200"
          >
            <FaFacebook className="w-6 h-6 " />
          </a>
        </div>

        <div className="flex items-center mr-4">
          <a
            href="https://wa.me/+233549671479"
            className="text-green-600 hover:text-green-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-6 h-6 " />
          </a>
          </div>
          
          <div className="flex items-center mr-4">
            <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
  );
};

export default TermsOfService;
