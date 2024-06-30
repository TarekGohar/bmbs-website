import Image from "next/image";
import Footer from "@/components/footer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function About() {
  const t = useTranslations("About");
  return (
    <div>
      {/* Hero Section */}
      <section
        id="about-hero"
        className="flex items-center justify-center w-full h-[80vh]"
      >
        <Image
          src="/images/logo-high.png"
          alt="BMBS logo"
          width={1000}
          height={1000}
          className="bmbs-logo"
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container mx-auto max-w-[52rem] mt-36 mb-24 flex flex-col items-center justify-center"
      >
        <h2 className="w-[30.5rem] mb-24 mx-4 flex items-center font-bold text-pink-600 text-3xl">
          {t.rich("first-heading", {
            span: (chunks) => (
              <span className="font-bold text-[5rem] pr-1">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-medium leading-6 px-20 text-white">
          {t.rich("first-paragraph", { br: () => <br /> })}
        </p>
        <Image
          width={1000}
          height={1000}
          src="/images/brahm.jpg"
          alt="portrait of owner Brahm Mauer"
          className="mt-16 w-3/4 rounded"
        />

        <h2 className="w-[32rem] my-24 mx-4 flex items-center font-bold text-pink-600 text-3xl">
          {t.rich("second-heading", {
            span: (chunks) => (
              <span className="font-bold text-[5rem] pr-1">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-medium leading-6 px-20 text-white">
          {t("second-paragraph")}
        </p>
        <p className="my-8 px-12 italic w-4/5 mx-auto text-white">
          {t.rich("third-paragraph", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="font-medium leading-6 px-20 text-white">
          {t("fourth-paragraph")}
        </p>
        <p className="mt-8 font-medium leading-6 px-20 text-white">
          {t("fifth-paragraph")}
        </p>
        <Link
          href="/book-now"
          className="mt-10 py-4 px-8 text-white bg-pink-600 rounded-lg font-medium duration-200 hover:bg-pink-700 active:bg-pink-800"
        >
          {t("book-now")}
        </Link>
      </section>
      <Footer />
    </div>
  );
}
