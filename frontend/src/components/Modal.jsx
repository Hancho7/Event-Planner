import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { ClipLoader } from "react-spinners";
import { attendEventAction } from "../features/events/attendEvent";
import { formatDate } from "../utils/formatDate";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Modal({ isOpen, onClose, event, isLoggedIn, onLogin }) {
  const { data } = useSelector((state) => state.login);
  const {
    data: attendEventData,
    loading: attendEventLoading,
    success: attendEventSuccess,
  } = useSelector((state) => state.attendEvent);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (attendEventSuccess) {
      window.open(attendEventData.authorization_url, "_blank");
    }
  }, [attendEventSuccess, attendEventData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
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
              <img
                src={image}
                alt={event.name}
                className="w-full h-auto mb-4"
              />
            </div>
          ))}
        </Carousel>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {event.name}
          </h2>
          {event.location && (
            <p className="mb-2 font-medium">{event.location}</p>
          )}
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
            className="mt-4 flex items-center gap-3 font-semibold justify-center bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleBookNow}
          >
            Book Now {attendEventLoading && <ClipLoader color="white" size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
