import React, { useState } from "react";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    userID: "",
    name: "",
    email: "",
    amount: "",
    type: "PLANNER_REQUEST",
    eventID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call backend to create a payment request and get paystack data
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const paymentRequest = await response.json();

      // Integrate with Paystack for payment processing
      const handler = window.PaystackPop.setup({
        key: "your-paystack-public-key",
        email: paymentRequest.email,
        amount: paymentRequest.amount * 100, // Paystack expects amount in kobo
        currency: "NGN",
        callback: async (response) => {
          const { reference } = response;

          // Update payment request with paystack reference
          const updateResponse = await fetch(
            `/api/payments/${paymentRequest.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paystack: response }),
            }
          );

          if (updateResponse.ok) {
            alert("Payment successful!");
          } else {
            alert("Failed to update payment status.");
          }
        },
        onClose: function () {
          alert("Payment cancelled.");
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
    <h1 className="text-3xl font-semibold text-center mb-6">Make Payment</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="userID"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <input
            type="text"
            id="userID"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="PLANNER_REQUEST">Planner Request</option>
            <option value="EVENT_TICKET">Event Ticket</option>
          </select>
        </div>
        {formData.type === "EVENT_TICKET" && (
          <div className="mb-4">
            <label
              htmlFor="eventID"
              className="block text-sm font-medium text-gray-700"
            >
              Event ID
            </label>
            <input
              type="text"
              id="eventID"
              name="eventID"
              value={formData.eventID}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
