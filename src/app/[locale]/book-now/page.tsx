import Form from "@/components/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book Brahm Mauer Bartending Service for your next event",
};

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
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
      <section
        id="form"
        className="flex items-start justify-center min-h-[60rem] pt-40 mb-40"
      >
        <Form service={service || ""} />
      </section>
    </>
  );
}
