import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import Form from "@/components/form";

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <section id="form" className="bg-neutral-900 py-32">
        <Form />
      </section>
      <Footer />
    </>
  );
}
