import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5E5098] dark:focus-visible:ring-[#C775AB] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#5E5098] to-[#C775AB] text-white shadow hover:from-[#4b3e83] hover:to-[#b55e97] hover:shadow-lg transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[#5E5098]/30 dark:border-[#C775AB]/30 bg-background shadow-sm hover:bg-[#5E5098]/10 dark:hover:bg-[#C775AB]/10 hover:text-[#5E5098] dark:hover:text-[#C775AB] hover:border-[#5E5098] dark:hover:border-[#C775AB] transition-all duration-200",
        secondary:
          "bg-[#5E5098]/10 dark:bg-[#C775AB]/10 text-[#5E5098] dark:text-[#C775AB] shadow-sm hover:bg-[#5E5098]/20 dark:hover:bg-[#C775AB]/20",
        ghost:
          "hover:bg-[#5E5098]/10 dark:hover:bg-[#C775AB]/10 hover:text-[#5E5098] dark:hover:text-[#C775AB] transition-colors",
        link: "text-[#5E5098] dark:text-[#C775AB] underline-offset-4 hover:underline",
        brand: "bg-[#0f21e6] text-white transition-all duration-300",
      },
      size: {
        default: "h-9 px-6 py-2",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-10 px-8 py-2",
        icon: "h-9 w-9",
      },
      angle: {
        default: "",
        subtle: "",
        sharp: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      angle: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, angle, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Calculate clip-path based on angle variant - parallelogram with cuts on both sides
    let clipPath = ""
    if (angle === "default") {
      clipPath = "polygon(20px 0, calc(100% + 20px) 0, calc(100% - 20px) 100%, -20px 100%)"
    } else if (angle === "subtle") {
      clipPath = "polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)"
    } else if (angle === "sharp") {
      clipPath = "polygon(20px 0, calc(100% + 20px) 0, calc(100% - 20px) 100%, -20px 100%)"
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, angle, className }))}
        style={{
          clipPath: clipPath || undefined,
          ...style,
        }}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
