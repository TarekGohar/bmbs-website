import ServiceCard from "@/components/service-card";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");
  return (
    <section id="services" className="px-8 pb-24 bg-black">
      <div className="container mx-auto max-w-6xl px-6 py-12 flex flex-col items-center justify-center">
        <h1 className="w-fit font-extrabold text-6xl text-white px-4 my-12">
          {t("heading")}
        </h1>
      </div>
      <div className="mb-12 flex flex-col lg:flex-row items-center lg:items-stretch space-y-10 justify-between lg:space-y-0 lg:space-x-12 max-w-6xl mx-auto">
        <ServiceCard
          title={t("corporate.title")}
          link="/services/corporate"
          description={t("corporate.description")}
          image="/images/corporate.jpg"
        />
        <ServiceCard
          title={t("festivals.title")}
          link="/services/festivals"
          description={t("festivals.description")}
          image="/images/festival.jpg"
        />
        <ServiceCard
          title={t("weddings.title")}
          link="/services/weddings"
          description={t("weddings.description")}
          image="/images/bar.jpg"
        />
      </div>
    </section>
  );
}
