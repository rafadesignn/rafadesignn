import { Fragment } from "react"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  items: string[]
  className?: string
  itemClassName?: string
  separatorClassName?: string
  duration?: number
}

export function Marquee({
  items,
  className,
  itemClassName,
  separatorClassName,
  duration = 28,
}: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className={cn("whitespace-nowrap px-6 md:px-10", itemClassName)}>{item}</span>
          <span className={cn("text-primary", separatorClassName)} aria-hidden>
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
