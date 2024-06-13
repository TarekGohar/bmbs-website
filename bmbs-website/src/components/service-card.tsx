import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard(props: ServiceCardProps) {
  return (
    <div className="flex flex-col justify-between bg-gray-100 rounded-lg p-10 w-96 tracking-tight font-medium">
      <div>
        <Image
          src={props.image}
          alt={props.title}
          width={400}
          height={400}
          className="h-48 w-96 object-none rounded-md"
        />
        <h2 className="font-bold text-4xl text-gray-700 mt-6 text-left">
          {props.title}
        </h2>
        <div className="mt-4 text-left w-full text-gray-600">
          {props.description}
        </div>
      </div>
      <button className="bg-gray-300 mt-4 px-6  w-fit py-2 rounded-md text-white font-bold duration-200 hover:bg-gray-400 active:bg-gray-500">
        <Link href={`/services/${props.title.toLowerCase()}`}>Read More</Link>
      </button>
    </div>
  );
}
