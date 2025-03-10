import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import OpacityWrite from "@/components/common/OpacityWrite";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("mila-title")}`,
    description: t("mila-description"),
  };
}

export default async function EspaceMila({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Mila");
  const ts = await getTranslations("Hero");

  return (
    <>
      {/* Header Section */}
      <section className="text-white max-w-[120rem] mx-auto">
        <div className="px-4 flex items-end justify-start h-[14.5rem] md:h-[15rem]">
          <h1 className="text-5xl md:text-7xl font-semibold uppercase">
            Venues
          </h1>
        </div>
      </section>

      {/* First Paragraphs */}
      <section className="max-w-[120rem] text-white mx-auto my-[3rem] md:my-[6rem] px-4">
        <p className="md:w-[100%] text-2xl font-medium md:text-4xl md:leading-[2.5rem]">
          Discover the perfect setting for your next event with our diverse
          selection of stunning venues, each designed to create unforgettable
          experiences.
        </p>
      </section>

      {/* <span className="block h-[.09rem] bg-white w-1/2 max-w-[80rem] mx-auto" /> */}

      <section className="max-w-[120rem] text-white mx-auto my-[10rem] px-4 space-y-[3rem]">
        <h2 className="md:w-[100%] text-3xl font-medium md:text-5xl md:leading-[2.5rem] uppercase">
          Blondie
        </h2>
        <div className="w-full flex flex-col items-start lg:flex-row gap-y-[2.5rem] lg:gap-y-0 md:gap-x-[5rem]">
          <OpacityWrite
            description="A chic and contemporary event space located in the heart of Old
            Montreal, offering a stylish and versatile setting for a variety of
            occasions. Designed with modern elegance in mind, the venue is
            perfect for weddings, corporate gatherings, private celebrations,
            and special events looking for a unique and upscale ambiance. With
            its sleek interior, flexible layout, and high-end finishes, Blondie
            provides a sophisticated backdrop that can be tailored to suit any
            vision."
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
          <OpacityWrite
            description="The venue offers a full suite of amenities, including
            state-of-the-art audiovisual equipment, customizable décor, and bar
            service, ensuring a seamless event experience. Whether hosting an
            intimate soirée or a lively celebration, Blondie’s dedicated team
            works closely with clients to bring their vision to life, providing
            personalized service and expert event planning support. Conveniently
            located in one of Montreal’s most vibrant districts, Blondie
            combines historic charm with modern luxury, making it an ideal
            destination for those seeking a memorable and stylish event
            experience."
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
        </div>
        <div className="relative w-full">
          <Image
            src={"/images/blondie.JPEG"}
            width={2000}
            height={2000}
            alt="Maison Principale Venue Picture"
            className="w-full h-[35rem] object-cover"
            style={{ background: "white" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, #000000 100%)",
            }}
            aria-hidden="true"></div>
        </div>
      </section>

      {/* <span className="block h-[.09rem] bg-white w-1/2 max-w-[80rem] mx-auto" /> */}

      {/* Bungalow */}
      <section className="max-w-[120rem] text-white mx-auto my-[10rem] px-4 space-y-[3rem]">
        <h2 className="md:w-[100%] text-3xl font-medium md:text-5xl md:leading-[2.5rem] uppercase">
          Le Bungalow
        </h2>
        <div className="w-full flex flex-col items-start lg:flex-row gap-y-[2.5rem] lg:gap-y-0 md:gap-x-[5rem]">
          <OpacityWrite
            description="A premier event space located at 1751 Richardson Street, Suite 1041,
            in Montreal's vibrant Pointe-Saint-Charles neighborhood. Spanning
            20,000 square feet, this versatile venue seamlessly blends the
            warmth of a home with the professionalism required for corporate
            events, making it an ideal choice for meetings, conferences, and
            social gatherings."
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
          <OpacityWrite
            description="Designed to accommodate a wide range of events, Le Bungalow offers
            integrated audiovisual equipment to support presentations and
            entertainment needs. The venue also features a stylish bar area,
            perfect for welcoming cocktails and receptions, enhancing the
            overall guest experience. Conveniently situated in one of Montreal's
            most dynamic districts, Le Bungalow combines accessibility with a
            unique ambiance, making it a top choice for those seeking a
            distinctive and adaptable event space in the city.​"
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
        </div>
        <div className="relative w-full">
          <Image
            src={"/images/bungalow.png"}
            width={2000}
            height={2000}
            alt="Maison Principale Venue Picture"
            className="w-full h-[35rem] object-cover"
            style={{ background: "white" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, #000000 100%)",
            }}
            aria-hidden="true"></div>
        </div>
      </section>

      {/* <span className="block h-[.09rem] bg-white w-1/2 max-w-[80rem] mx-auto" /> */}

      {/* Bungalow */}
      <section className="max-w-[120rem] text-white mx-auto my-[10rem] px-4 space-y-[3rem]">
        <h2 className="md:w-[100%] text-3xl font-medium md:text-5xl md:leading-[2.5rem] uppercase">
          Maison Principale
        </h2>
        <div className="w-full flex flex-col items-start lg:flex-row gap-y-[2.5rem] lg:gap-y-0 md:gap-x-[5rem]">
          <OpacityWrite
            description="A prestigious event venue located in Montreal, renowned for its luxurious ambiance and exceptional service. Housed within a meticulously transformed historic building constructed in 1932, the venue features soaring 42-foot ceilings adorned with 15 crystal chandeliers, offering a versatile space ideal for weddings, corporate events, and social gatherings.  The venue is equipped with state-of-the-art amenities, including a modern sound system, expert lighting, and hardwood floors, ensuring a seamless and memorable experience for every event."
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
          <OpacityWrite
            description="Maison Principale collaborates with top professionals in the food and beverage industry, providing comprehensive event services from start to finish.  The venue's main space, Le Grand Salon, serves as an elegant blank canvas that can be personalized to reflect each client's unique vision, making Maison Principale a premier choice for those seeking an unforgettable event experience in Montreal.​"
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
        </div>
        <div className="relative w-full">
          <Image
            src={"/images/MP.avif"}
            width={2000}
            height={2000}
            alt="Maison Principale Venue Picture"
            className="w-full h-[35rem] object-cover"
            style={{ background: "white" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, #000000 100%)",
            }}
            aria-hidden="true"></div>
        </div>
      </section>

      {/* <span className="block h-[.09rem] bg-white w-1/2 max-w-[80rem] mx-auto" /> */}

      {/* Societe 18 */}
      <section className="max-w-[120rem] text-white mx-auto my-[10rem] px-4 space-y-[3rem]">
        <h2 className="md:w-[100%] text-3xl font-medium md:text-5xl md:leading-[2.5rem] uppercase">
          Societe 18
        </h2>
        <div className="w-full flex flex-col items-start lg:flex-row gap-y-[2.5rem] lg:gap-y-0 md:gap-x-[5rem]">
          <OpacityWrite
            description="A stylish and versatile event venue in Montreal, designed to host a
            variety of occasions, from weddings and corporate functions to
            private celebrations and social gatherings. Combining modern
            sophistication with a flexible layout, the space can be tailored to
            suit events of all sizes, offering a seamless blend of elegance and
            functionality."
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
          <OpacityWrite
            description="The venue provides a range of services, including state-of-the-art
            audiovisual equipment, high-end décor, and customizable event
            packages. With a dedicated team of professionals, SOCIETE 18 ensures
            that every detail is meticulously planned and executed, creating a
            unique and memorable experience for guests. Whether hosting an
            intimate gathering or a large-scale celebration, SOCIETE 18 offers
            the perfect setting for an unforgettable event in the heart of
            Montreal.​"
            textColor="text-white"
            className="w-full lg:w-1/2 font-light md:text-xl md:leading-[2rem]"
          />
        </div>
        <Image
          src={"/images/societe.jpg"}
          width={2000}
          height={2000}
          alt="Maison Principale Venue Picture"
          className="w-full h-[35rem] object-cover"
        />
      </section>

      <section>
        <div className="h-[30rem] w-full flex flex-col items-center justify-center space-y-2 text-2xl tracking-wide">
          <h2 className="text-white ">{ts("book-now-subheading")}</h2>
          <Link
            aria-label="Book Now"
            href="/book-now?service=mila"
            className="text-white w-fit font-semibold">
            {ts("book-now")}
          </Link>
        </div>
      </section>
    </>
  );
}
