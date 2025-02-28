import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("about-title"),
    description: t("about-description"),
  };
}

export default async function About() {
  const t = await getTranslations("About");
  const ts = await getTranslations("Services");

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[100rem] text-white mx-auto md:mb-[12rem]">
        <div className="flex flex-col md:flex-row px-4 space-y-20 md:space-y-0 md:gap-x-28">
          <p className="md:w-[60%] text-4xl font-medium md:text-5xl md:leading-[3rem]">
            {t("first-sentence")}{" "}
            <span className="text-neutral-600">talent</span>,{" "}
            <span className="text-neutral-600">passion</span>, {t("and")}{" "}
            <span className="text-neutral-600">{t("support")}</span>
            {t("second-sentence")}
          </p>

          <p className="md:w-[40%] font-light text-2xl leading-8">
            {t("first-paragraph")}
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section
        id="about-staff"
        className="my-[6rem] min-h-[30rem] md:min-h-[50rem] max-w-[140rem] mx-auto flex items-start justify-center py-[1.5rem] md:py-[5rem] px-[1rem] sm:px-[2rem] md:px-[3rem]"
      >
        <div className="w-[100rem] px-4 space-y-2">
          <p className="font-medium text-2xl sm:text-3xl md:text-5xl text-left text-white opacity-70">
            {t("second-paragraph")}
            <span className="text-lg md:text-3xl text-white opacity-50">
              - Richard Branson
            </span>
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="my-[10rem] px-4 max-w-[100rem] mx-auto space-y-[10rem] md:space-y-[16rem] md:space-x-[4rem] lg:space-x-[5rem] flex flex-col md:flex-row items-start justify-start">
        <div className="md:w-1/2 flex flex-col text-white  space-y-[2rem]">
          <h2 className="text-white text-5xl font-medium">
            The Special Ingredient
          </h2>
          <p className="md:leading-8 font-light text-2xl">
            {t("third-paragraph")}
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col text-white space-y-[2rem]">
          <h2 className="text-white text-5xl font-medium">
            Our Mixology Program
          </h2>
          <p className="md:leading-8 font-light text-xl">
            {t("fourth-paragraph")}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className=" mb-20 h-fit">
        <h2 className="text-white text-5xl font-medium max-w-[100rem] mx-auto px-4">
          Our Services
        </h2>
        <div className="flex space-x-2 max-w-[100rem] mx-auto px-4 mt-10 overflow-x-auto no-scrollbar">
          <Link
            href="/services/corporate"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer"
          >
            <Image
              src="/images/corporate/BrahmxAmexHouse-11.webp"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover "
              style={{ filter: "brightness(85%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Corporate
            </h2>
          </Link>
          <Link
            href="/services/festivals"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer"
          >
            <Image
              src="/images/festivals/festivals-3.webp"
              alt="festivals"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(70%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Festivals
            </h2>
          </Link>

          <Link
            href="/services/fundraisers"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer"
          >
            <Image
              src="/images/fundraisers/fundraisers-1.webp"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Fundraisers
            </h2>
          </Link>

          <Link
            href="/services/private"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer"
          >
            <Image
              src="/images/private/private-0.webp"
              alt="private event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Private
            </h2>
          </Link>
        </div>
      </section>
    </>
  );
}
