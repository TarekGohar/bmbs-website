import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero">
      <div className="container mx-auto max-w-6xl px-6 py-12 flex items-center justify-center space-y-0">
        <div className="max-w-lg mb-4 mt-64 p-6 text-6xl font-sans text-slate-200 uppercase border-4 md:max-w-2xl md:p-12 md:mx-0 md:text-8xl">
          Brahm <br /> Mauer Bartending Service
        </div>
      </div>
      <div className="flex justify-center text-white text-2xl uppercase font-sans text-center pb-64">
        Weddings. Corporate Events.
        <br className="md:hidden" />
        Private Parties.
      </div>
    </section>
  );
}
