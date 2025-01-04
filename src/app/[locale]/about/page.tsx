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

      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            About Us
          </h1>
        </div>
        {/* <h2 className="w-full font-bold text-4xl md:text-5xl uppercase text-left tracking-wider">
              {t("second-heading")}
            </h2> */}
        <div className="flex flex-col md:flex-row px-4 space-y-20 md:space-y-0 md:gap-x-40">
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

      {/* <section className="max-w-[100rem] mx-auto">
        <div className="my-[15rem] text-2xl md:text-4xl flex items-center justify-center tracking-wide italic mx-auto text-white"></div>
      </section> */}

      {/* Quote Section */}
      <section id="about-staff" className="">
        <div className="my-[6rem] min-h-[30rem] md:min-h-[50rem] max-w-[140rem] mx-auto flex items-start justify-center py-[3rem] md:py-[5rem] px-[1rem] sm:px-[2rem] md:px-[3rem]">
          <div className="w-[100rem] px-4 space-y-2">
            <p className="font-medium text-2xl sm:text-3xl md:text-5xl text-left text-white opacity-70">
              {t("third-paragraph")}
            </p>
            <p className="text-2xl text-white opacity-50">- Richard Branson</p>
          </div>
        </div>
      </section>

      <section className="my-[4rem] max-w-[100rem] mx-auto px-4 space-x-[10rem] flex items-start justify-center">
        <p className="w-1/2 text-white font-light text-2xl leading-[2rem]">
          {t("fourth-paragraph")}
        </p>
        <p className="w-1/2 text-white font-light text-2xl leading-[2rem]">
          {t("fifth-paragraph")}
        </p>
      </section>

      {/* Services */}
      <section className="max-w-[100rem] mx-auto px-4 space-y-4">
        <div className="mt-12 space-y-6">
          <h2 className="w-full font-bold text-3xl md:text-4xl uppercase text-left tracking-wider">
            Services
          </h2>
          <p className="mt-4 font-light text-xl tracking-wider leading-[1.95rem]">
            <span className="font-medium">{ts("corporate.title")}:</span>{" "}
            {ts("corporate.description")}
          </p>
          <p className="mt-4 font-light text-xl tracking-wider leading-[1.95rem]">
            <span className="font-medium">{ts("festivals.title")}:</span>{" "}
            {ts("festivals.description")}
          </p>
          <p className="mt-4 font-light text-xl tracking-wider leading-[1.95rem]">
            <span className="font-medium">{ts("fundraisers.title")}:</span>{" "}
            {ts("fundraisers.description")}
          </p>
          <p className="mt-4 font-light text-xl tracking-wider leading-[1.95rem]">
            <span className="font-medium">{ts("weddings.title")}:</span>{" "}
            {ts("weddings.description")}
          </p>
        </div>
        <Link
          href="/book-now"
          className="mt-14 text-xl mb-20 font-bold navbar-link w-full underline text-center flex items-center justify-center"
        >
          <h2 className="text-center">{t("book-now")}</h2>
        </Link>
      </section>
    </>
  );
}
