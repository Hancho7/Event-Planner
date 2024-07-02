// import React from "react";
import { useEffect } from "react";
import event1b from "../assets/event1b.jpg";
import "animate.css";
import Aos from "aos";


function Steps() {
    useEffect(() => {
      Aos.init({ duration: 1000 });
    }, []);
  return (
    <section className="relative py-12 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <div className="benefits-thumb">
              <img
                src={event1b}
                alt="benefits"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="benefits-content">
              <div className="benefits-title mb-6">
                <h3 className="text-3xl font-bold text-gray-800">
                  How to Use this Website
                </h3>
              </div>
              <div className="faq-accordion space-y-6">
                <div className="accrodion active animate__animated animate__fadeInRight">
                  <div
                    className="accrodion-inner bg-gray-600 p-4 rounded-lg shadow-lg"
                    data-aos="fade-left"
                  >
                    <div className="accrodion-title">
                      <h4 className="text-xl font-semibold text-white">
                        1. Create an Account
                      </h4>
                    </div>
                    <div className="accrodion-content mt-2">
                      <p className="text-white">
                        You will be required to create an account on this site
                        by providing some information that identifies you as a
                        user or planner.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accrodion animate__animated animate__fadeInRight"
                  data-aos="fade-left"
                  style={{ animationDelay: "300ms" }}
                >
                  <div
                    className="accrodion-inner bg-gray-600 p-4 rounded-lg shadow-lg"
                    data-aos="fade-left"
                  >
                    <div className="accrodion-title">
                      <h4 className="text-xl font-semibold text-white">
                        2. Log in to Book for Event
                      </h4>
                    </div>
                    <div className="accrodion-content mt-2">
                      <p className="text-white">
                        You can log in with your Email and the password you have
                        created and verify via SMS or Email to make an event
                        reservation for the Event by selecting the Event Type of
                        your Choice.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="accrodion animate__animated animate__fadeInRight"
                  style={{ animationDelay: "600ms" }}
                >
                  <div
                    className="accrodion-inner bg-gray-600 p-4 rounded-lg shadow-lg"
                    data-aos="fade-left"
                  >
                    <div className="accrodion-title">
                      <h4 className="text-xl font-semibold text-white">
                        3. Log in at any time to retrieve booking information.
                      </h4>
                    </div>
                    <div className="accrodion-content mt-2">
                      <p className="text-white">
                        You can always log in to view confirmation of your
                        booking, payment status, event allocation and many more.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
