import { object, string, number } from "yup";

const eventSchema = object({
  name: string()
    .required("Event name is required")
    .min(5, "Event name must be at least 5 characters"),

  location: string()
    .required("Location is required")
    .min(5, "Location must be at least 5 characters"),

  startOfDate: string().required("Start date is required"),

  endOfDate: string()
    .required("End date is required")
    .test(
      "is-greater",
      "End date must be after the start date",
      function (value) {
        const { startOfDate } = this.parent;
        return (
          new Date(value) > new Date(startOfDate) &&
          new Date(value) > new Date()
        );
      }
    ),

  bookingDeadline: string().test(
    "is-before-start",
    "Booking deadline must be before the start date",
    function (value) {
      const { startOfDate } = this.parent;
      return (
        new Date(value) < new Date(startOfDate) && new Date(value) > new Date()
      );
    }
  ),

  numberOfAttendees: number()
    .positive("Number of attendees must be a positive number")
    .integer("Number of attendees must be an integer"),

  price: number().positive("Price must be a positive number"),
});

export default eventSchema;
