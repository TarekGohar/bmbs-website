import ServicePage from "@/components/ServicePage";
import corporateMetadata from "./metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("corporate-title")}`,
    description: t("corporate-description"),
  };
}

export default function Corporate() {
  return (
    <ServicePage serviceTitle="corporate" imageMetadata={corporateMetadata} />
  );
}
