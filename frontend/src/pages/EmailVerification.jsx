import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmailAction } from "../features/auth/verifyEmail";
import { ClipLoader } from "react-spinners";

function EmailVerification() {
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const { userID, tokenLink } = useParams();
  const navigate = useNavigate();

  const { success, loading } = useSelector(
    (state) => state.verifyEmail || {} // Provide default value
  );

  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length >= 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const smsCode = inputRefs.current.map((input) => input.value).join("");
    console.log("handle submit", userID, tokenLink, smsCode);
    dispatch(verifyEmailAction({ userID, tokenLink, smsCode }));
  };

  useEffect(() => {
    if (success) {
      setShowMessage(true);
      const timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-base md:text-2xl font-bold mb-6 text-center">
          Email And Phone Verification
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Verification code
            </label>
            <div className="flex space-x-2 justify-center">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-[2rem] sm:w-12 h-12 text-center px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => handleInputChange(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  required
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-3 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none"
            disabled={loading}
          >
            Verify {loading && <ClipLoader />}
          </button>
        </form>

        {showMessage && (
          <div className="mt-4 text-center">
            <p>You have successfully been verified!</p>
            <p>Redirecting to login page in {countdown} seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
