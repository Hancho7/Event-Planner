import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Modal({
  isOpen,
  onClose,
  slides,
  isLoggedIn,
  onLogin,
  onCreateAccount,
}) {
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
          {slides.map((slide, index) =>
            slide.imageUrls.map((image, idx) => (
              <div key={`${index}-${idx}`}>
                <img
                  src={image}
                  alt={slide.title}
                  className="w-full h-auto mb-4"
                />
              </div>
            ))
          )}
        </Carousel>

        {slides.map((slide, index) => (
          <div key={index} className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">{slide.title}</h2>
            {slide.location && (
              <p className="mb-2 font-bold">{slide.location}</p>
            )}
            {slide.description && (
              <p className="mb-2 font-mono font-bold text-black-900">
                {slide.description}
              </p>
            )}
            {slide.date && (
              <p className="mb-2 font-bold text-mono">{slide.date}</p>
            )}
            {slide.time && <p className="mb-2">{slide.time}</p>}
            {index === 0 && (
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;
