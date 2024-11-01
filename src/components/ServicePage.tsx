"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ServiceProps {
  serviceImages: string[];
  serviceTitle: string;
  serviceBefore: string;
  serviceAfter: string;
}

export default function ServicePage({
  serviceImages,
  serviceTitle,
  serviceBefore,
  serviceAfter,
}: ServiceProps) {
  const t = useTranslations("Services");

  const images = serviceImages;

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
              rgba(0, 0, 0, 0.7) 20%,
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0.7) 80%,
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
              rgba(0, 0, 0, 0.7) 20%,
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0.7) 80%,
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

      <div className="grid grid-rows-3 h-screen text-white items-center">
        <div aria-hidden={true} className="opacity-0">
          Spacing cell
        </div>

        <div className="w-screen flex items-center justify-between">
          {/* Left Arrow */}
          <Link
            href={`/services/${serviceBefore}`}
            className="hidden lg:flex items-center group outline-none transition-opacity duration-300 ml-2"
          >
            <svg
              fill="currentColor"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330.002 330.002"
              className="fill-white opacity-20 group-hover:opacity-80 w-12 h-12 transition-all duration-300"
              style={{ transform: "rotate(180deg)", scale: 1 }}
            >
              <path
                d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
        l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
        c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
              />
            </svg>
            <h3 className="opacity-0 group-hover:opacity-80 text-white transition-opacity duration-300">
              {t(`${serviceBefore}.title`)}
            </h3>
          </Link>

          <div className=" flex-col flex items-center justify-center px-6 lg:px-24 space-y-2">
            <h1 className="text-3xl md:text-5xl font-okine font-medium text-left text-white uppercase leading-none tracking-widest">
              {t(`${serviceTitle}.title`)}
            </h1>
            <h1 className="py-4 text-white text-xl md:text-2xl font-okine font-normal text-left max-w-[100rem] md:leading-[3.5rem] tracking-normal">
              {t(`${serviceTitle}.long-description`)}
            </h1>
            <Link
              href={"/book-now"}
              className="pt-8 text-white text-lg md:text-xl hover:text-neutral-400 focus:text-neutral-500 ease-in duration-150 tracking-[.125rem] border-b-[1px] hover:border-neutral-400"
            >
              {useTranslations("Hero")("book-now")}
            </Link>
          </div>

          {/* Right Arrow */}
          <Link
            href={`/services/${serviceAfter}`}
            className=" items-center group outline-none transition-opacity duration-300 hidden lg:flex mr-2"
          >
            <h3 className="opacity-0 group-hover:opacity-80 text-white transition-opacity duration-300">
              {t(`${serviceAfter}.title`)}
            </h3>
            <svg
              fill="currentColor"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330.002 330.002"
              className="fill-white opacity-20 group-hover:opacity-80 w-12 h-12 transition-all duration-300"
              style={{ scale: 1 }}
            >
              <path
                d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
        l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
        c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
              />
            </svg>
          </Link>
        </div>
        <div className="mb-32 flex justify-between items-end h-full">
          {/* Left Arrow */}
          <Link
            href={`/services/${serviceBefore}"}`}
            className="flex lg:hidden items-center group outline-none transition-opacity duration-300"
          >
            <svg
              fill="currentColor"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330.002 330.002"
              className="fill-white opacity-20 group-hover:opacity-80 w-8 h-8 transition-all duration-300"
              style={{ transform: "rotate(180deg)", scale: 1 }}
            >
              <path
                d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
        l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
        c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
              />
            </svg>
            <h3 className="opacity-20 group-hover:opacity-80 text-white transition-opacity duration-300 ml-2">
              {t(`${serviceBefore}.title`)}
            </h3>
          </Link>
          {/* Right Arrow */}
          <Link
            href={`/services/${serviceAfter}`}
            className="flex lg:hidden items-center group outline-none transition-opacity duration-300"
          >
            <h3 className="opacity-20 group-hover:opacity-80 text-white transition-opacity duration-300 ml-2">
              {t(`${serviceAfter}.title`)}
            </h3>
            <svg
              fill="currentColor"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330.002 330.002"
              className="fill-white opacity-20 group-hover:opacity-80 w-8 h-8 transition-all duration-300"
              style={{ scale: 1 }}
            >
              <path
                d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21
        l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001
        c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
