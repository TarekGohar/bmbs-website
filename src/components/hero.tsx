import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Navbar from "./navbar";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section
      id="hero"
      className="min-h-screen h-full flex flex-col items-center mx-auto w-full overflow-hidden"
    >
      <Navbar />
      <div className="container flex-grow w-full flex items-center justify-left px-4">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-10xl font-okine font-medium text-left w-[52rem] text-neutral-100 uppercase md:p-12 md:mx-0 leading-none tracking-wide">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
