// BecomeAPlanner.js
import { useEffect, useState } from "react";
import planner from "../assets/planner.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { plannerRequestAction } from "../features/payments/initializePlanner";
import { ClipLoader } from "react-spinners";
import {PaymentModal} from "../components/Modal"; // Assuming PaymentModal is your modal component

function BecomeAPlanner() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const {
    data: paystack,
    loading,
    success,
  } = useSelector((state) => state.plannerRequest);

  const [isPaymentRequested, setIsPaymentRequested] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleClick = () => {
    dispatch(
      plannerRequestAction({
        userID: data.id,
        amount: 0.1,
        type: "PLANNER_REQUEST",
      })
    );
    setIsPaymentRequested(true); // Set payment request initiated
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setIsPaymentRequested(false); // Reset payment request status
  };

  useEffect(() => {
    if (success && paystack && paystack.authorization_url) {
      setIsModalOpen(true); // Open modal on successful payment request
    }
  }, [success, paystack]);

  return (
    <div>
      <div
        className="h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${planner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          className="lg:text-7xl text-center font-extrabold opacity-[0.7]"
          data-aos="fade-down"
        >
          Become A Planner
        </h1>
      </div>

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h4 className=" text-2xl font-semibold">Terms And Conditions</h4>
        <div className="max-w-4xl mx-auto my-4">
          <p>
            {" "}
            Welcome to our platform! Before proceeding to become a planner and
            post your events, please carefully read and agree to the following
            terms and conditions. These terms are designed to ensure a smooth
            experience for both planners and attendees, particularly regarding
            event management and payment processing.
          </p>{" "}
          <div>
            <h4 className=" text-xl font-semibold mt-7">
              1. Eligibility to Become a Planner
            </h4>

            <div className=" my-3">
              <p>
                To request to become a planner on our platform, you must meet
                the following requirements:{" "}
                <p className="my-3">1.1. You must be at least 18 years old.</p>
                <p className="my-3">
                  1.2. You must provide a valid phone number registered with
                  either MTN or Vodafone (Telecel).
                </p>{" "}
                <p className="my-3">
                  1.3. The phone number provided must be registered for Mobile
                  Money (MoMo) services to receive payments for paid events.
                </p>
              </p>
            </div>
          </div>
          <div>
            <h4 className=" text-xl font-semibold mt-7">
              2. Phone Number Verification and Updates
            </h4>
            <div>
              <p className=" my-3">
                2.1. During the sign-up process, you are required to enter a
                valid phone number. This phone number must be from MTN or
                Vodafone (Telecel) and must be MoMo-enabled.
              </p>
              <p className=" my-3">
                2.2. If the phone number you initially provided does not meet
                these requirements, please click{" "}
                <Link
                  className=" underline text-blue-500 font-semibold"
                  to="/update-profile"
                >
                  here
                </Link>{" "}
                to update your profile with a valid phone number. The new number
                must also be a MoMo number to ensure you can receive payments
                for any paid events you post.
              </p>
            </div>
          </div>
          <div>
            <h4 className=" text-xl font-semibold mt-7">
              3. Event Posting and Payments
            </h4>
            <div className="my-3">
              <p className="my-3">
                3.1. As a planner, you will have the ability to post events on
                our platform.
              </p>
              <p className="my-3">
                3.2. If you choose to organize paid events, attendees will be
                required to make payments through the MoMo service.
              </p>
              <p className="my-3">
                {" "}
                3.3. It is your responsibility to ensure that your MoMo account
                is active and capable of receiving payments.
              </p>
            </div>
          </div>
          <div>
            <h4 className=" text-xl font-semibold mt-7">
              4. Responsibility and Compliance
            </h4>
            <div className="my-3">
              <p className="my-3">
                4.1. By proceeding to become a planner, you agree to comply with
                all applicable laws and regulations regarding event organization
                and payment processing.{" "}
              </p>
              <p className="my-3">
                4.2. You are responsible for the accuracy of the information you
                provide, including your phone number and MoMo account details.
              </p>{" "}
              <p className="my-3">
                4.3. Any fraudulent activities or misrepresentation of
                information will result in the immediate termination of your
                planner privileges.
              </p>
            </div>
          </div>
          <div>
            <h4 className=" text-xl font-semibold mt-7">
              5. Proceed to Become a Planner
            </h4>
            <div className="my-3">
              <p className="my-3">
                5.1. If you have verified that your phone number is registered
                with MTN or Vodafone (Telecel) and is MoMo-enabled, and you
                agree to comply with all the terms and conditions outlined
                above, you may proceed to become a planner.
              </p>{" "}
              <p className="my-3">
                {" "}
                5.2. By clicking the Proceed button, you acknowledge that you
                have read, understood, and agreed to these terms and conditions.
                If you satisfy all the above requirements, please click the
                button below to proceed.{" "}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-end my-8">
            <button
              onClick={handleClick}
              className=" w-32 bg-[#5870c5] flex flex-row items-center justify-center gap-3 py-2 rounded text-white font-semibold hover:bg-[#9fafe8]"
            >
              Proceed {loading && <ClipLoader size={15} color="#fff" />}
            </button>
          </div>
          <p>
            Thank you for using our platform and we look forward to seeing the
            exciting events you will bring to our community!
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen && isPaymentRequested}
        closeModal={closeModal}
        url={paystack && paystack.authorization_url}
      />
    </div>
  );
}

export default BecomeAPlanner;
