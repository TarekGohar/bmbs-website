import Navbar from "@/components/navbar";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import sizeOf from "image-size";

interface ServiceProps {
  serviceTitle: string;
}

const sizeOfAsync = promisify(sizeOf);

export default async function ServicePage({ serviceTitle }: ServiceProps) {
  const t = await getTranslations(`Services.${serviceTitle}`);
  const ts = await getTranslations("Hero");
  const images = await fetchImages();

  async function fetchImages() {
    const imagesDir = path.join(process.cwd(), `public/images/${serviceTitle}`);
    const files = fs
      .readdirSync(imagesDir)
      .filter((file) => /\.(png|jpe?g|gif|webp)$/.test(file));

    const metadata = await Promise.all(
      files.map(async (file) => {
        const dimensions = await sizeOfAsync(path.join(imagesDir, file));
        if (!dimensions) {
          throw new Error(`Could not get dimensions for image: ${file}`);
        }
        return {
          src: `/images/${serviceTitle}/${file}`,
          width: dimensions.width!,
          height: dimensions.height!,
          isHorizontal: dimensions.width! > dimensions.height!,
        };
      })
    );

    return metadata;
  }

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            {t("title")}
          </h1>
        </div>
        {/* <h2 className="w-full font-bold text-4xl md:text-5xl uppercase text-left tracking-wider">
              {t("second-heading")}
            </h2> */}
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[100rem] text-white mx-auto mb-[12rem]">
        <div className="flex flex-col md:flex-row px-4 space-y-20 md:space-y-0 md:gap-x-28">
          <p className="md:w-[60%] text-4xl font-medium md:text-5xl md:leading-[3rem]">
            Raise a glass to love with our custom-crafted cocktails!
          </p>

          <p className="md:w-[40%] font-light text-2xl leading-[2rem]">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Mila Images */}
      <section className="mb-16 mx-auto py-0 px-2 md:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-2">
          {images.map(({ src, width, height, isHorizontal }, index) => (
            <Image
              key={index}
              src={src}
              alt={`${serviceTitle} ${index + 1}`}
              width={isHorizontal ? width : 400} // Adjust width for better grid layout
              height={isHorizontal ? height : 800} // Adjust height for better grid layout
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
          <p className="text-white ">{ts("book-now-subheading")}</p>
          <Link
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
