import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

const paragraph = cva(["font-[400] leading-snug"], {
  variants: {
    prominence: {
      dark: "text-[#393e47]",
      normal: "text-[#6b7280]",
      muted: "text-[#9ba4b5]",
    },
    alignment: {
      left: "text-left",
      centered: "text-center",
    },
    size: {
      normal: "text-[16px]",
      tiny: "text-[14px]",
      prompt: "text-[20px] font-semibold",
    },
  },
  defaultVariants: {
    prominence: "normal",
    alignment: "left",
    size: "normal",
  },
});

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraph> {
  children?: ReactNode;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, size, prominence, className, alignment }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraph({ size, prominence, alignment, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
