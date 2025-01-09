import ServicePage from "@/components/ServicePage";
import festivalMetadata from "./metadata";
import { getTranslations } from "next-intl/server";

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

export default function Festivals() {
  return (
    <ServicePage serviceTitle="festivals" imageMetadata={festivalMetadata} />
  );
}
