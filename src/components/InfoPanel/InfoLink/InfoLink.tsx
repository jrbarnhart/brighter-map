import { SearchDataType } from "@/lib/types/searchTypes";
import { cn } from "@/lib/utils";
import { SetStateAction } from "react";
import { Link } from "react-router";

type InfoLinkProps = {
  children: React.ReactNode;
  to: string;
  variant: SearchDataType;
  className?: string;
  setInfoOpen?: React.Dispatch<SetStateAction<boolean>>;
};

export default function InfoLink({
  children,
  to,
  variant,
  className,
  setInfoOpen,
}: InfoLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "underline text-stone-50 font-bold hover:brightness-125", // Defaults
        variant === "monster" && "text-red-400", // Aggressive, noticeable
        variant === "vendor" && "text-cyan-400", // Slightly more vibrant
        variant === "npc" && "text-lime-400", // Warm, conversational
        variant === "resource" && "text-emerald-400", // Cleaner green
        variant === "miscItem" && "text-slate-400", // Subtle but not invisible
        variant === "consumable" && "text-sky-400", // Soft and friendly
        variant === "weapon" && "text-violet-400", // More saturated
        variant === "armor" && "text-indigo-400", // Slightly cooler than weapon
        variant === "quest" && "text-amber-400", // Brighter and more readable

        className // User added
      )}
      onClick={
        setInfoOpen
          ? () => {
              setInfoOpen(true);
            }
          : undefined
      }
    >
      {children}
    </Link>
  );
}
