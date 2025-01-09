import ServicePage from "@/components/ServicePage";
import festivalMetadata from "./metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("festivals-title")}`,
    description: t("festivals-description"),
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ServicePage serviceTitle="festivals" imageMetadata={festivalMetadata} />
  );
}
