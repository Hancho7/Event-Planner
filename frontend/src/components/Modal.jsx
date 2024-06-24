import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Modal({ isOpen, onClose, event, isLoggedIn, onLogin }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isLoggedIn) {
      const response = window.confirm(
        "You need to log in or create an account to book. Do you want to log in or create an account?"
      );
      if (response) {
        navigate("/register");
      } else {
        onLogin();
      }
    } else {
      navigate("/payment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative h-[90%] overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
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
              <div className="mb-2  text-black-900">
                <h6 className=" font-semibold">Starts</h6>
                <p>{formatDate(event.startOfDate)}</p>
              </div>
            )}
            {event.endOfDate && (
              <div className="mb-2  text-black-900">
                <h6 className=" font-semibold">Ends</h6>
                <p>{formatDate(event.endOfDate)}</p>
              </div>
            )}
          </div>


          {event.bookingDeadline && (
            <div className="mb-2  text-black-900">
              <h6 className=" font-semibold">Booking Deadline</h6>
              <p>{formatDate(event.bookingDeadline)}</p>
            </div>
          )}

          {event.price && (
            <div className="mb-2  text-black-900">
              <h6 className=" font-semibold">Attendance fee</h6>
              <p>GHC {event.price}</p>
            </div>
          )}
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
