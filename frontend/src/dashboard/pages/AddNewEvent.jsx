import { useFormik } from "formik";
import eventSchema from "../../schema/event";
import { useDispatch, useSelector } from "react-redux";
import { addNewEventAction, resetEvent } from "../../features/events/addNewEvents";
import { ClipLoader } from "react-spinners";
import Notification from "../../components/notification";
import { CiCircleCheck } from "react-icons/ci";

const AddEvent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const { loading, success } = useSelector(
    (state) => state.addNewEvent
  );
  const formik = useFormik({
    initialValues: {
      plannerID: data.id,
      name: "",
      location: "",
      images: [],
      startOfDate: "",
      endOfDate: "",
      bookingDeadline: "",
      attendees: "",
      numberOfAttendees: "",
      price: "",
    },
    // validationSchema: eventSchema,
    onSubmit: (values) => {
      const startOfDate = new Date(values.startOfDate + "Z"); // Add 'Z' to indicate UTC time zone
      const endOfDate = new Date(values.endOfDate + "Z");
      const bookingDeadline = new Date(values.bookingDeadline + "Z");

      const formattedValues = {
        ...values,
        startOfDate: startOfDate.toISOString(),
        endOfDate: endOfDate.toISOString(),
        bookingDeadline: bookingDeadline.toISOString(),
      };

      console.log(formattedValues);
      dispatch(addNewEventAction(formattedValues));
      // Submit the formattedValues to your API or handle them as needed
    },
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    formik.setFieldValue("images", filesArray);
  };

  const handleNotificationDismiss = () => {
    dispatch(resetEvent());
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
       {success && (
        <Notification onDismiss={handleNotificationDismiss}>
          <div className="flex flex-row items-center gap-1">
            <div>
              <CiCircleCheck className="text-green-500" />
            </div>
            <p>Your event has successfully been created!</p>
          </div>
        </Notification>
      )}
      <h2 className="text-2xl text-[#1F2937] font-bold mb-6 text-center">
        Add Event
      </h2>
      <p className=" text-sm text-center">
        All fields with asterix are required
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Event Name<span className=" text-[#f00]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.name && formik.touched.name && formik.errors.name}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-black"
          >
            Location<span className=" text-[#f00]">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.location &&
              formik.touched.location &&
              formik.errors.location}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-black"
          >
            Images<span className=" text-[#f00]">*</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.images &&
              formik.touched.images &&
              formik.errors.images}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="startOfDate"
            className="block text-sm font-medium text-black"
          >
            Start Date<span className=" text-[#f00]">*</span>
          </label>
          <input
            type="datetime-local"
            id="startOfDate"
            name="startOfDate"
            value={formik.values.startOfDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.startOfDate &&
              formik.touched.startOfDate &&
              formik.errors.startOfDate}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="endOfDate"
            className="block text-sm font-medium text-black"
          >
            End Date<span className=" text-[#f00]">*</span>
          </label>
          <input
            type="datetime-local"
            id="endOfDate"
            name="endOfDate"
            value={formik.values.endOfDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.endOfDate &&
              formik.touched.endOfDate &&
              formik.errors.endOfDate}
          </span>
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
            value={formik.values.bookingDeadline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.bookingDeadline &&
              formik.touched.bookingDeadline &&
              formik.errors.bookingDeadline}
          </span>
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
            value={formik.values.numberOfAttendees}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.numberOfAttendees &&
              formik.touched.numberOfAttendees &&
              formik.errors.numberOfAttendees}
          </span>
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
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm"
          />
          <span className=" text-red-500 text-sm">
            {formik.errors.price && formik.touched.price && formik.errors.price}
          </span>
        </div>
        <button
          className="flex justify-center items-center gap-3 flex-row w-full bg-[#1F2937] hover:bg-[#536a8a] h-9 text-white font-semibold py-3 rounded-sm"
          type="submit"
        >
          Add {loading && <ClipLoader color="white" size={20} />}
        </button>
      </form>
      {success && <div className="flex items-center justify-center text-green-700 my-3">Your event has successfully been created!</div>}
    </div>
  );
};

export default AddEvent;
