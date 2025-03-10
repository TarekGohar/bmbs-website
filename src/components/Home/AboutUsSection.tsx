import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import OpacityWrite from "../common/OpacityWrite";

export default async function AboutUsSection() {
  const t = await getTranslations("Hero");
  return (
    <section className="h-[40rem] lg:h-[44rem] flex items-center justify-center">
      <div className="max-w-[120rem] flex flex-col lg:flex-row items-center px-4 space-y-8 lg:space-x-8">
        <div className="w-full lg:w-[70%] space-y-3 lg:space-y-8">
          {/* <h2 className="text-4xl lg:text-6xl text-white font-medium">
            {t("about.main-text")}
          </h2> */}
          <OpacityWrite
            description={t("about.main-text")}
            textColor="text-white"
            className="text-4xl lg:text-6xl text-white font-medium"
          />
          <Link
            aria-label="Learn More About Brahm Mauer Button"
            href="/about"
            className="flex items-center gap-x-2 w-fit text-xl lg:text-2xl text-sky-600 hover:text-white duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="6 6 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 lg:w-4 lg:h-4">
              <path d="M9 6l6 6l-6 6" />
            </svg>

            <span>{t("about.subtitle")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
