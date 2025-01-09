import privateMetadata from "./metadata";
import ServicePage from "@/components/ServicePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("private-title")}`,
    description: t("private-description"),
  };
}

export default function Home() {
  return <ServicePage serviceTitle="private" imageMetadata={privateMetadata} />;
}
