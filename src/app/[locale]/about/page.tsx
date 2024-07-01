import Image from "next/image";
import Footer from "@/components/footer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BMBS",
  description: "Learn about Brahm Mauer Bartending Service",
};

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
        <h2 className="w-min md:w-[28rem] mb-24 mx-4 flex-col items-center font-bold text-pink-600 text-3xl">
          {t.rich("first-heading", {
            span: (chunks) => (
              <span className="font-bold text-[5rem] pr-1">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-medium leading-6 px-6 md:px-20 text-white">
          {t.rich("first-paragraph", { br: () => <br /> })}
        </p>
        <Image
          width={1000}
          height={1000}
          src="/images/brahm.jpg"
          alt="portrait of owner Brahm Mauer"
          className="w-full mt-16 rounded"
        />

        <h2 className="w-min md:w-[28rem] mt-24 mb-16 mx-4 flex-col items-center font-bold text-pink-600 text-3xl">
          {t.rich("second-heading", {
            span: (chunks) => (
              <span className="font-bold text-[5rem] pr-1">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-medium leading-6 px-6 md:px-20 text-white">
          {t("second-paragraph")}
        </p>
        <p className="my-8 px-6 md:px-20 italic w-4/5 mx-auto text-white">
          {t.rich("third-paragraph", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <p className="font-medium leading-6 px-6 md:px-20 text-white">
          {t("fourth-paragraph")}
        </p>
        <p className="mt-8 font-medium leading-6 px-6 md:px-20 text-white">
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
