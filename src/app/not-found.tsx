import Navbar from "@/components/navbar";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/footer";

export default async function NotFound() {
  // Set the request locale for static rendering

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <section className="text-white max-w-[100rem] mx-auto h-[58vh] min-h-[40rem]">
        <div className="px-4 flex items-end justify-start h-[14.5rem] md:h-[15rem]">
          <h1 className="text-5xl md:text-7xl font-semibold uppercase">
            Page non trouvée
          </h1>
        </div>

        <p className="max-w-[80rem] px-4 text-2xl">
          Vous essayez de visiter une section du site web qui n'existe pas.
        </p>
      </section>
      <Footer />
    </NextIntlClientProvider>
  );
}
