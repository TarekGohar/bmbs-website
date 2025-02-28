import Image from "next/image";

export default function LogoScroll() {
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
    // Add more image paths as needed
  ];

  return (
    <div className="flex flex-col justify-center items-center h-[36rem] space-y-2 my-18">
      <h2 className="text-white font-medium text-2xl">Trusted by the best</h2>
      <div className="w-[80vw] h-fit overflow-hidden flex items-center fade-effect">
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
