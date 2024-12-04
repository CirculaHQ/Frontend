import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs px-2 py-0.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success:
          "border-[#ABEFC6]   bg-[#ECFDF3] text-[#067647] ",
        pending:
        "border-[#B2DDFF]   bg-[#EFF8FF] text-[#175CD3] ",
        failed: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
        overdue: "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]"
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
