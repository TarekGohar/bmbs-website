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
    <div className="flex justify-center h-[36rem]">
      <div className="w-[80vw] overflow-hidden flex items-center fade-effect">
        <div className="flex items-center animate-infinite-scroll">
          <ul className="flex items-center">
            {images.map((src, index) => (
              <li
                key={index}
                className="min-w-60 flex justify-center items-center mr-20 md:mr-44 lg:mr-64"
              >
                <Image
                  src={src}
                  width={200} // Adjust width and height for better responsiveness
                  height={200}
                  alt={`Scrolling Image ${index + 1}`}
                  className=""
                  priority={true}
                  loading="eager"
                />
              </li>
            ))}
          </ul>
          <ul className="flex items-center">
            {images.map((src, index) => (
              <li
                key={index}
                className="min-w-60 flex justify-center items-center mr-20 md:mr-44 lg:mr-64"
                aria-hidden="true"
              >
                <Image
                  src={src}
                  width={200} // Adjust width and height for better responsiveness
                  height={200}
                  alt={`Scrolling Image ${index + 1}`}
                  className="object-cover"
                  priority={true}
                  loading="eager"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
