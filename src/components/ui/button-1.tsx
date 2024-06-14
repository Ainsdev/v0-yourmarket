import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  url: string;
  color?: string;
  textColor?: string;
};

export default function CustomButton({ title, url, color, textColor }: Props) {
  return (
    <Link href={url} className="group relative px-6 py-3 font-bold">
      <span
        className={cn(
          color ? color : "bg-foreground",
          "absolute inset-0 h-full w-full -translate-x-2 -translate-y-2 transition duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
        )}
      ></span>
      <span className="absolute inset-0 h-full w-full border-4 border-primary"></span>
      <span
        className={cn(
          textColor ? textColor : "text-secondary",
          "relative z-10 px-6 py-3"
        )}
      >
        {title}
      </span>
    </Link>
  );
}
