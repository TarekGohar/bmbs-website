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
    contact: false,
    book: false,
    lang: false,
  });

  useEffect(() => {
    if (!menu) {
      // Reset visibility when menu is closed
      setVisibleWords({
        about: false,
        services: false,
        contact: false,
        book: false,
        lang: false,
      });
      return;
    }

    // Staggered visibility effect when menu opens
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, about: true })), 0);
    setTimeout(
      () => setVisibleWords((prev) => ({ ...prev, services: true })),
      100
    );
    setTimeout(
      () => setVisibleWords((prev) => ({ ...prev, contact: true })),
      200
    );
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, book: true })), 300);
    setTimeout(() => setVisibleWords((prev) => ({ ...prev, lang: true })), 400);
  }, [menu]);

  return (
    <>
      <nav className="w-full px-4 mdpx-12 mx-auto flex py-8 items-center justify-between font-okine font-light text-white unselectable">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            height={400}
            width={400}
            className="object-contain w-40 md:w-60 hover:cursor-pointer"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-x-16">
          <Link href="/about" className="navbar-link">
            {t("about")}
          </Link>
          <Link href="/services" className="navbar-link">
            {t("services")}
          </Link>
          <Link href="/contact" className="navbar-link">
            {t("contact")}
          </Link>
          <Link
            href="/book-now"
            className="hover:text-neutral-400 focus:text-neutral-500 ease-in duration-150 tracking-[.125rem] border-b-[1px] border-white hover:border-neutral-400"
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
        } absolute top-0 bottom-0 left-0 flex-col items-center self-end w-full min-h-screen py- pt-40 text-2xl text-white opacity-90 bg-black`}
        onClick={() => setMenu(false)}
      >
        <Link
          href="/about"
          className={`navbar-link transition-opacity duration-500 word ${
            visibleWords.about ? "show" : ""
          }`}
        >
          {t("about")}
        </Link>
        <Link
          href="/services"
          className={`navbar-link transition-opacity duration-500 word ${
            visibleWords.services ? "show" : ""
          }`}
        >
          {t("services")}
        </Link>
        <Link
          href="/contact"
          className={`navbar-link transition-opacity duration-500 word ${
            visibleWords.contact ? "show" : ""
          }`}
        >
          {t("contact")}
        </Link>
        <Link
          href="/book-now"
          className={`word text-white hover:text-neutral-200 focus:text-neutral-400 ease-in duration-150 tracking-[.125rem] border-b-[1px] border-white hover:border-neutral-400 transition-opacity ${
            visibleWords.book ? "show" : ""
          }`}
        >
          {t("book-now")}
        </Link>
        <Link
          href={pathname}
          locale={t("locale") as "en" | "fr" | undefined}
          className={`navbar-link transition-opacity duration-500 word uppercase ${
            visibleWords.lang ? "show" : ""
          }`}
        >
          {t("locale")}
        </Link>
      </div>
    </>
  );
}
