import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Use 'narrow' for content pages (e.g. blog), 'wide' for landing sections */
  width?: "default" | "narrow" | "wide";
}

const widthMap = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

/**
 * Shared horizontal padding + max-width container.
 * Wrap each page's main content with this to keep consistent spacing.
 */
export function PageWrapper({
  children,
  className,
  width = "default",
}: PageWrapperProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widthMap[width],
        className
      )}
    >
      {children}
    </main>
  );
}
