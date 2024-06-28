import Image from "next/image";
import Link from "next/link";

interface ContactCardProps {
  image: string;
  title: string;
  info: string;
  modePhone: boolean;
}

export default function ContactCard(props: ContactCardProps) {
  return (
    <div className="group flex flex-col bg-neutral-100 duration-200 rounded-md py-10 w-72 items-center">
      <Image
        src={props.image}
        alt={props.title}
        width={1000}
        height={1000}
        className="p-4 h-40 group-hover:scale-105 duration-200"
      />
      <h2 className="text-neutral-900 text-lg font-medium">{props.title}</h2>
      <h3 className="mt-1">
        <Link
          href={`${props.modePhone ? "tel:" : "mailto:"} ${props.info}`}
          className="text-pink-600 hover:border-b-[1.5px] border-pink-600"
        >
          {props.info}
        </Link>
      </h3>
    </div>
  );
}
