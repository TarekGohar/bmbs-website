import Form from "@/components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book Brahm Mauer Bartending Service for your next event",
};

export default function Home() {
  return (
    <section
      id="form"
      className="min-h-screen md:min-h-[50rem] h-fit pt-32 md:max-h-none flex items-center justify-center"
    >
      <Form />
    </section>
  );
}
