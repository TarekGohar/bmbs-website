import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Footer from "@/components/footer";
import BackButton from "@/components/back-btn";

export default function Home() {
  return (
    <div>
      <div className="mt-10 max-w-[80rem] container mx-auto">
        <BackButton linkTo="/services" backText="Services" />
      </div>

      <div className="my-32 container mx-auto max-w-6xl">
        <h1 className="pl-2 font-bold text-6xl mb-4 text-pink-600">
          Weddings.
        </h1>
        <div className="flex flex-col-reverse space-x-0 gap-4 md:flex-row-reverse p-4 md:space-x-2 justify-between">
          <p className="w-full md:w-1/3 bg-pink-600 p-4 text-white text-lg font-medium leading-5 lg:w-1/4">
            BMBS is recognized for making wedding dreams unforgettable
            realities. Our skilled mixologists will delight your guests with
            enticing cocktails, incredible vibes, and unparalleled service. To
            ensure your big day is exactly as you imagined it, our wedding team
            will work closely with you and your planner to build a
            custom-tailored menu that will exceed all expectations. <br />
            <br />
            From our unique ice programs to our market-fresh ingredients, your
            wedding is sure to be a magical experience for all. Our bars are
            also complete with stunning visuals which are fully customizable to
            match your desired style. If you want to go the extra mile to
            entertain and fascinate your guests, leave it up to us to enchant
            them at the bar.
          </p>
          <Image
            width={1000}
            height={1000}
            src="/images/bmbs-wedding.jpg"
            alt="festival image"
            className="w-full md:w-2/3 h-[42rem] object-cover object-center"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
