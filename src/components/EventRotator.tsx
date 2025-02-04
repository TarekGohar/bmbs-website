"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function EventRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("Hero.rotator");

  const events = [
    t("wedding"),
    t("corporate"),
    t("private"),
    t("festival"),
    t("fundraiser"),
    t("birthday"),
    t("anniversary"),
    t("holiday"),
    t("graduation"),
    t("gala dinner"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white flex flex-col items-start justify-center lg:space-y-4">
      {/* Static Text */}
      <h2 className="text-4xl lg:text-6xl font-medium h-fit">{t("title")}</h2>

      {/* Rotating Words */}
      <div className="relative h-16 flex items-center justify-center overflow-hidden w-full">
        {events.map((event, index) => (
          <span
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
          </span>
        ))}
      </div>
    </div>
  );
}
