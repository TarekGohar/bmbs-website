"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const [visibleWords, setVisibleWords] = useState({
    weddings: false,
    events: false,
    festivals: false,
  });

  const services = [
    { name: "Weddings", image: "/images/weddings.jpg" },
    { name: "Events", image: "/images/events.png" },
    { name: "Festivals", image: "/images/festivals-2.png" },
  ];

  const wordContainerRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        // Trigger each word appearance with staggered delays
        setTimeout(
          () => setVisibleWords((prev) => ({ ...prev, events: true })),
          500
        );
        setTimeout(
          () => setVisibleWords((prev) => ({ ...prev, festivals: true })),
          1000
        );
        setTimeout(
          () => setVisibleWords((prev) => ({ ...prev, weddings: true })),
          1500
        );

        // Disconnect observer after the animation starts
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust the threshold as needed
    });

    if (wordContainerRef.current) {
      observer.observe(wordContainerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center my-32">
      <h2 className="w-full text-white font-okine font-light text-3xl">
        Our services:
      </h2>

      <div
        ref={wordContainerRef}
        className="text-center flex justify-center font-made items-center gap-x-10 text-4xl h-[50vh] tracking-widest px-4"
      >
        {/* Events */}
        <Link
          href="/services/corporate"
          className={`word font-bold text-white group relative ${
            visibleWords.events ? "show" : ""
          }`}
        >
          <Image
            src={"/images/events-1.jpg"}
            alt="events"
            width={1000}
            height={1000}
            className="group-hover:grayscale transition duration-100"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 opacity-1000 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <span className="text-white text-4xl font-okine font-normal opacity-0 transition group-hover:opacity-100 duration-150">
              Corporate
            </span>
          </div>
        </Link>

        {/* Festivals */}
        <Link
          href="/services/festivals"
          className={`word font-bold text-white group relative ${
            visibleWords.festivals ? "show" : ""
          }`}
        >
          <Image
            src={"/images/festivals-2.jpg"}
            alt="festivals"
            width={1000}
            height={1000}
            className="group-hover:grayscale transition duration-100"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 opacity-1000 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <span className="text-white text-4xl font-okine font-normal opacity-0 transition group-hover:opacity-100 duration-150">
              Festivals
            </span>
          </div>
        </Link>

        {/* Weddings */}
        <Link
          href="/services/weddings"
          className={`word font-bold text-white group relative overflow-hidden rounded-sm ${
            visibleWords.weddings ? "show" : ""
          }`}
        >
          <Image
            src={"/images/weddings.jpg"}
            alt="weddings"
            width={1000}
            height={1000}
            className="group-hover:grayscale group-hover: transition ease-in group-hover:shadow-inner duration-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 opacity-100 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <span className="text-white text-4xl font-okine font-normal opacity-0 transition group-hover:opacity-100 duration-150">
              Weddings
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
