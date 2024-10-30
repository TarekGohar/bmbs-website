import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Navbar from "./navbar";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section
      id="hero"
      className="min-h-screen h-full flex flex-col mx-auto w-full"
    >
      <Navbar />
      <div className="flex-grow container w-full flex items-center justify-left">
        <h1 className="text-10xl font-made font-bold text-left w-12 p-5 text-neutral-200 uppercase md:p-12 md:mx-0 md:text-10xl leading-none tracking-wide">
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
