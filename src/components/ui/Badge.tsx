import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]",
  accent:
    "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
  outline: "border border-[var(--border)] text-[var(--foreground)]",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
