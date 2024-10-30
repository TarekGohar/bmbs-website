"use client";

import Services from "@/components/services";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
// import { Metadata } from "next";
import { useEffect, useState } from "react";
import LogoScroll from "@/components/LogoScroll";

// export const metadata: Metadata = {
//   title: "Homepage",
//   description: "The homepage of the Brahm Mauer Bartending Service website",
// };

export default function Home() {
  const [visibleWords, setVisibleWords] = useState({
    weddings: false,
    events: false,
    festivals: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Trigger each word appearance with staggered delays
      setTimeout(
        () => setVisibleWords((prev) => ({ ...prev, weddings: true })),
        2000
      );
      setTimeout(
        () => setVisibleWords((prev) => ({ ...prev, events: true })),
        2500
      );
      setTimeout(
        () => setVisibleWords((prev) => ({ ...prev, festivals: true })),
        3000
      );

      // Remove the scroll event listener after the first scroll
      window.removeEventListener("scroll", handleScroll);
    };

    // Listen for the first scroll event
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Hero />

      <LogoScroll />

      <div className="word-container text-center flex justify-center font-made items-center gap-x-80 text-4xl h-[50vh] tracking-widest">
        <div
          className={`word font-bold text-white ${
            visibleWords.weddings ? "show" : ""
          }`}
        >
          Weddings
        </div>
        <div
          className={`word font-bold text-white ${
            visibleWords.events ? "show" : ""
          }`}
        >
          Events
        </div>
        <div
          className={`word font-bold text-white ${
            visibleWords.festivals ? "show" : ""
          }`}
        >
          Festivals
        </div>
      </div>

      {/* <Services /> */}

      <Footer />
    </>
  );
}
