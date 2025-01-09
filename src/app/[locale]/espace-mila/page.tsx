import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import milaMetadata from "./metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("mila-title")}`,
    description: t("mila-description"),
  };
}

export default async function EspaceMila() {
  const t = await getTranslations("Mila");
  const ts = await getTranslations("Hero");
  const images = milaMetadata;

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            Espace Mila
          </h1>
        </div>
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[100rem] text-white mx-auto md:mb-[12rem]">
        <div className="flex flex-col md:flex-row px-4 space-y-20 md:space-y-0 md:gap-x-28">
          <p className="md:w-[60%] text-4xl font-medium md:text-5xl md:leading-[3rem]">
            {t("first-paragraph")}
          </p>

          <p className="md:w-[40%] font-light text-2xl leading-[2rem]">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Mila Images */}
      <section className="mt-28 mx-auto py-0 px-2 md:px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-2">
          {images.map(({ src, width, height, isHorizontal }, index) => (
            <Image
              key={index}
              src={src}
              alt={`Bariloche Image ${index + 1}`}
              width={isHorizontal ? width : 1000} // Adjust width for better grid layout
              height={isHorizontal ? height : 2000} // Adjust height for better grid layout
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
