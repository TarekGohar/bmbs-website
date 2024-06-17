import Link from "next/link";

interface BackButtonProps {
  backText: string;
  linkTo: string;
}

export default function BackButton(props: BackButtonProps) {
  return (
    <Link href={props.linkTo}>
      <button className="w-fit flex items-center arrow-div">
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className=" size-10 inline arrow"
          fill="white"
        >
          <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
        </svg>
        <span className="font-medium pl-2 arrow text-white">
          {props.backText}
        </span>
      </button>
    </Link>
  );
}
