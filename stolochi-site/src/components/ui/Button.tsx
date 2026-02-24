import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const base =
  "inline-flex items-center justify-center font-body font-semibold tracking-widest uppercase text-xs transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-gold text-white hover:bg-gold-dark px-8 py-3 border border-gold hover:border-gold-dark",
  outline:
    "bg-transparent text-gold border border-gold hover:bg-gold hover:text-white px-8 py-3",
  ghost:
    "bg-transparent text-charcoal hover:text-gold px-4 py-2 border-b border-transparent hover:border-gold",
};

const sizes = {
  sm: "text-xs px-5 py-2",
  md: "text-xs px-8 py-3",
  lg: "text-sm px-10 py-4",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
