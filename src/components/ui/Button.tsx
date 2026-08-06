import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg border-accent hover:brightness-110 shadow-[0_1px_0_rgba(255,255,255,0.18)_inset]",
  secondary:
    "bg-elevated text-fg border-line-strong hover:border-accent hover:text-accent",
  ghost: "border-transparent text-muted hover:text-fg hover:bg-elevated",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-lg border font-medium",
    "transition-[color,background-color,border-color,filter,translate] duration-200",
    "hover:-translate-y-px active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/** Internal navigation — always use for same-origin routes and hash links. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** External links get the security rel and an accessible "opens in new tab" hint. */
export function ExternalButton({
  href,
  variant = "secondary",
  size = "md",
  className,
  children,
  download,
}: CommonProps & { href: string; download?: boolean }) {
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel="noopener noreferrer"
      download={download}
      className={classes(variant, size, className)}
    >
      {children}
      {!download && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
