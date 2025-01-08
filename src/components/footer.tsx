import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navbar");
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <svg
          width="160"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 693.22 192.37"
          className="text-white scale-[1.75]"
        >
          <path
            fill="currentColor"
            className="cls-1"
            d="M353.9,30.06c-9.07-1.83-17.75-2.52-25.31-2.21,6.01.16,12.62.91,19.48,2.29,24.51,4.93,42.92,16.11,41.14,24.96-1.78,8.85-23.09,12.03-47.59,7.09-17.05-3.43-31.14-9.88-37.55-16.47,4.77,8.7,21.4,17.63,42.27,21.83,9.84,1.98,19.22,2.63,27.2,2.11,1.46,1.88-1.25,4.05-1.25,4.05,0,0-18.09,16.2-24.78,23.29-6.7,7.08-13.69.18-15.66-3.71-1.97-3.9-12.63-14.34-12.63-14.34,13.65,21.22,13.62,21.14,16.82,26.36l-1.88,2.34c-12.29,9.94-15.46,18.36-14.57,25.05-1.84-.07-3.63-.08-5.33,0,1.73.05,3.54.18,5.38.36,1.78,11.35,15.25,17.59,15.25,17.59,0,0,3.28,1.63,4.08-.58.58-1.6-2.34-3.64-2.34-3.64-7.54-3.96-10.87-8.37-11.69-12.71,1.35.21,2.72.45,4.11.73,18.62,3.75,32.61,12.24,31.25,18.97-1.35,6.72-17.54,9.13-36.16,5.39-12.95-2.61-23.66-7.51-28.52-12.52,3.62,6.61,16.25,13.39,32.11,16.59,19.84,3.99,37.21.85,38.79-7.01,1.59-7.86-13.22-17.48-33.05-21.47-2.95-.59-5.84-1.02-8.63-1.31-1.59-12.06,15.65-23.48,15.65-23.48l12.12-9.8c2.35-2.11,27.46-24.51,38.37-34.25,3.54-1.86,5.8-4.3,6.39-7.23,2.09-10.35-17.4-23.01-43.5-28.26"
          />
        </svg>

        {/* Footer Menu */}
        <ul className="mt-20 px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-20 md:gap-x-10 gap-y-12 md:gap-y-12 text-white font-thin text-xs sm:text-sm md:text-md tracking-widest">
          {/* Contact */}
          <li className="flex justify-start lg:justify-center">
            <div className="flex flex-col gap-y-4">
              <h3 className="font-semibold uppercase">Contact</h3>

              <div className="flex flex-col gap-y-1">
                <span>8170 Chemin Devonshire</span>
                <span>Mont-Royal, QC</span>
                <span>H4P 1K4</span>
              </div>
              <a href="tel:+1 (514) 757-2402">+1 (514) 757-2402</a>
              <a href="mailto:info@brahmmauer.com">info@brahmmauer.com</a>
            </div>
          </li>

          {/* Hours */}
          <li className="flex justify-start lg:justify-center">
            <div className="flex flex-col gap-y-4">
              <h3 className="font-semibold uppercase">{t("hours")}</h3>
              <div className="flex flex-col gap-y-1">
                <span>{t("date")}</span>
                <span>{t("time")}</span>
              </div>
            </div>
          </li>

          {/* About */}
          <li className="w-fit md:px-0 md:w-full text-left lg:text-center font-semibold uppercase">
            <Link href="/about">{t("about")}</Link>
          </li>

          {/* Mila */}
          <li className="w-fit md:px-0 md:w-full text-left lg:text-center font-semibold uppercase">
            <Link href="/book-now">Espace Mila</Link>
          </li>

          {/* Book-Now */}
          <li className="w-fit md:px-0 md:w-full text-left lg:text-center font-semibold uppercase">
            <Link href="/book-now">Book Now</Link>
          </li>

          {/* Services */}
          <li className="row-start-3 md:col-start-1 lg:col-start-5 lg:row-start-1 flex justify-start lg:justify-center text-left">
            {/* Collections List */}
            <div className="flex flex-col text-left gap-y-2 ">
              <Link
                href="/services"
                className="mb-2 w-fit font-semibold uppercase"
              >
                Services
              </Link>
              <Link href="/services/corporate">Corporate</Link>
              <Link href="/services/fundraisers">Fundraisers</Link>
              <Link href="/services/festivals">Festivals</Link>
              <Link href="/services/private">Private</Link>
            </div>
          </li>
        </ul>
      </div>
      {/* Copyright */}
      <p className="mt-12 text-gray-500 text-center py-2 text-[8px] font-extralight">
        © {year} Brahm Mauer Bar Services. All Rights Reserved.
      </p>
    </footer>
  );
}
