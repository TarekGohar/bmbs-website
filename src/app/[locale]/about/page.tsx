"use client";

import Image from "next/image";
import Footer from "@/components/footer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";

export default function About() {
  const t = useTranslations("About");
  const ts = useTranslations("Services");

  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    const logoTimeout = setTimeout(() => {
      setIsLogoVisible(true);
    }, 1000);

    return () => clearTimeout(logoTimeout);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="about-hero"
        className="flex items-center justify-center h-screen w-screen bg-transition"
        style={{
          backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.6) 20%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.6) 80%,
        rgba(0, 0, 0, 1) 100%
      ),
      url('/images/mila-1.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image
          src={"/images/Brahm.svg"}
          width={1450}
          height={1450}
          alt="Brahm Logo"
          className={`transition-opacity ease-in duration-1500 ${
            isLogoVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-[48rem] mx-auto flex flex-col items-start justify-center text-white px-4 gap-y-8"
      >
        <h2 className="w-full font-bold text-4xl md:text-5xl uppercase text-left tracking-wider">
          {t("second-heading")}
        </h2>
        <p className="mt-4 font-light text-xl tracking-wider leading-[1.95rem]">
          {t("second-paragraph")}
        </p>
        <p className="my-4 text-xl tracking-wide italic w-4/5 mx-auto text-white">
          {t.rich("third-paragraph", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="font-light text-xl tracking-wider leading-[1.95rem]">
          {t("fourth-paragraph")}
        </p>
        <p className="font-light text-xl tracking-wider leading-[1.95rem]">
          {t("fifth-paragraph")}
        </p>

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
