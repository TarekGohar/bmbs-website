"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const [visibleWords, setVisibleWords] = useState({
    about: false,
    services: false,
    mila: false,
    book: false,
    lang: false,
  });

  useEffect(() => {
    if (!menu) {
      // Reset visibility when menu is closed
      setVisibleWords({
        about: false,
        services: false,
        mila: false,
        book: false,
        lang: false,
      });
      return;
    }

    // Staggered visibility effect when menu opens
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, about: true })), 0);
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, mila: true })), 100);
    setTimeout(
      () => setVisibleWords((prev) => ({ ...prev, services: true })),
      200
    );
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, book: true })), 300);
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, lang: true })), 400);

    if (typeof window !== "undefined") {
      // Disable body scroll when menu is open
      if (menu) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      // Clean up when component is unmounted or menu changes
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menu]);

  return (
    <>
      <nav className="absolute w-full z-20 px-6 md:px-8 mx-auto flex py-6 items-center justify-between text-white unselectable">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            height={400}
            width={400}
            className="object-contain w-40 md:w-60 hover:cursor-pointer"
            onClick={() => setMenu(false)}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-x-16">
          <Link href="/about" className="navbar-link">
            {t("about")}
          </Link>
          <Link href="/espace-mila" className="navbar-link">
            {t("mila")}
          </Link>
          <Link href="/services" className="navbar-link">
            {t("services")}
          </Link>

          <Link
            href="/book-now"
            className="hover:text-neutral-300 focus:text-neutral-400 font-medium ease-in duration-150 tracking-[.125rem] underline underline-offset-8"
          >
            {t("book-now")}
          </Link>
          <Link
            href={pathname}
            locale={t("locale") as "en" | "fr" | undefined}
            className="navbar-link uppercase"
          >
            {t("locale")}
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          aria-label="Open mobile menu"
          id="menu-btn"
          className={`${
            menu ? "open" : ""
          } z-40 block hamburger lg:hidden focus:outline-none`}
          onClick={() => setMenu((prev) => !prev)}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="menu"
        className={`${
          menu ? "flex" : "hidden"
        } absolute top-0 bottom-0 left-0 flex-col z-10 items-center self-end w-full min-h-screen pt-40 text-xl text-white opacity-90 bg-black gap-y-6`}
        onClick={() => setMenu(false)}
      >
        <Link
          href="/about"
          className={`navbar-link word ${visibleWords.about ? "show" : ""}`}
          onClick={() => setMenu(false)}
        >
          {t("about")}
        </Link>
        <Link
          href="/espace-mila"
          className={`navbar-link word ${visibleWords.mila ? "show" : ""}`}
          onClick={() => setMenu(false)}
        >
          {t("mila")}
        </Link>
        <Link
          href="/services"
          className={`navbar-link word ${visibleWords.services ? "show" : ""}`}
          onClick={() => setMenu(false)}
        >
          {t("services")}
        </Link>

        <Link
          href="/book-now"
          className={`word text-white hover:text-neutral-200 focus:text-neutral-400 ease-in duration-500 tracking-[.125rem] border-b-[1px] border-white hover:border-neutral-400 transition-all ${
            visibleWords.book ? "show" : ""
          }`}
          onClick={() => setMenu(false)}
        >
          {t("book-now")}
        </Link>
        <Link
          href={pathname}
          locale={t("locale") as "en" | "fr" | undefined}
          className={`navbar-link word uppercase ${
            visibleWords.lang ? "show" : ""
          }`}
          onClick={() => setMenu(false)}
        >
          {t("locale")}
        </Link>
      </div>
    </>
  );
}
