"use client" 

import * as React from "react"
import { useMeasure } from "@uidotdev/usehooks"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion" // Adjusted from motion/react for stability if needed

import { cn } from "@/lib/utils"

const processCardVariants = cva("flex border backdrop-blur-lg rounded-2xl md:rounded-3xl", {
  variants: {
    variant: {
      indigo:
        "flex border text-slate-50 border-slate-700/30 backdrop-blur-lg bg-gradient-to-br from-[rgba(15,23,42,0.7)_40%] to-[#3730a3_120%]",
      light: "shadow bg-white/80 border-stone-200 text-stone-900",
      heritage: "flex border text-[#efebe6] border-[#312338]/20 backdrop-blur-xl bg-gradient-to-br from-[#312338]/90 to-[#431846]/80",
    },
    size: {
      sm: "min-w-[40%] max-w-[40%] md:min-w-[25%] md:max-w-[25%]",
      md: "min-w-[85%] max-w-[85%] md:min-w-[50%] md:max-w-[50%]",
      lg: "min-w-[90%] max-w-[90%] md:min-w-[75%] md:max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "heritage",
    size: "md",
  },
})

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

interface ProcessCardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number
  index: number
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 md:p-6", className)} {...props} />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-4 md:gap-8 p-6 md:p-10", className)}
    {...props}
  />
))
ProcessCardBody.displayName = "ProcessCardBody"

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext()
  const start = index / itemsLength
  const end = start + 1 / itemsLength
  const [ref, { width }] = useMeasure()
  
  // Use a stable value for innerWidth or handle it in useEffect for SSR safety
  const [innerWidth, setInnerWidth] = React.useState(0)
  
  React.useEffect(() => {
    setInnerWidth(window.innerWidth)
    const handleResize = () => setInnerWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 32 * index] // Gap of 32px
  )
  
  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"
