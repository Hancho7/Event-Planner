import { useState, useEffect } from "react";

const Notification = ({ children, onDismiss }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress === 100) {
        setIsVisible(false);
        onDismiss();
        clearInterval(timer);
      } else {
        setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
      }
    }, 10); // Adjust interval for progress speed (milliseconds)

    return () => clearInterval(timer);
  }, [progress, onDismiss]);

  return (
    isVisible && (
      <div
        className="
          fixed top-20 right-0 md:right-4 lg:right-8
          z-50
          w-64 md:w-80 lg:w-96
          p-2 md:p-4 lg:p-4
          bg-white
          shadow-md
          rounded
          notification
        "
      >
        {children}
        <div className="progress-bar h-1 bg-gray-200 rounded">
          <div
            style={{ width: `${progress}%` }}
            className="bg-[#1F2937] h-1 rounded"
          ></div>
        </div>
      </div>
    )
  );
};

export default Notification;
