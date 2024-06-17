import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <h1>Lemon</h1>
      <Footer />
    </>
  );
}
