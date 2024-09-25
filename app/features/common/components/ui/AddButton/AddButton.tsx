import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/features/common/libs";
import { Plus } from "lucide-react";

const addButtonClassName =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90";

const iconVariants = cva("", {
  variants: { size: { sm: "size-8", default: "size-10", lg: "size-12" } },
  defaultVariants: { size: "default" },
});

export interface AddButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconVariants> {}

export const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <button
        className={cn(addButtonClassName, className)}
        ref={ref}
        {...props}
      >
        <Plus className={iconVariants({ size })} />
      </button>
    );
  },
);
