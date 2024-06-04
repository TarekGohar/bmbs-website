import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <Hero />
    </>
  );
}
