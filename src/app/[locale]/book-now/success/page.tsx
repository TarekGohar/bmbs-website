import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("Booking");
  return (
    <section id="booking-success" className="bg-neutral-900">
      <div className="container mx-auto h-[80vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="w-fit px-56 text-white text-center text-6xl font-bold">
          {t("title")}
        </h1>
        <h2 className="text-white font-medium">{t("subtitle")}</h2>
      </div>
    </section>
  );
}
