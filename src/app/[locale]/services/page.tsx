import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("services-title")}`,
    description: t("services-description"),
  };
}

export default async function page({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  // Set the request locale for static rendering
  setRequestLocale(locale);

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[100rem] mx-auto">
        <div className="px-4 flex items-center justify-starts h-[25rem] md:h-[30rem]">
          <h1 className="text-6xl md:text-7xl font-semibold uppercase">
            Services
          </h1>
        </div>
      </section>

      <section className="-my-20 mb-20 h-fit">
        <div className="flex space-x-2 max-w-[100rem] mx-auto px-4 mt-10 overflow-x-auto no-scrollbar">
          <Link
            href="/services/corporate"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer "
          >
            <Image
              src="/images/corporate/corporate-1.jpg"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover "
              style={{ filter: "brightness(85%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Corporate
            </h2>
          </Link>
          <Link
            href="/services/festivals"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer "
          >
            <Image
              src="/images/festivals/festivals-3.jpg"
              alt="festivals"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(70%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Festivals
            </h2>
          </Link>

          <Link
            href="/services/fundraisers"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer "
          >
            <Image
              src="/images/fundraisers/fundraisers-1.jpg"
              alt="corporate event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Fundraisers
            </h2>
          </Link>

          <Link
            href="/services/private"
            className="relative min-w-[20rem] md:min-w-[30rem] h-[35rem] md:h-[42rem] group cursor-pointer "
          >
            <Image
              src="/images/private/private-0.jpg"
              alt="private event"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
            />
            <h2 className="absolute bottom-[3rem] left-0 w-full text-white font-medium text-4xl text-center p-2 opacity-60 group-hover:opacity-100 duration-200 transition-opacity">
              Private
            </h2>
          </Link>
        </div>
      </section>
    </>
  );
}
