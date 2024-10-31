import ServicePage from "@/components/ServicePage";

export default function Corporate() {
  return (
    <ServicePage
      serviceTitle="corporate"
      serviceBefore="fundraisers"
      serviceAfter="festivals"
      serviceImages={["/images/events-1.jpg"]}
    />
  );
}
