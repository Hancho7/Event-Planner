// import React from "react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Event Center Management System. These terms of service
        outline the rules and regulations for the use of our website and
        services.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using our services, you accept and agree to be bound by
        the terms and provision of this agreement. If you do not agree to abide
        by the above, please do not use this service.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Modification of Terms</h2>
      <p className="mb-4">
        We reserve the right to change these terms of service at any time. We
        will notify you of significant changes by sending a notice to the
        primary email address specified in your account or by placing a
        prominent notice on our site.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Use of Service</h2>
      <p className="mb-4">
        You agree to use the service only for purposes that are permitted by
        these terms and any applicable law, regulation, or generally accepted
        practices or guidelines in the relevant jurisdictions.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Account Security</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        and password and for restricting access to your computer. You agree to
        accept responsibility for all activities that occur under your account
        or password.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall Event Center Management System, nor its directors,
        employees, partners, agents, suppliers, or affiliates, be liable for any
        indirect, incidental, special, consequential or punitive damages,
        including without limitation, loss of profits, data, use, goodwill, or
        other intangible losses, resulting from (i) your use or inability to use
        the service; (ii) any unauthorized access to or use of our servers
        and/or any personal information stored therein.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
      <p className="mb-4">
        These terms shall be governed and construed in accordance with the laws
        of [Your Country], without regard to its conflict of law provisions.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfService;
