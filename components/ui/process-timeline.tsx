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

const processCardVariants = cva("flex border backdrop-blur-lg rounded-3xl", {
  variants: {
    variant: {
      indigo:
        "flex border text-slate-50 border-slate-700/30 backdrop-blur-lg bg-gradient-to-br from-[rgba(15,23,42,0.7)_40%] to-[#3730a3_120%]",
      light: "shadow bg-white/80 border-stone-200 text-stone-900",
      heritage: "flex border text-[#efebe6] border-[#312338]/20 backdrop-blur-xl bg-gradient-to-br from-[#312338]/95 to-[#431846]/85",
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

export const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const effectiveRef = (ref as React.RefObject<HTMLDivElement>) || scrollRef
  
  const { scrollYProgress } = useScroll({
    target: effectiveRef,
  })
  
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={effectiveRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
})
ContainerScroll.displayName = "ContainerScroll"

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 h-screen w-full flex items-center overflow-hidden", className)}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
))
ProcessCardTitle.displayName = "ProcessCardTitle"

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-8 p-6", className)}
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
  const [ref, { width }] = useMeasure()
  const [screenWidth, setScreenWidth] = React.useState(0)

  // SSR Safe: Only access window on mount
  React.useEffect(() => {
    setScreenWidth(window.innerWidth)
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const start = index / itemsLength
  const end = start + 1 / itemsLength

  // Motion Mapping from user-provided logic
  // x goes from window edge to final position
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [screenWidth || 2000, -((width ?? 0) * index) + 64 * index]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0, // First card is static, others slide in
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  )
}
ProcessCard.displayName = "ProcessCard"
