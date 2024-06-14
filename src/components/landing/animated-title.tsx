import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import Balancer from "react-wrap-balancer"

type Props = {
  title: string
  subtitle: string
  image: string
  side: string
  position: string
}

export default function AnimatedTitle({
  title,
  subtitle,
  image,
  side,
  position,
}: Props) {
  return (
    <div className="group relative flex h-44 w-full items-center justify-start gap-5 overflow-hidden bg-secondary text-left transition-all duration-700 ease-in hover:flex-col hover:justify-start sm:justify-center md:h-64">
      <div
        className={clsx(
          "absolute z-20 h-full w-screen bg-secondary/95  transition-all duration-1000 ease-in-out ",
          side == "left"
            ? "group-hover:translate-x-full"
            : "group-hover:-translate-x-full"
        )}
      />
      <div
        className={clsx(
          "absolute z-10 h-full w-screen scale-95 bg-cover bg-no-repeat blur-sm transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:blur-[2px] brightness-50	",
          position
        )}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="z-30 flex items-start justify-start pt-4">
        <ChevronRight className="h-10 w-10 text-muted-foreground transition duration-700 group-hover:rotate-90 group-hover:text-white" />
        <h3 className="text-3xl font-bold leading-relaxed text-foreground transition duration-700 group-hover:animate-text group-hover:text-primary sm:text-3xl xl:text-4xl">
          {title}
        </h3>
      </div>
      <div className="z-30 hidden items-center justify-center px-1 group-hover:flex">
        <Balancer className="text-md text-center font-medium capitalize text-slate-100 sm:text-lg xl:text-xl">
          {subtitle}
        </Balancer>
        
      </div>
    </div>
  )
}
