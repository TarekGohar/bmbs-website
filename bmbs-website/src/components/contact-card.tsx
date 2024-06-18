import Image from "next/image";

interface ContactCardProps {
  image: string;
  title: string;
  info: string;
}

export default function ContactCard(props: ContactCardProps) {
  return (
    <div className="flex flex-col bg-red-500 w-1/3 items-center md:w-1/6">
      <Image
        src={props.image}
        alt={props.title}
        width={1000}
        height={1000}
        className="p-4"
      />
      <h2 className="text-white">{props.title}</h2>
      <h3>{props.info}</h3>
    </div>
  );
}
