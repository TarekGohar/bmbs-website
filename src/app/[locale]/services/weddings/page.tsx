import { useTranslations } from "next-intl";
import { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Wedd",
  description: "Learn about Brahm Mauer Bartending Service",
};

export default function Home() {
  const t = useTranslations("Services");
  return (
    <ServicePage
      serviceImages={["/images/weddings.jpg"]}
      serviceTitle="weddings"
      serviceBefore="fundraisers"
      serviceAfter="corporate"
    />
  );
}
