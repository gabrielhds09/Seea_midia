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

const processCardVariants = cva("flex border backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem]", {
  variants: {
    variant: {
      heritage: "flex border text-[#efebe6] border-[#312338]/10 bg-gradient-to-br from-[#312338]/95 to-[#431846]/85",
      light: "shadow-xl bg-white/90 border-stone-100 text-stone-900",
    },
    size: {
      sm: "min-w-[40vw] max-w-[40vw] md:min-w-[25vw]",
      md: "min-w-[85vw] max-w-[85vw] md:min-w-[55vw]",
      lg: "min-w-[90vw] max-w-[90vw] md:min-w-[75vw]",
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

export function useContainerScrollContext() {
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
  const [mounted, setMounted] = React.useState(false)
  const localRef = React.useRef<HTMLDivElement>(null)
  const effectiveRef = (ref as React.RefObject<HTMLDivElement>) || localRef

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: effectiveRef,
    offset: ["start start", "end end"]
  })

  // Evita renderização de filhos que dependem do contexto antes da montagem
  if (!mounted) return <div className={className} {...props} />

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={effectiveRef}
        className={cn("relative", className)}
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

  // Movimento Cinematográfico Contínuo (Luxury Standard)
  // Mapeia 0-100% de scroll diretamente para o deslocamento total do trilho
  // Deixa uma margem de segurança no final (15vw) para respiro
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95], 
    [0, -(width - windowWidth + (windowWidth * 0.15))] 
  )

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className={cn("flex flex-nowrap items-center gap-12 md:gap-[15vw] px-[10vw] md:px-[20vw]", className)}
    >
      {children}
    </motion.div>
  )
}

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
    className={cn("flex flex-col gap-6 md:gap-10 p-8 md:p-14", className)}
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
