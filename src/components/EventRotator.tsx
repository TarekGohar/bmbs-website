"use client";

import { useEffect, useState } from "react";

const events = [
  "wedding.",
  "corporate event.",
  "private party.",
  "festival.",
  "fundraiser.",
  "birthday.",
  "anniversary.",
  "holiday party.",
  "graduation.",
  "gala dinner.",
];

const events2 = [
  "corporate event",
  "corporate event",
  "corporate event",
  "corporate event",
];

const EventRotator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white flex flex-col items-start justify-center lg:space-y-4">
      {/* Static Text */}
      <span className="text-4xl lg:text-6xl font-medium h-fit">
        We’ll take care of the drinks for your next
      </span>
      {/* <span className="text-4xl lg:text-6xl font-medium h-fit">graduation</span> */}

      {/* Rotating Words */}
      <div className="relative h-16 flex items-center justify-center overflow-hidden w-full">
        {events.map((event, index) => (
          <div
            key={index}
            className={`absolute -top-[.6rem] left-0 pl-0 w-fit h-16 flex items-center justify-center text-sky-600 text-4xl lg:text-6xl  font-medium transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-y-0"
                : index === (currentIndex - 1 + events.length) % events.length
                ? "opacity-0 -translate-y-full"
                : "opacity-0 translate-y-full"
            }`}
          >
            {event}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventRotator;
