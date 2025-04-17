import { cn } from "@/lib/utils";
import { Link } from "react-router";

type InfoLinkVariants = "monster" | "room";

type InfoLinkProps = {
  children: React.ReactNode;
  to: string;
  variant: InfoLinkVariants;
  className?: string;
};

export default function InfoLink({
  children,
  to,
  variant,
  className,
}: InfoLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "underline font-bold text-orange-300 hover:brightness-125", // Defaults
        variant === "room" && "", // Room
        variant === "monster" && "text-monster", // Monster
        className // User added
      )}
    >
      {children}
    </Link>
  );
}
