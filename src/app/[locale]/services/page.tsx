import Services from "@/components/services";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMBS Services",
  description: "The services offered by Brahm Mauer Bartending Service.",
};

export default function Home() {
  return (
    <>
      <Services />
      <Footer />
    </>
  );
}
