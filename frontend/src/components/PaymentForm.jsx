import React from "react";
import { useFormik } from "formik";
import payment from "../schema/payment";

const PaymentForm = () => {
  const formik = useFormik({
    initialValues: {
      userID: "",
      name: "",
      email: "",
      amount: "",
      type: "PLANNER_REQUEST",
      eventID: "",
    },
    validationSchema: payment,
    onSubmit: async (values) => {
      try {
        // Call backend to create a payment request and get paystack data
        const response = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
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
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Make Payment</h1>
      <form
        onSubmit={formik.handleSubmit}
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
            value={formik.values.userID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {formik.touched.userID && formik.errors.userID ? (
            <div className="text-red-600">{formik.errors.userID}</div>
          ) : null}
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
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
          ) : null}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
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
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-red-600">{formik.errors.amount}</div>
          ) : null}
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
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="PLANNER_REQUEST">Planner Request</option>
            <option value="EVENT_TICKET">Event Ticket</option>
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-600">{formik.errors.type}</div>
          ) : null}
        </div>
        {formik.values.type === "EVENT_TICKET" && (
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
              value={formik.values.eventID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.touched.eventID && formik.errors.eventID ? (
              <div className="text-red-600">{formik.errors.eventID}</div>
            ) : null}
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
