import ServicePage from "@/components/ServicePage";
import fundraiserMetadata from "./metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("fundraisers-title")}`,
    description: t("fundraisers-description"),
  };
}

export default function Corporate() {
  return (
    <ServicePage
      serviceTitle="fundraisers"
      imageMetadata={fundraiserMetadata}
    />
  );
}
