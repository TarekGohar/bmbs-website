import { useTranslations } from "next-intl";
import ContactCard from "@/components/contact-card";
import Footer from "@/components/footer";

export default function Home() {
  const t = useTranslations("Contact");
  return (
    <section id="contact">
      <div className="bg-neutral-900 hover py-32 px-4 h-[80vh] flex items-center justify-center">
        <div className="container mx-auto">
          <h1 className="text-6xl text-white mx-auto w-fit font-bold">
            Contact
          </h1>
          <div className="flex mx-auto justify-center space-x-24 md:space-x-40 mt-12">
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
