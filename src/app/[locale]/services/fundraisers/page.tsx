import ServicePage from "@/components/ServicePage";
import fundraiserMetadata from "./metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ServicePage
      serviceTitle="fundraisers"
      imageMetadata={fundraiserMetadata}
    />
  );
}
