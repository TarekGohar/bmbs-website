import ServicePage from "@/components/ServicePage";
import festivalMetadata from "./metadata";

export default function Festivals() {
  return (
    <ServicePage serviceTitle="festivals" imageMetadata={festivalMetadata} />
  );
}
