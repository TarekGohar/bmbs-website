import Hero from "@/components/hero";
import LogoShow from "@/components/LogoShow";
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

      <LogoShow />

      <ShowServices />

      <div className="w-full flex flex-col items-center justify-center my-48 space-y-4">
        <p className="text-white font-white text-xl tracking-widest">
          Interested in working with us?
        </p>
        <Link
          href="/book-now"
          className="navbar-link text-white w-fit font-bold text-2xl underline-offset-[8px] underline up"
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
