import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

const title = cva(["font-[600] text-[#111827]"], {
  variants: {
    intent: {
      title: "text-[24px]",
      subtitle: "",
    },
    alignment: {
      left: "text-left",
      centered: "text-center",
    },
  },
  defaultVariants: {
    intent: "title",
    alignment: "left",
  },
});

interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof title> {
  children?: ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, className, intent, alignment, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(title({ alignment, intent, className }))}
      >
        {children}
      </h1>
    );
  }
);

Title.displayName = "Title";

export default Title;
