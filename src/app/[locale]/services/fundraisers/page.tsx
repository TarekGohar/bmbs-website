import ServicePage from "@/components/ServicePage";
import fundraiserMetadata from "./metadata";

export default function Corporate() {
  return (
    <ServicePage
      serviceTitle="fundraisers"
      imageMetadata={fundraiserMetadata}
    />
  );
}
