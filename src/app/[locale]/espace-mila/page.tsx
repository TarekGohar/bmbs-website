import { getTranslations, setRequestLocale } from "next-intl/server";
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

export default async function EspaceMila({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Mila");
  const ts = await getTranslations("Hero");
  const images = milaMetadata;

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[120rem] mx-auto">
        <div className="px-4 flex items-end justify-start h-[14.5rem] md:h-[15rem]">
          <h1 className="text-5xl md:text-7xl font-semibold uppercase">
            Espace Mila
          </h1>
        </div>
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[120rem] text-white mx-auto my-[6rem]">
        <div className="flex flex-col md:flex-col px-4 space-y-10 md:gap-x-28">
          <p className="md:w-[100%] text-2xl font-medium md:text-4xl md:leading-[2.5rem]">
            {t("first-paragraph")}
          </p>

          <div className="flex flex-col md:flex-row gap-y-[2.5rem] md:gap-y-0 md:gap-x-[10rem]">
            <p className="w-[100%] font-light md:text-xl md:leading-[2rem]">
              {t("description-1")}
            </p>
            <p className="w-[100%] font-light md:text-xl md:leading-[2rem]">
              {t("description-2")}
            </p>
          </div>
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
          <h2 className="text-white ">{ts("book-now-subheading")}</h2>
          <Link
            aria-label="Book Now"
            href="/book-now?service=mila"
            className="text-white w-fit font-semibold">
            {ts("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
