import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("success-title")}`,
    description: t("success-description"),
  };
}

export default function Home() {
  const t = useTranslations("Booking");
  return (
    <section id="booking-success" className="">
      <div className="container mx-auto min-h-[50rem] h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="w-fit text-white text-center text-5xl font-semibold">
          {t("title")}
        </h1>
        <h2 className="text-white text-xl font-medium">{t("subtitle")}</h2>
      </div>
    </section>
  );
}
