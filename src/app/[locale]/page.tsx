import Hero from "@/components/hero";
import Footer from "@/components/footer";
// import { Metadata } from "next";
import ShowServices from "@/components/ShowServices";
import LogoScroll from "@/components/LogoScroll";
import { Link } from "@/i18n/navigation";

// export const metadata: Metadata = {
//   title: "Homepage",
//   description: "The homepage of the Brahm Mauer Bartending Service website",
// };

export default function Home() {
  return (
    <>
      <Hero />

      <LogoScroll />

      <ShowServices />

      <div className="w-full flex flex-col items-center justify-center my-44 space-y-4">
        <Link
          href="book-now"
          className="navbar-link text-white w-fit font-normal text-2xl"
        >
          Book Now
        </Link>
        <span className="text-white font-thin">or</span>
        <Link
          href="contact"
          className="navbar-link text-white w-fit font-normal text-2xl"
        >
          Contact Us
        </Link>
      </div>

      <Footer />
    </>
  );
}
