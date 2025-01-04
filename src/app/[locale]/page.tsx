import LogoShow from "@/components/LogoShow";
// import { Metadata } from "next";
import Navbar from "@/components/navbar";
import EventRotator from "@/components/EventRotator";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// export const metadata: Metadata = {
//   title: "Homepage",
//   description: "The homepage of the Brahm Mauer Bartending Service website",
// };

export default function Home() {
  const t = useTranslations("Hero");
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section
        id="hero"
        className="h-[80vh] min-h-[50rem] md:h-screen flex items-center"
      >
        <div className="container h-fit w-full flex justify-left px-4">
          <h1 className="flex flex-col font-bold text-white uppercase text-7xl xxs:text-7xl xs:text-8xl md:text-[8rem] leading-[6rem] xxs:leading-[5rem] xs:leading-[6rem] md:leading-[7.5rem]">
            <span>
              <span className="opacity-70">B</span>rahm
            </span>
            <span>
              <span className="opacity-70">M</span>auer
            </span>
            <span>
              <span className="opacity-70">B</span>ar
            </span>
            <span>
              <span className="opacity-70">S</span>ervices
            </span>
          </h1>
        </div>
      </section>

      {/* Event Rotator */}
      <section className="h-[30rem] md:h-[40rem] px-6 lg:px-10 flex items-center justify-center">
        <EventRotator />
      </section>

      {/* Services */}
      <section
        id="collections"
        className="my-[10rem] h-[28rem] md:h-[34rem] lg:h-[44rem] xl:h-[50rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="collection-background max-w-[120rem] p-1 flex flex-col items-start justify-end xl:justify-center w-full h-fit gap-x-2">
          <div className="collection-panel h-fit w-full lg:w-[20rem] lg:h-full gap-y-1 p-2 lg:p-4">
            <h1 className="text-4xl lg:text-6xl text-white font-medium ">
              Services
            </h1>
            <div className="text-md lg:text-xl">
              <p className="font-light leading-[1.5rem] text-white opacity-95">
                Explore our range of bar services.
              </p>
              <Link
                href="/collections"
                className="flex items-center gap-x-2 w-fit  text-sky-600 hover:text-white duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="6 6 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 lg:w-4 lg:h-4"
                >
                  <path d="M9 6l6 6l-6 6" />
                </svg>

                <span>View</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="h-[40rem] lg:h-[44rem] flex items-center justify-center">
        <div className="max-w-[120rem] flex flex-col lg:flex-row items-center px-4 space-y-8 lg:space-x-8">
          {/* <h1 className="w-full text-5xl sm:text-6xl lg:leading-[6.5rem] lg:text-8xl font-medium text-white">
            We make every toast unforgettable
          </h1> */}

          <div className="w-full lg:w-[70%] space-y-3 lg:space-y-8">
            <h2 className="text-4xl lg:text-6xl text-white font-medium">
              With over twenty-five years of experience and a passion for
              bringing people together, we turn any event into a vibrant,
              fun-filled gathering.
              {/* From expertly crafted drinks to seamless service, we’re here to
              elevate your party and keep the energy flowing. */}
            </h2>
            <Link
              href="/about"
              className="flex items-center gap-x-2 w-fit text-xl lg:text-2xl text-sky-600 hover:text-white duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="6 6 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 lg:w-4 lg:h-4"
              >
                <path d="M9 6l6 6l-6 6" />
              </svg>

              <span>Learn more about us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="h-[56rem] flex items-center justify-center">
        <LogoShow />
      </section>

      {/* Mila */}
      <section
        id="where-to-buy"
        className="mb-[8rem] mt-[6rem] h-[28rem] md:h-[45rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="buy-background max-w-[120rem] px-4 md:px-8 flex flex-col items-center justify-center w-full h-fit gap-x-2">
          <div className="buy-panel p-3 h-fit w-[18rem] md:w-[40rem] flex flex-col items-start justify-center gap-y-1 ">
            <h1 className="text-4xl lg:text-5xl text-white font-semibold">
              Espace Mila
            </h1>
            <div className="space-y-[0.2rem] text-md lg:text-xl">
              <p className="font-light leading-[1.5rem] text-white">
                Discover our versatile new event space, designed to elevate
                gatherings of all kinds.
              </p>
              <Link
                href="/collections"
                className="flex items-center gap-x-2 w-fit text-neutral-700 hover:text-white duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="6 6 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 md:w-3 md:h-3"
                >
                  <path d="M9 6l6 6l-6 6" />
                </svg>

                <span>Learn more</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section>
        <div className="h-[30rem] w-full flex flex-col items-center justify-center space-y-2 text-2xl tracking-wide">
          <p className="text-white ">{t("book-now-subheading")}</p>
          <Link href="/book-now" className="text-white w-fit font-semibold">
            {t("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
