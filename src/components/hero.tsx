import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section
      id="hero"
      className="min-h-screen h-full flex flex-col items-center mx-auto w-full overflow-hidden"
    >
      <div className="container min-h-[45rem] flex-grow w-full flex items-center justify-left px-4">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-9xl font-creato font-black text-left w-[2rem] text-white uppercase md:p-12 md:mx-0 leading-[4.5rem] md:leading-[7.5rem] tracking-wide">
          {/* {t("title")} */}
          <span className="opacity-70">B</span>rahm{" "}
          <span className="opacity-70">M</span>auer{" "}
          <span className="opacity-70">B</span>ar{" "}
          <span className="opacity-70">S</span>
          ervices
        </h1>
      </div>
    </section>
  );
}

// 17841400965675664
