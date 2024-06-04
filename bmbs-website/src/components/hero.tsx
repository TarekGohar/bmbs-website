import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="flex items-center justify-center">
      <div className="container mx-auto max-w-6xl px-6 py-12 flex items-center justify-center">
        <div className="max-w-lg mb-32 p-6 text-6xl font-sans text-slate-200 uppercase border-4 md:max-w-2xl md:text-8xl md:p-12 md:m-32 md:mx-0 md:text-8xl">
          Brahm Mauer Bartending Service
        </div>
      </div>
    </section>
  );
}
