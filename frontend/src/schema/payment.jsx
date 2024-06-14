import { object, string, number } from "yup";

const payment = object({
  userID: string().required("User ID is required"),
  name: string().required("Name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  amount: number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
  type: string().required("Type is required"),
  eventID: string().when("type", {
    is: "EVENT_TICKET",
    then: string().required("Event ID is required for Event Ticket"),
  }),
});

export default payment;
