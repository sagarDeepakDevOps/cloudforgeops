import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)] " +
    "shadow-[0_0_18px_var(--glow-accent)] hover:shadow-[0_0_28px_var(--glow-accent-strong)] " +
    "transition-shadow duration-300",
  outline:
    "border border-[var(--border)] text-[var(--foreground)] bg-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost:
    "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

type Variant = keyof typeof variantStyles;
type Size = keyof typeof sizeStyles;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
