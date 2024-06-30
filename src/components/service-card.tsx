import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ServiceCard(props: ServiceCardProps) {
  const t = useTranslations("Services");
  return (
    <div className="flex flex-col justify-between bg-neutral-100 rounded-lg p-10 w-96 tracking-tight font-medium">
      <div>
        <Image
          src={props.image}
          alt={props.title}
          width={400}
          height={400}
          className="h-48 w-96 object-none rounded-md"
        />
        <h2 className="font-bold text-4xl text-neutral-700 mt-6 text-left">
          {props.title}
        </h2>
        <div className="mt-4 text-left w-full text-neutral-600">
          {props.description}
        </div>
      </div>
      <button className="bg-neutral-300 mt-4 px-6  w-fit py-2 rounded-md text-white font-bold duration-200 hover:bg-neutral-400 active:bg-neutral-500">
        <Link href={props.link}>{t("read-more")}</Link>
      </button>
    </div>
  );
}
