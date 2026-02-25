import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Adds a subtle left accent border */
  accent?: boolean;
}

export function Card({ children, className, hover = false, accent = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300",
        hover &&
          "card-gradient-border hover:-translate-y-1.5 hover:border-transparent " +
          "hover:shadow-[0_8px_32px_var(--glow-card)]",
        accent && "border-l-2 border-l-[var(--accent)]",
        className
      )}
    >
      {children}
    </div>
  );
}
