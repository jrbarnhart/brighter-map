import { cn } from "@/lib/utils";
import { Link } from "react-router";

type InfoLinkVariants = "monster" | "room";

type InfoLinkProps = {
  children: React.ReactNode;
  to: string;
  variant: InfoLinkVariants;
};

export default function InfoLink({ children, to, variant }: InfoLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "", // Defaults
        "", // Room
        "" // Monster
      )}
    >
      {children}
    </Link>
  );
}
