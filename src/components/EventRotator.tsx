"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

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
  }, [events.length]);

  return (
    <div className="text-white flex flex-col items-start justify-center lg:space-y-2">
      {/* Static Text */}
      <h2 className="text-4xl lg:text-6xl font-medium h-fit">{t("title")}</h2>

      {/* Rotating Words */}
      <div className="relative h-[3rem] md:h-[4.5rem] flex items-center overflow-hidden w-full">
        <AnimatePresence mode="sync">
          <motion.span
            key={currentIndex}
            className="absolute left-0 pl-0 text-sky-600 text-4xl lg:text-6xl font-medium"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            {events[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
