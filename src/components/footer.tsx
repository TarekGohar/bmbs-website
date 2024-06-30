import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navbar");
  return (
    <section id="footer">
      <div className="flex flex-col items-center justify-center bg-black">
        {/* Logo */}
        <Image
          width={200}
          height={200}
          src="/images/logo.png"
          alt="BMBS logo"
          className="m-10"
        />

        {/* Footer Menu */}
        <ul className="flex space-x-10 text-white font-thin">
          <div className="group">
            <Link href="/about">{t("about")}</Link>
            <div className="mx-2 group-hover:border-b-[0.75px] group-hover:border-blue-50"></div>
          </div>
          <div className="group">
            <Link href="/services">{t("services")}</Link>
            <div className="mx-2 group-hover:border-b-[0.75px] group-hover:border-blue-50"></div>
          </div>
          <div className="group">
            <Link href="/contact">{t("contact")}</Link>
            <div className="mx-2 group-hover:border-b-[0.75px] group-hover:border-blue-50"></div>
          </div>
        </ul>

        {/* Socials */}
        <div className="flex justify-center space-x-6 text-white font-thin mt-10">
          <a href="https://www.instagram.com/brahmmauer/">
            <Image
              width="100"
              height="100"
              src="/images/logo-instagram.svg"
              alt="instagram icon"
              className="icon"
            />
          </a>

          <a href="https://www.tiktok.com/@brahmmauer">
            <Image
              width="100"
              height="100"
              src="/images/logo-tiktok.svg"
              alt="instagram icon"
              className="icon"
            />
          </a>
          <a href="tel:+15147572402">
            <Image
              width="100"
              height="100"
              src="/images/icon-phone.svg"
              alt="instagram icon"
              className="icon"
            />
          </a>
          <a href="mailto:info@brahmmauer.com">
            <Image
              width="100"
              height="100"
              src="/images/icon-email.svg"
              alt="email icon"
              className="icon"
            />
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-black text-gray-500 text-center py-6 text-[10px] font-extralight">
        <p>© 2023 by Brahm Mauer Bar Services.</p>
      </div>
    </section>
  );
}
