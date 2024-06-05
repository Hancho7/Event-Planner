import { useState } from "react";

const Review = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sectionStyles = {
    introduction: "bg-blue-600",
    overview: "bg-[#f97316]",
    methodology: "bg-[#22c55e]",
    feedback: "bg-[#fcd34d]",
    detailedFeedback: "bg-[#f43f5e]",
    analysis: "bg-[#4c51bf]",
    recommendations: "bg-[#22c55e]",
    conclusion: "bg-[#f43f5e]",
    references: "bg-[#fcd34d]",
    appendices: "bg-[#4c51bf]",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Event Feedback</h1>

      {/* Introduction */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.introduction}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-white"
          onClick={() => toggleSection("introduction")}
        >
          Introduction
        </h2>
        {activeSection === "introduction" && (
          <p className="pl-4 text-white">
            This section provides an overview of the user feedback collected
            after the event...
          </p>
        )}
      </section>

      {/* Event Overview */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.overview}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-black"
          onClick={() => toggleSection("overview")}
        >
          Event Overview
        </h2>
        {activeSection === "overview" && (
          <p className="pl-4 text-black">
            Briefly describe the event, including the date, location, and main
            activities...
          </p>
        )}
      </section>

      {/* Feedback Collection Methodology */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.methodology}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-black"
          onClick={() => toggleSection("methodology")}
        >
          Feedback Collection Methodology
        </h2>
        {activeSection === "methodology" && (
          <p className="pl-4 text-black">
            Describe how the feedback was collected, such as through surveys,
            interviews, or feedback forms...
          </p>
        )}
      </section>

      {/* Key Feedback Points */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.feedback}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-black"
          onClick={() => toggleSection("feedback")}
        >
          Key Feedback Points
        </h2>
        {activeSection === "feedback" && (
          <ul className="list-disc pl-8 text-black">
            <li>Positive feedback highlights</li>
            <li>Areas for improvement</li>
            {/* Add more feedback points as needed */}
          </ul>
        )}
      </section>

      {/* Detailed User Feedback */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.detailedFeedback}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-white"
          onClick={() => toggleSection("detailedFeedback")}
        >
          Detailed User Feedback
        </h2>
        {activeSection === "detailedFeedback" && (
          <p className="pl-4 text-white">
            Include quotes or detailed feedback from attendees...
          </p>
        )}
      </section>

      {/* Feedback Analysis */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.analysis}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-white"
          onClick={() => toggleSection("analysis")}
        >
          Feedback Analysis
        </h2>
        {activeSection === "analysis" && (
          <p className="pl-4 text-white">
            Analyze and interpret the feedback received...
          </p>
        )}
      </section>

      {/* Actionable Recommendations */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.recommendations}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-black"
          onClick={() => toggleSection("recommendations")}
        >
          Actionable Recommendations
        </h2>
        {activeSection === "recommendations" && (
          <p className="pl-4 text-black">
            Based on the feedback, provide recommendations for future events...
          </p>
        )}
      </section>

      {/* Conclusion */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.conclusion}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-white"
          onClick={() => toggleSection("conclusion")}
        >
          Conclusion
        </h2>
        {activeSection === "conclusion" && (
          <p className="pl-4 text-white">
            Summarize the key points of the feedback and the overall
            sentiment...
          </p>
        )}
      </section>

      {/* References */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.references}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-black"
          onClick={() => toggleSection("references")}
        >
          References
        </h2>
        {activeSection === "references" && (
          <p className="pl-4 text-black">
            List any sources or references used...
          </p>
        )}
      </section>

      {/* Appendices */}
      <section
        className={`mb-6 p-4 rounded-lg shadow-md ${sectionStyles.appendices}`}
      >
        <h2
          className="text-2xl font-semibold mb-2 cursor-pointer text-white"
          onClick={() => toggleSection("appendices")}
        >
          Appendices
        </h2>
        {activeSection === "appendices" && (
          <p className="pl-4 text-white">
            Include any supplementary information or data...
          </p>
        )}
      </section>
    </div>
  );
};

export default Review;
