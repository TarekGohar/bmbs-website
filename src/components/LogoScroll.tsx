// components/HorizontalScroll.js
import Image from "next/image";

export default function LogoScroll() {
  const images = [
    "/images/logos/k4k.png",
    "/images/logos/maxim.png",
    "/images/logos/f1.png",
    "/images/logos/igloofest.png",
    "/images/logos/osheaga.png",
    "/images/logos/patron.png",
    "/images/logos/picnik.png",
    "/images/logos/ilesoniq.png",
    "/images/logos/evenko.png",
    // Add more image paths as needed
  ];

  return (
    <div className="flex justify-center">
      <div className="w-[80vw] overflow-hidden">
        <ul className="flex items-center animate-infinite-scrol g">
          {[...images, ...images].map((src, index) => (
            <li
              key={index}
              className="min-w-72 bg-red-500 flex justify-center items-center"
            >
              <Image
                src={src}
                width={1000}
                height={1000}
                alt={`Scrolling Image ${index + 1}`}
                className=""
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
