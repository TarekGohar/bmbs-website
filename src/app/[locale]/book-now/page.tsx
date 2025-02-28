import Form from "@/components/form";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("book-now-title")}`,
    description: t("book-now-description"),
  };
}

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: { locale: string };
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const searchParams = await props.searchParams;
  const service = searchParams.service;

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            Booking Details
          </h1>
        </div>
      </section>

      {/* Form Section */}
      <section
        id="form"
        className="px-4 max-w-[100rem] mx-auto mb-20 flex flex-col md:flex-row items-center md:justify-between gap-x-4"
      >
        <div className="md:w-[40%]">
          <Form service={service} />
        </div>

        <Image
          src="/images/corporate/patron-1.webp"
          width={1000}
          height={1000}
          alt="Brahm Mauer Bartending"
          className="hidden md:block md:w-[40%] h-[57rem] object-cover"
        />
      </section>
    </>
  );
}
