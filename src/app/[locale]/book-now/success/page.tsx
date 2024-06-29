import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <section id="booking-success" className="bg-neutral-900">
      <div className="container mx-auto h-[80vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-white text-center text-6xl font-bold">
          Booking <br />
          Submitted!
        </h1>
        <h2 className="text-white font-medium">We will get in touch soon.</h2>
      </div>
    </section>
  );
}
