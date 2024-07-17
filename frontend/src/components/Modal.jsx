import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { ClipLoader } from "react-spinners";
import { attendEventAction, resetAttendance } from "../features/events/attendEvent";
import { formatDate } from "../utils/formatDate";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Notification from "./notification";
import { CiCircleCheck } from "react-icons/ci";

function Modal({ isOpen, onClose, event, isLoggedIn, onLogin }) {
  const { data } = useSelector((state) => state.login);
  const {
    data: attendEventData,
    loading: attendEventLoading,
    success: attendEventSuccess,
  } = useSelector((state) => state.attendEvent);
  const dispatch = useDispatch();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleBookNow = () => {
    if (data) {
      dispatch(
        attendEventAction({
          eventID: event.eventID,
          userID: data.id,
          amount: event.price || null,
        })
      );
    }
  };

  useEffect(() => {
    if (attendEventData) {
      setPaymentUrl(attendEventData.authorization_url);
      setPaymentModalOpen(true);
    }
  }, [attendEventSuccess, attendEventData]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    dispatch(resetAttendance());
    setPaymentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
      {attendEventSuccess && !attendEventData && (
        <Notification onDismiss={handleDismiss}>
          <div className="flex flex-row items-center gap-1">
            <div>
              <CiCircleCheck className="text-green-500" />
            </div>
            <p>You have successfully booked the event!</p>
          </div>
        </Notification>
      )}
      <div className="bg-white flex flex-col p-6 rounded-lg shadow-lg max-w-lg w-full relative h-[90%] overflow-auto">
        <button
          className=" self-end top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl mb-2"
          onClick={onClose}
        >
          &times;
        </button>

        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showIndicators={false}
        >
          {event.images.map((image, idx) => (
            <div key={idx}>
              <img src={image} alt={event.name} className="w-full h-auto mb-4" />
            </div>
          ))}
        </Carousel>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4 text-center">{event.name}</h2>
          {event.location && <p className="mb-2 font-medium">{event.location}</p>}
          <div className="flex flex-col">
            {event.startOfDate && (
              <div className="mb-2 text-black-900">
                <h6 className="font-semibold">Starts</h6>
                <p>{formatDate(event.startOfDate)}</p>
              </div>
            )}
            {event.endOfDate && (
              <div className="mb-2 text-black-900">
                <h6 className="font-semibold">Ends</h6>
                <p>{formatDate(event.endOfDate)}</p>
              </div>
            )}
          </div>

          {event.bookingDeadline && (
            <div className="mb-2 text-black-900">
              <h6 className="font-semibold">Booking Deadline</h6>
              <p>{formatDate(event.bookingDeadline)}</p>
            </div>
          )}

          {event.price && (
            <div className="mb-2 text-black-900">
              <h6 className="font-semibold">Attendance fee</h6>
              <p>GHC {event.price}</p>
            </div>
          )}
          <button
            className="mt-4 flex items-center gap-3 font-semibold justify-center bg-[#1F2937] hover:bg-[#3a4a61] text-white py-2 px-4 rounded"
            onClick={handleBookNow}
          >
            Book Now {attendEventLoading && <ClipLoader color="white" size={20} />}
          </button>
        </div>
      </div>
      <PaymentModal isOpen={paymentModalOpen} closeModal={handleDismiss} url={paymentUrl} />
    </div>
  );
}


export const PaymentModal = ({ isOpen, closeModal, url }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <iframe
              title="Payment Gateway"
              src={url}
              className="w-full h-96"
              frameBorder="0"
            ></iframe>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
