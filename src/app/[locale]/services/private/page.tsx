import { Metadata } from "next";
import privateMetadata from "./metadata";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Wedd",
  description: "Learn about Brahm Mauer Bartending Service",
};

export default function Home() {
  return <ServicePage serviceTitle="private" imageMetadata={privateMetadata} />;
}
