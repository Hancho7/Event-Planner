// import React from "react";
import { useEffect } from "react";
import event1b from "../assets/event1b.jpg";
// import "animate.css";
import Aos from "aos";

function Steps() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F3F4F6] px-2 md:px-4">
      <h1 className="mb-6 font-bold text-xl md:text-2xl font-sans">How To Use This Website</h1>
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="w-full md:w-[50%] flex items-center justify-center">
          <img src={event1b} alt="benefits" className="w-full md:w-[60%] rounded-lg"/>
        </div>
        <div className="flex flex-col gap-3 text-white w-full md:w-[50%]">
          <section className="bg-[#1F2937] p-4 rounded-md font-sans" data-aos="fade-up">
            <h3 className=" font-semibold" >1. Create an Account</h3>
            <p>
              You will be required to create an account on this site by
              providing some information that identifies you as a user or
              planner.
            </p>
          </section>
          <section className="bg-[#1F2937] p-4 rounded-md" data-aos="fade-up">
            <h3 className=" font-semibold"> 2. Log in to Book for Event</h3>
            <p>
              You can log in with your Email and the password you have created
              and verify via SMS or Email to make an event reservation for the
              Event by selecting the Event Type of your Choice.
            </p>
          </section>
          <section className="bg-[#1F2937] p-4 mb-6 rounded-md" data-aos="fade-up">
            <h3 className=" font-semibold">3. Log in at any time to retrieve booking information.</h3>
            <p>
              You can always log in to view confirmation of your booking,
              payment status, event allocation and many more.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Steps;

