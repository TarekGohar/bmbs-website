import Form from "@/components/form";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book Brahm Mauer Bartending Service for your next event",
};

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const service = searchParams.service;
  return (
    <section
      id="form"
      className="flex items-start justify-center min-h-[60rem] pt-40 mb-40"
    >
      <Form service={service || ""} />
    </section>
  );
}
