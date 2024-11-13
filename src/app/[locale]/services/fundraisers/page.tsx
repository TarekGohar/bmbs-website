import ServicePage from "@/components/ServicePage";

export default function Corporate() {
  return (
    <ServicePage
      serviceTitle="fundraisers"
      serviceBefore="festivals"
      serviceAfter="weddings"
      serviceImages={["/images/fundraisers.jpg"]}
    />
  );
}
