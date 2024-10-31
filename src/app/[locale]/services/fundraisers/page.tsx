"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Corporate() {
  const t = useTranslations("Services");

  const images = [
    "/images/festivals-1.jpg",
    "/images/festivals-2.jpg",
    "/images/festivals-3.jpg",
    "/images/festivals-4.jpg",
    "/images/festivals-5.jpg",
    "/images/festivals-6.jpg",
    "/images/festivals-7.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0); // Initially the same as current
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true); // Start fading out current image

      // After fade-out completes, update the current image
      setTimeout(() => {
        setPrevIndex(currentImageIndex); // Update prevIndex to the last image
        setCurrentImageIndex((prev) => (prev + 1) % images.length); // Move to next image
        setIsFading(false); // Begin fade-in of new current image
      }, 1000); // Fade-out duration

      setPrevIndex(currentImageIndex); // Set the under image to the current image
    }, 5000); // Switch images every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentImageIndex, images.length]);

  return (
    <section className="min-h-screen max-h-screen md:max-h-none relative flex flex-col items-center justify-center overflow-hidden">
      {/* TODO: Lower image res for faster loading */}
      {/* Background */}
      <div className="-z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.6) 20%,
              rgba(0, 0, 0, 0.5) 50%,
              rgba(0, 0, 0, 0.6) 80%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${images[prevIndex]})
          `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Current Image */}
        <div
          className={`absolute inset-0 ${
            isFading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-1000"
          }`}
          style={{
            backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.6) 20%,
              rgba(0, 0, 0, 0.5) 50%,
              rgba(0, 0, 0, 0.6) 80%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${images[currentImageIndex]})
          `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <div className="flex-col flex-grow w-full h-full flex items-center justify-center px-4 space-y-2">
        <h1 className="text-3xl md:text-5xl font-okine font-medium text-left text-white uppercase md:mx-0 leading-none tracking-widest">
          {t("corporate.title")}
        </h1>
        <h1 className="py-4 px-12 md:px-44 text-white text-xl md:text-3xl font-okine font-light text-left w-screen max-w-[100rem] md:mx-0 md:leading-[3.5rem] tracking-normal">
          {t("corporate.long-description")}
        </h1>
        <Link
          href={"/book-now"}
          className="pt-8 text-white text-lg md:text-xl hover:text-neutral-400 focus:text-neutral-500 ease-in duration-150 tracking-[.125rem] border-b-[1px] hover:border-neutral-400"
        >
          {useTranslations("Hero")("book-now")}
        </Link>
      </div>
    </section>
  );
}
