import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ContactCard from "@/components/contact-card";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <div className="container mx-auto mt-24">
        <h1 className="text-6xl text-pink-600 mx-auto w-fit font-bold">
          Contact.
        </h1>
        <div className="flex mx-auto justify-center space-x-40 md:space-x-80 mt-12">
          <ContactCard
            image="/images/icon-phone.svg"
            title="Call Us."
            info="514-757-2402"
          />
          <ContactCard
            image="/images/icon-email.svg"
            title="Email Us."
            info="info@brahmmauer.com"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
