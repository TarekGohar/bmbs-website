import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navbar");

  return (
    <section id="footer">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 693.22 192.37"
          className="text-white md:max-w-[32rem]"
          style={{ transform: "scale(0.5)", scale: 1 }}
        >
          <path
            fill="currentColor"
            className="cls-1"
            d="M353.9,30.06c-9.07-1.83-17.75-2.52-25.31-2.21,6.01.16,12.62.91,19.48,2.29,24.51,4.93,42.92,16.11,41.14,24.96-1.78,8.85-23.09,12.03-47.59,7.09-17.05-3.43-31.14-9.88-37.55-16.47,4.77,8.7,21.4,17.63,42.27,21.83,9.84,1.98,19.22,2.63,27.2,2.11,1.46,1.88-1.25,4.05-1.25,4.05,0,0-18.09,16.2-24.78,23.29-6.7,7.08-13.69.18-15.66-3.71-1.97-3.9-12.63-14.34-12.63-14.34,13.65,21.22,13.62,21.14,16.82,26.36l-1.88,2.34c-12.29,9.94-15.46,18.36-14.57,25.05-1.84-.07-3.63-.08-5.33,0,1.73.05,3.54.18,5.38.36,1.78,11.35,15.25,17.59,15.25,17.59,0,0,3.28,1.63,4.08-.58.58-1.6-2.34-3.64-2.34-3.64-7.54-3.96-10.87-8.37-11.69-12.71,1.35.21,2.72.45,4.11.73,18.62,3.75,32.61,12.24,31.25,18.97-1.35,6.72-17.54,9.13-36.16,5.39-12.95-2.61-23.66-7.51-28.52-12.52,3.62,6.61,16.25,13.39,32.11,16.59,19.84,3.99,37.21.85,38.79-7.01,1.59-7.86-13.22-17.48-33.05-21.47-2.95-.59-5.84-1.02-8.63-1.31-1.59-12.06,15.65-23.48,15.65-23.48l12.12-9.8c2.35-2.11,27.46-24.51,38.37-34.25,3.54-1.86,5.8-4.3,6.39-7.23,2.09-10.35-17.4-23.01-43.5-28.26"
          />
        </svg>

        {/* Footer Menu */}
        <ul className="flex space-x-10 text-white font-thin text-sm md:text-md tracking-widest">
          <li>
            <Link
              href="/about"
              className="border-b-[1px] border-b-transparent hover:border-b-white focus:text-neutral-500 ease-in duration-150  border-transparent hover:border-neutral-400"
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              href="/espace-mila"
              className="border-b-[1px] border-b-transparent hover:border-b-white focus:text-neutral-500 ease-in duration-150  border-transparent hover:border-neutral-400 "
            >
              {t("mila")}
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="border-b-[1px] border-b-transparent hover:border-b-white focus:text-neutral-500 ease-in duration-150  border-transparent hover:border-neutral-400 "
            >
              {t("services")}
            </Link>
          </li>
          <li>
            <Link
              href="/book-now"
              className="border-b-[1px] border-b-transparent hover:border-b-white focus:text-neutral-500 ease-in duration-150  border-transparent hover:border-neutral-400 "
            >
              {t("book-now")}
            </Link>
          </li>
        </ul>

        {/* Socials */}
        <div className="flex justify-center space-x-10 text-white font-thin mt-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/brahmmauer/"
            className="text-white w-6 h-6 md:w-8 md:h-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </a>

          {/* Tiktok */}
          <a
            href="https://www.tiktok.com/@brahmmauer"
            className="text-white w-6 h-6 md:w-8 md:h-8"
          >
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
              />
            </svg>
          </a>

          {/* Phone */}
          <a
            href="tel:+15147572402"
            className="text-white w-6 h-6 md:w-8 md:h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 6.82666 6.82666"
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
          </a>

          {/* Email */}
          <a
            href="mailto:info@brahmmauer.com"
            className="text-white w-6 h-6 md:w-8 md:h-8"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transformOrigin: "50% 50%", // Center the transform origin
                transform: "scale(1)", // Ensure scaling works smoothly across browsers
              }}
            >
              <path
                d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-black text-gray-500 text-center pt-6 pb-2 text-[10px] font-extralight">
        <p>© 2024 by Brahm Mauer Bar Services.</p>
      </div>
    </section>
  );
}
