"use client";

import Navbar from "@/components/navbar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function About() {
  const t = useTranslations("About");
  const ts = useTranslations("Services");

  return (
    <>
      {/* <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div> */}
      <Navbar />

      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            About Us
          </h1>
        </div>
        {/* <h2 className="w-full font-bold text-4xl md:text-5xl uppercase text-left tracking-wider">
              {t("second-heading")}
            </h2> */}
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[100rem] text-white mx-auto md:mb-[12rem]">
        <div className="flex flex-col md:flex-row px-4 space-y-20 md:space-y-0 md:gap-x-28">
          <p className="md:w-[60%] text-4xl font-medium md:text-5xl md:leading-[3rem]">
            Brahm Mauer and his team firmly believe that with the right blend of{" "}
            <span className="text-sky-600">talent</span>,{" "}
            <span className="text-sky-600">passion</span>, and{" "}
            <span className="text-sky-600">support</span>, anything is possible.
            More than just a bar service, we embody the true essence of
            hospitality.
          </p>

          <p className="md:w-[40%] font-light text-2xl leading-[2rem]">
            Based in Montreal, we specialize in providing top-tier bartending
            services for a wide range of events. Whether you're hosting a
            corporate gathering, a wedding, a private party, a fundraiser, or a
            festival, our team is dedicated to creating unforgettable
            experiences tailored to your needs.
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
            {t("third-paragraph")}
            <span className="text-lg md:text-3xl text-white opacity-50">
              - Richard Branson
            </span>
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="my-[10rem] px-4 max-w-[100rem] mx-auto space-y-[10rem] md:space-y-[16rem] md:space-x-[4rem] lg:space-x-[5rem] flex flex-col md:flex-row items-start justify-start">
        <div className="md:w-1/2 flex flex-col text-white font-light text-2xl space-y-[2rem]">
          <h2 className="text-sky-600 text-5xl font-medium">
            The Special Ingredient
          </h2>
          <p className="font-light">
            Our service staff are the heart of our business and the face of our
            brand. Passionate and highly trained, they consistently ensure
            everyone has an exceptional experience. Unlike competitors who rely
            on agency staff, leading to inconsistency, BMBS boasts a loyal,
            cohesive team and one of the lowest turnover rates in the industry —
            giving us a distinct edge.
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col text-white font-light text-2xl space-y-[2rem]">
          <h2 className="text-sky-600 text-5xl font-medium">
            Our Mixology Program
          </h2>
          <p className="font-light">{t("fifth-paragraph")}</p>
        </div>
      </section>

      {/* Services */}
      <section className="my-[10rem] h-fit">
        <h2 className="text-white text-5xl font-medium max-w-[100rem] mx-auto px-4">
          Our Services
        </h2>
        <div className="flex space-x-2 max-w-[100rem] mx-auto px-4 mt-10 overflow-x-auto">
          <Link
            href="/services/corporate"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer"
          >
            <Image
              src="/images/corporate/patron-1.jpg"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Corporate
            </h2>
          </Link>
          <Link
            href="/services/festivals"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer grayscale"
          >
            <Image
              src="/images/festivals/festivals-3.jpg"
              alt="festivals"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(65%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Festivals
            </h2>
          </Link>

          <Link
            href="/services/fundraisers"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer grayscale"
          >
            <Image
              src="/images/fundraisers/fundraisers-1.png"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(70%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Fundraisers
            </h2>
          </Link>

          <Link
            href="/services/weddings"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer grayscale"
          >
            <Image
              src="/images/weddings/weddings.jpg"
              alt="wedding event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Weddings
            </h2>
          </Link>
        </div>
      </section>
    </>
  );
}
