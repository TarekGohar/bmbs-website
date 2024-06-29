import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import BackButton from "@/components/back-btn";

export default function Home() {
  return (
    <div className="">
      <div className="bg-black">
        <div className="container mx-auto bg-black">
          <Navbar />
        </div>
      </div>
      <div className="mt-10 max-w-[80rem] container mx-auto">
        <BackButton linkTo="/services" backText="Services" />
      </div>

      <div className="my-32 container mx-auto max-w-6xl">
        <h1 className="pl-2 font-bold text-6xl mb-4 text-pink-600">
          Corporate.
        </h1>
        <div className="flex flex-col-reverse space-x-0 gap-4 md:flex-row-reverse p-4 md:space-x-2 justify-between">
          <p className="w-full md:w-1/3 bg-pink-600 p-4 text-white text-lg font-medium leading-5 lg:w-1/4">
            Servicing Montréal and its surrounding areas Brahm Mauer Bar
            Services offers turnkey bar solutions. Combining a bespoke bar
            service with a highly trained and professional staff, Brahm Mauer
            Bar Services ensures that the event is a success in both the eyes of
            the client as well as their guests for your next Corporate Event.
          </p>
          <Image
            width={1000}
            height={1000}
            src="/images/bmbs-corporate.jpg"
            alt="grey goose corporate image"
            className="w-full md:w-2/3 h-[38rem] object-cover object-center"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
