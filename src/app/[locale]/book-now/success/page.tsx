import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import Form from "@/components/form";

export default function Home() {
  return (
    <section id="booking-success" className="bg-neutral-900">
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <div className="container mx-auto h-[80vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-white text-center text-6xl font-bold">
          Booking <br />
          Submitted!
        </h1>
        <h2 className="text-white font-medium">We will get in touch soon.</h2>
      </div>
    </section>
  );
}
