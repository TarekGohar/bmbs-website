import LogoShow from "@/components/LogoShow";
import { getTranslations, setRequestLocale } from "next-intl/server";
import EventRotator from "@/components/EventRotator";
import { Link } from "@/i18n/routing";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("home-title")} - Brahm Mauer Bar Services`,
    description: t("home-description"),
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  // Set the request locale for static rendering
  setRequestLocale(locale);

  const t = await getTranslations("Hero");

  return (
    <>
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
      <section className="h-[40rem] px-6 lg:px-10 flex items-center justify-center">
        <EventRotator />
      </section>

      {/* Services */}
      <section
        id="collections"
        className="md:my-[10rem] h-[28rem] md:h-[34rem] lg:h-[44rem] xl:h-[50rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="collection-background max-w-[120rem] p-1 flex flex-col items-start justify-end w-full h-fit gap-x-2">
          <div className="collection-panel h-fit w-full gap-y-1 p-2 lg:p-4">
            <h2 className="text-4xl lg:text-6xl text-white font-medium">
              {t("service.title")}
            </h2>
            <div className="text-lg lg:text-xl lg:space-y-1">
              <h3 className="font-light leading-[1.5rem] text-white opacity-95">
                {t("service.subtitle")}
              </h3>
              <Link
                href="/services"
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

                <span>{t("service.view")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="h-[48rem] lg:h-[44rem] flex items-center justify-center">
        <div className="max-w-[120rem] flex flex-col lg:flex-row items-center px-4 space-y-8 lg:space-x-8">
          <div className="w-full lg:w-[70%] space-y-3 lg:space-y-8">
            <h2 className="text-4xl lg:text-6xl text-white font-medium">
              {t("about.main-text")}
            </h2>
            <Link
              aria-label="Learn More About Brahm Mauer Button"
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

              <span>{t("about.subtitle")}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="h-[50rem] flex items-center justify-center">
        <LogoShow />
      </section>

      {/* Mila */}
      <section
        id="mila"
        className="mb-[8rem] mt-[6rem] h-[28rem] md:h-[45rem] flex items-center justify-center px-2"
      >
        {/* Panels */}
        <div className="buy-background max-w-[120rem] flex flex-col items-start justify-start w-full h-fit gap-x-2">
          <div className="buy-panel p-5 h-fit w-full flex flex-col items-start justify-center gap-y-1 lg:gap-y-2">
            <h2 className="text-4xl lg:text-5xl text-white font-semibold">
              Espace Mila
            </h2>
            <div className="text-lg lg:text-xl">
              <h3 className="font-light leading-[1.5rem] text-white">
                {t("mila.subtitle")}
              </h3>
              <Link
                aria-label="Espace Mila Venue Button"
                href="/espace-mila"
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

                <span>{t("mila.learn")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section>
        <div className="h-[26rem] w-full flex flex-col items-center justify-center space-y-2 text-2xl tracking-wide">
          <h2 className="text-white">{t("book-now-subheading")}</h2>
          <Link
            aria-label="Book Brahm Mauer Now Button"
            href="/book-now"
            className="text-white w-fit font-semibold"
          >
            {t("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
