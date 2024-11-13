"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";

export default function About() {
  const t = useTranslations("Mila");

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
          src={"/images/logos/mila.png"}
          width={1450}
          height={1450}
          alt="Brahm Logo"
          className={`px-8 md:px-40 lg:px-64 transition-opacity ease-in duration-1500 ${
            isLogoVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-[40rem] min-h-[60vh] mx-auto flex flex-col items-start justify-center text-white px-4 gap-y-8"
      >
        <h2 className="w-96 md:w-full font-bold text-4xl md:text-5xl uppercase text-left tracking-wider">
          Espace Mila
        </h2>
        <p className="mt-4 font-light tracking-wider text-xl leading-[1.85rem]">
          {t("description")}
        </p>

        <Link
          href="/book-now"
          className="mt-14 mb-20 text-xl font-bold navbar-link w-full underline text-center flex items-center justify-center"
        >
          <h2 className="text-center">{t("book-now")}</h2>
        </Link>
      </section>
    </>
  );
}
