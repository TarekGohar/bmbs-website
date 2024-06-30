import Footer from "@/components/footer";
import Form from "@/components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book Brahm Mauer Bartending Service for your next event",
};


export default function Home() {
  return (
    <>
      <section id="form" className="bg-neutral-900 py-32">
        <Form />
      </section>
      <Footer />
    </>
  );
}
