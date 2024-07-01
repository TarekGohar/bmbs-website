import { useTranslations } from "next-intl";
import ContactCard from "@/components/contact-card";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Brahm Mauer Bartending Service for more information",
};

export default function Home() {
  const t = useTranslations("Contact");
  return (
    <section id="contact">
      <div className="bg-neutral-900 hover py-40 md:py-12 box-content px-4 h-[80vh] flex items-center justify-center">
        <div className="container mx-auto">
          <h1 className="text-6xl text-white mx-auto w-fit font-bold">
            Contact
          </h1>
          <div className="flex flex-col items-center gap-4 mx-auto justify-center md:space-y-0 md:flex-row md:space-x-24 mt-12">
            <ContactCard
              image="/images/icon-phone-black.svg"
              title={t("call")}
              info="514-757-2402"
              modePhone={true}
            />
            <ContactCard
              image="/images/icon-email-black.svg"
              title={t("email")}
              info="info@brahmmauer.com"
              modePhone={false}
            />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
