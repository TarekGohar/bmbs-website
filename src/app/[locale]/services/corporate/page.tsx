import ServicePage from "@/components/ServicePage";

export default function Corporate() {
  return (
    <ServicePage
      serviceTitle="corporate"
      serviceBefore="fundraisers"
      serviceAfter="weddings"
      serviceImages={["/images/events-1.jpg"]}
    />
  );
}
