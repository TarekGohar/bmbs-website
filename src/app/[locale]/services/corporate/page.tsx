import ServicePage from "@/components/ServicePage";
import corporateMetadata from "./metadata";

export default function Corporate() {
  return (
    <ServicePage serviceTitle="corporate" imageMetadata={corporateMetadata} />
  );
}
