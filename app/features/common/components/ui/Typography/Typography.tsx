import { cn } from "@/features/common/libs";

export type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Typography({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "flex h-10 w-full bg-transparent py-2 text-2xl font-semibold items-center",
        className,
      )}
    >
      {children}
    </p>
  );
}
