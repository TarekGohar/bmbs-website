"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function LogoScroll() {
  const t = useTranslations("Hero");
  const images = [
    "/images/logos/k4k.webp",
    "/images/logos/maxim.webp",
    "/images/logos/f1.webp",
    "/images/logos/igloofest.webp",
    "/images/logos/osheaga.webp",
    "/images/logos/patron.webp",
    "/images/logos/picnik.webp",
    "/images/logos/ilesoniq.webp",
    "/images/logos/evenko.webp",
    "/images/logos/cedar.webp",
    "/images/logos/greygoose.webp",
    "/images/logos/saint-mary.webp",
    "/images/logos/jewish.webp",
  ];

  // Assign each grid cell a unique subset of 2-3 images
  const imageSubsets = [
    [images[0], images[1]],
    [images[2], images[3]],
    [images[4], images[5]],
    [images[6], images[7]],
    [images[8], images[9]],
    [images[10], images[11], images[12]], // Last subset has three images
  ];

  const [indices, setIndices] = useState(Array(6).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      indices.forEach((_, i) => {
        setTimeout(() => {
          setIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            newIndices[i] = (newIndices[i] + 1) % imageSubsets[i].length;
            return newIndices;
          });
        }, i * 300); // Delay each grid spot by 500ms for the staggered effect
      });
    }, 4000); // Base interval of 6000ms

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-white font-medium text-xl md:text-3xl text-center uppercase">
        {t("trusted")}
      </h2>
      <div className="flex justify-center">
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-16 xxs:gap-x-20 md:gap-x- lg:gap-x-40 gap-y-4 h-fit items-center">
          {indices.map((index, i) => (
            <div
              key={`${index}-${i}`} // Dynamic key to retrigger animation
              className="w-32 h-32 md:w-48 md:h-48 fade-up flex items-center justify-center overflow-hidden"
            >
              <img
                src={imageSubsets[i][index]}
                alt={`Logo ${i}`}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
