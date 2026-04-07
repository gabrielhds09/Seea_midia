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
} from "framer-motion"

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
    offset: ["start start", "end end"]
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative", className)}
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
    className={cn("sticky top-0 h-screen w-full flex items-center overflow-hidden", className)}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessTrack = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { scrollYProgress } = useContainerScrollContext()
  const [ref, { width }] = useMeasure()
  const [windowWidth, setWindowWidth] = React.useState(0)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate the amount to move. We want the end of the track (width) 
  // to be visible when scrollYProgress is 1.
  // x: from 0 to -(width - windowWidth)
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9], // Start moving at 10% and finish at 90% of container scroll
    [0, -(width - windowWidth + 64)] // Plus extra gap
  )

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className={cn("flex flex-nowrap gap-6 md:gap-12 px-6 md:px-[15vw]", className)}
    >
      {children}
    </motion.div>
  )
}

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

export const ProcessCard: React.FC<HTMLMotionProps<"div"> & VariantProps<typeof processCardVariants>> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <motion.div
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"
