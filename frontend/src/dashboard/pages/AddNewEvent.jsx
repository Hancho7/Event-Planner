import React, { useState } from "react";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    plannerID: "",
    name: "",
    location: "",
    images: "",
    startOfDate: "",
    endOfDate: "",
    bookingDeadline: "",
    attendees: "",
    numberOfAttendees: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    
      // const data = await response.json();
      alert("Event created successfully!");
      setFormData({
        plannerID: "",
        name: "",
        location: "",
        images: "",
        startOfDate: "",
        endOfDate: "",
        bookingDeadline: "",
        attendees: "",
        numberOfAttendees: "",
        price: "",
      });
    
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl text-[#ffdd50] font-bold mb-6 text-center">Add Event</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="plannerID"
            className="block text-sm font-medium text-black"
          >
            Planner ID
          </label>
          <input
            type="text"
            id="plannerID"
            name="plannerID"
            value={formData.plannerID}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-black"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-black"
          >
            Images (comma separated URLs)
          </label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="startOfDate"
            className="block text-sm font-medium text-black"
          >
            Start Date
          </label>
          <input
            type="datetime-local"
            id="startOfDate"
            name="startOfDate"
            value={formData.startOfDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="endOfDate"
            className="block text-sm font-medium text-black"
          >
            End Date
          </label>
          <input
            type="datetime-local"
            id="endOfDate"
            name="endOfDate"
            value={formData.endOfDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="bookingDeadline"
            className="block text-sm font-medium text-black"
          >
            Booking Deadline
          </label>
          <input
            type="datetime-local"
            id="bookingDeadline"
            name="bookingDeadline"
            value={formData.bookingDeadline}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="attendees"
            className="block text-sm font-medium text-black"
          >
            Attendees (comma separated IDs)
          </label>
          <input
            type="text"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="numberOfAttendees"
            className="block text-sm font-medium text-black"
          >
            Number of Attendees
          </label>
          <input
            type="number"
            id="numberOfAttendees"
            name="numberOfAttendees"
            value={formData.numberOfAttendees}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-black"
          >
            Price 
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-[#ffdd50] rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "bg-gray-500" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
