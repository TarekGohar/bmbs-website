import { useTranslations } from "next-intl";
import ContactCard from "@/components/contact-card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Brahm Mauer Bartending Service for more information",
};

export default function Home() {
  const t = useTranslations("Contact");
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full py-40 md:py-12 box-content px-4 flex items-center justify-center">
        <div className=" h-full mx-auto flex flex-col items-center justify-center">
          <h2 className="w-fit text-white font-bold text-6xl tracking-wider">
            Contact Us
          </h2>
          <div className="flex flex-col items-center space-y-10 mx-auto justify-center md:space-y-0 md:flex-row md:space-x-24 mt-12">
            <Link
              href="tel:514-757-2402"
              className="bg-white bg-opacity-10 hover:bg-opacity-25 duration-200 border-4 border-opacity-5 rounded-xl h-[20rem] md:h-[25rem] w-[16rem] md:w-[19rem] text-white flex flex-col items-center justify-center p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6.82666 6.82666"
                className="w-40"
              >
                <path
                  fill="currentColor"
                  d="M0.908571 2.24032c0.0676417,1.38906 1.96802,3.15789 3.2551,3.56889 0.863717,0.275768 2.1483,-0.268205 1.63998,-0.776646l-0.802594 -0.802984c-0.122031,-0.122118 -0.319803,-0.107913 -0.439051,0.0112992l-0.460874 0.460728c-0.991472,-0.540205 -1.40748,-0.965465 -1.95219,-1.951l0.461587 -0.461201c0.119421,-0.119453 0.132945,-0.316929 0.0108228,-0.439051l-0.802921 -0.802949c-0.44937,-0.44937 -0.93548,0.667693 -0.909858,1.19292z"
                />
                <path
                  fill="currentColor"
                  d="M0.908571 2.24032l1.24037 0.51028 0.461587 -0.461201c0.119421,-0.119453 0.132945,-0.316929 0.0108228,-0.439051l-0.802921 -0.802949c-0.44937,-0.44937 -0.93548,0.667693 -0.909858,1.19292z"
                />
                <path
                  fill="currentColor"
                  d="M4.16367 5.8092c0.863717,0.275768 2.1483,-0.268205 1.63998,-0.776646l-0.802594 -0.802984c-0.122031,-0.122118 -0.319803,-0.107913 -0.439051,0.0112992l-0.460874 0.460728 0.0625433 1.1076z"
                />
              </svg>
              <h3 className="text-xl">{t("call")}</h3>
              <span className="text-xl">514-757-2402</span>
            </Link>
            <Link
              href="mailto:info@brahmmauer.com"
              className="bg-white bg-opacity-10 hover:bg-opacity-25 duration-200 border-4 border-opacity-5 rounded-xl h-[20rem] md:h-[25rem] w-[16rem] md:w-[19rem] text-white flex flex-col items-center justify-center p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="w-40"
              >
                <path
                  fill="currentColor"
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                />
              </svg>
              <h3 className="text-xl">{t("email")}</h3>
              <span className="text-xl">info@brahmmauer.com</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
