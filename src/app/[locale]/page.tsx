import LogoShow from "@/components/LogoShow";
// import { Metadata } from "next";
import ShowServices from "@/components/ShowServices";
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
      {/* Hero */}
      <section
        id="hero"
        className="h-[80vh] min-h-[50rem] md:h-screen flex items-center"
      >
        <div className="container h-fit w-full flex justify-left px-2">
          <h1 className="flex flex-col font-bold text-white uppercase text-7xl xxs:text-7xl xs:text-9xl md:text-[9rem] leading-[6rem] xxs:leading-[6rem] xs:leading-[6rem] md:leading-[7.5rem]">
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

      {/* About */}
      <section className="h-[40rem] lg:h-[50rem] flex items-center justify-center">
        <div className="max-w-[120rem] flex flex-col lg:flex-row items-start px-4 lg:px-10 space-y-8 lg:space-x-10">
          <h1 className="w-full text-5xl sm:text-5xl lg:leading-[9rem] lg:text-9xl font-medium text-white">
            We make every toast unforgettable
          </h1>

          <div className="w-full lg:w-1/3 space-y-4">
            <h2 className="lg:pt-10 text-xl text-white">
              With years of experience and a passion for bringing people
              together, we turn any event into a vibrant, fun-filled gathering.
              From expertly crafted drinks to seamless service, we’re here to
              elevate your party and keep the energy flowing.
            </h2>
            <Link
              href="/collections"
              className="flex items-center gap-x-2 w-fit text-xl text-sky-600 hover:text-neutral-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="6 6 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6l-6 6" />
              </svg>

              <span>Learn more about us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="collections"
        className="mt-24 h-[28rem] md:h-[40rem] lg:h-[50rem] xl:h-[56rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="collection-background max-w-[120rem] p-1 md:p-3 flex flex-col items-start justify-end xl:justify-center w-full h-fit gap-x-2">
          <div className="collection-panel h-fit w-full lg:w-[20rem] lg:h-full gap-y-1 lg:gap-y-2 p-2 lg:p-4">
            <h1 className="text-4xl lg:text-5xl text-white font-semibold uppercase">
              Services
            </h1>
            <p className="text-md lg:text-xl font-light leading-[1.5rem] text-neutral-200">
              Explore our range of bar services.
            </p>
            <Link
              href="/collections"
              className="flex items-center gap-x-2 w-fit text-md lg:text-xl text-neutral-200 hover:text-neutral-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="6 6 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6l-6 6" />
              </svg>

              <span>View</span>
            </Link>
          </div>
        </div>
      </section>

      <LogoShow />

      {/* Mila */}
      <section
        id="where-to-buy"
        className="h-[28rem] md:h-[45rem] lg:h-[50rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="buy-background max-w-[120rem] px-4 md:px-8 flex flex-col items-center justify-center w-full h-fit gap-x-2">
          <div className="buy-panel p-3 h-fit w-[18rem] md:w-[40rem] flex flex-col items-start justify-center gap-y-1 lg:gap-y-2">
            <h1 className="text-4xl lg:text-5xl text-white font-semibold uppercase">
              Espace Mila
            </h1>
            <p className="text-md lg:text-xl font-light leading-[1.5rem] text-neutral-200">
              Discover our versatile new event space, designed to elevate
              gatherings of all kinds.
            </p>
            <Link
              href="/collections"
              className="flex items-center gap-x-2 w-fit text-md lg:text-xl text-neutral-200 hover:text-neutral-400 duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="6 6 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6l-6 6" />
              </svg>

              <span>View</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section>
        <div className="w-full flex flex-col items-center justify-center h-[40rem] space-y-2 text-2xl tracking-wide">
          <p className="text-white ">{t("book-now-subheading")}</p>
          <Link href="/book-now" className="text-white w-fit font-semibold">
            {t("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
