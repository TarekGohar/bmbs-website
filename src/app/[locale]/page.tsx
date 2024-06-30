import Services from "@/components/services";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
  description: "The homepage of the Brahm Mauer Bartending Service website",
};

export default function Home() {
  return (
    <>
      <Hero />

      <Services />

      <Footer />
    </>
  );
}
