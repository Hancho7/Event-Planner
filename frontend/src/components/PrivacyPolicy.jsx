// import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to Event Center Management System. This privacy policy explains
        how we collect, use, and protect your personal information when you use
        our website.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect various types of information in connection with the services
        we provide, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Login and account information</li>
        <li>Event details and preferences</li>
        <li>Payment information</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the collected information for various purposes, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Providing and maintaining our services</li>
        <li>Improving our website and services</li>
        <li>Processing transactions and sending related information</li>
        <li>Communicating with you, including customer support</li>
        <li>Sending promotional information and updates</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">
        How We Protect Your Information
      </h2>
      <p className="mb-4">
        We implement a variety of security measures to maintain the safety of
        your personal information when you enter, submit, or access your
        personal information.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer to outside parties your
        personally identifiable information, except to trusted third parties who
        assist us in operating our website, conducting our business, or
        servicing you, so long as those parties agree to keep this information
        confidential.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Your Consent</h2>
      <p className="mb-4">
        By using our site, you consent to our privacy policy.
      </p>
      <h2 className="text-2xl font-semibold mb-2">
        Changes to Our Privacy Policy
      </h2>
      <p className="mb-4">
        If we decide to change our privacy policy, we will post those changes on
        this page. This policy was last modified on{" "}
        {new Date().toLocaleDateString()}.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>
        If there are any questions regarding this privacy policy, you may
        contact us using the information below:
      </p>
      <p>
        Event Center Management System
        <br />
        Email:{" "}
        <a
          href="mailto:info@example.com"
          className="text-blue-500 hover:underline"
        >
          info@eventcenter2.com
        </a>
        <br />
        Phone:{" "}
        <a href="tel:+1234567890" className="text-blue-500 hover:underline">
          +233 549 671 479
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
