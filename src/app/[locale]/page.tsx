import Hero from "@/components/hero";
import Footer from "@/components/footer";
// import { Metadata } from "next";
import ShowServices from "@/components/ShowServices";
import LogoScroll from "@/components/LogoScroll";

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

      {/* <Services /> */}

      <Footer />
    </>
  );
}
