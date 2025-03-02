import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface ServiceProps {
  serviceTitle: string;
  imageMetadata: {
    src: string; // The path to the image
    width: number; // The width of the image in pixels
    height: number; // The height of the image in pixels
    isHorizontal: boolean; // Indicates whether the image is in horizontal orientation
  }[];
}

const cloudflareImageUrl = (src: string, width: number, height: number) =>
  `${src}?width=${width}&height=${height}&format=auto&quality=70`;

export default async function ServicePage({
  serviceTitle,
  imageMetadata,
}: ServiceProps) {
  const t = await getTranslations(`Services.${serviceTitle}`);
  const ts = await getTranslations("Hero");
  const images = imageMetadata;

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-end justify-start h-[14.5rem] md:h-[15rem]">
          <h1 className="text-5xl md:text-7xl font-semibold uppercase">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[100rem] text-neutral-200 mx-auto mt-[5rem] mb-[7rem]">
        <div className="flex flex-col md:flex-row px-4 ">
          <p className="md:w-[70%] text-2xl font-medium md:text-4xl md:leading-[2.5rem]">
            {t("description")}
          </p>

          {/* <p className="md:w-[40%] font-light text-2xl leading-[2rem]">
            {t("long-description")}
          </p> */}
        </div>
      </section>

      {/* Images */}
      <section className="mb-16 mx-auto py-0 px-2 md:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-2">
          {images.map(({ src, width, height, isHorizontal }, index) => (
            <Image
              key={index}
              src={cloudflareImageUrl(
                src,
                isHorizontal ? height * 0.1 : 600,
                isHorizontal ? width * 0.1 : 1000
              )}
              alt={`${serviceTitle} ${index + 1}`}
              width={isHorizontal ? width * 0.1 : 600} // Adjust width for better grid layout
              height={isHorizontal ? height * 0.1 : 1000} // Adjust height for better grid layout
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Adaptive sizes
              quality={75}
              // loading={index > 3 ? "lazy" : "eager"}
              className={`object-cover h-full w-full ${
                isHorizontal ? "col-span-1 md:col-span-2" : "col-span-1"
              }`}
              priority={index < 3} // Preload the first few images
            />
          ))}
        </div>
      </section>

      <section>
        <div className="h-[30rem] w-full flex flex-col items-center justify-center space-y-2 text-2xl tracking-wide">
          <h2 className="text-white ">{ts("book-now-subheading")}</h2>
          <Link
            aria-label="Book Now"
            href="/book-now?mila"
            className="text-white w-fit font-semibold"
          >
            {ts("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
