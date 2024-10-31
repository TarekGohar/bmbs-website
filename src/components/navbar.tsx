"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

// Implement responsive navbar with hamburger button

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  return (
    <>
      <nav className="w-full px-12 mx-auto flex py-8 items-center justify-between font-okine font-light text-white unselectable">
        {/* Logo Button */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            height={400}
            width={400}
            className="object-contain w-40 md:w-60 hover:cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-x-20">
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
            menu ? "open" : "none" // enables/disables styling for hamburger button
          } z-40 block hamburger md:hidden focus:outline-none`}
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
          menu ? "flex" : "hidden" // opens menu or hides it on click of hamburger button
        } absolute top-0 bottom-0 left-0 flex-col items-center self-end w-full min-h-screen py-1 pt-40 space-y-3 text-lg text-white  opacity-90 bg-black`}
        onClick={() => setMenu((prev) => !prev)} // on click of menu item, closes menu
      >
        <Link href="/about" className="hover:text-pink-500">
          {t("about")}
        </Link>
        <Link href="/services" className="hover:text-pink-500">
          {t("services")}
        </Link>
        <Link href="/contact" className="hover:text-pink-500">
          {t("contact")}
        </Link>
        <Link
          href="/book-now"
          className="w-fit p-4 bg-pink-600 rounded-lg font-medium duration-200 hover:bg-pink-700 active:bg-pink-800"
        >
          {t("book-now")}
        </Link>
        <Link
          href={pathname}
          locale={t("locale") as "en" | "fr" | undefined}
          className="hover:text-pink-500 uppercase"
        >
          {t("locale")}
        </Link>
      </div>
    </>
  );
}
