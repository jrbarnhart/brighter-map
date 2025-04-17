import { ArrowLeftToLine, Ban, Check } from "lucide-react";
import { Button } from "../ui/button";
import type { SetStateAction } from "react";
import { cn } from "@/lib/utils";

export type FiltersState = {
  showLabels: boolean;
  setShowLabels: React.Dispatch<SetStateAction<boolean>>;
  showMonsters: boolean;
  setShowMonsters: React.Dispatch<SetStateAction<boolean>>;
  showResources: boolean;
  setShowResources: React.Dispatch<SetStateAction<boolean>>;
  showPortal: boolean;
  setShowPortal: React.Dispatch<SetStateAction<boolean>>;
  showStorage: boolean;
  setShowStorage: React.Dispatch<SetStateAction<boolean>>;
  showObelisk: boolean;
  setShowObelisk: React.Dispatch<SetStateAction<boolean>>;
};

type FiltersPanelProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  filtersState: FiltersState;
};

type BoolButtonProps = {
  children: React.ReactNode;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
};

function BoolToggleButton({ children, state, setState }: BoolButtonProps) {
  return (
    <Button
      className={cn(
        "flex justify-start cursor-pointer bg-sky-800 hover:bg-sky-600",
        !state && "bg-gray-500 hover:bg-gray-700"
      )}
      onClick={() => {
        setState((prev) => !prev);
      }}
    >
      {state ? <Check /> : <Ban />}
      {children}
    </Button>
  );
}

export default function FiltersPanel({
  open,
  setOpen,
  filtersState,
}: FiltersPanelProps) {
  const {
    showLabels,
    setShowLabels,
    showMonsters,
    setShowMonsters,
    showResources,
    setShowResources,
    showPortal,
    setShowPortal,
    showStorage,
    setShowStorage,
    showObelisk,
    setShowObelisk,
  } = filtersState;
  return (
    <aside
      className={cn(
        "flex flex-col gap-3 p-6 w-full shrink-0 transition-transform duration-300 ease-in-out z-20 absolute left-0 top-0 bottom-0 right-0 bg-stone-900", // Mobile
        open ? "translate-x-0" : "-translate-x-full", // Translate if open
        "md:w-60 md:border-r" // Desktop
      )}
    >
      <Button
        className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-gray-700 hover:bg-gray-500"
        onClick={() => {
          setOpen(false);
        }}
        inert={!open ? true : undefined}
      >
        <ArrowLeftToLine />
      </Button>
      <BoolToggleButton state={showLabels} setState={setShowLabels}>
        Show Labels
      </BoolToggleButton>
      <BoolToggleButton state={showMonsters} setState={setShowMonsters}>
        Show Monsters
      </BoolToggleButton>
      <BoolToggleButton state={showResources} setState={setShowResources}>
        Show Resources
      </BoolToggleButton>
      <BoolToggleButton state={showPortal} setState={setShowPortal}>
        Show Portals
      </BoolToggleButton>
      <BoolToggleButton state={showStorage} setState={setShowStorage}>
        Show Storage
      </BoolToggleButton>
      <BoolToggleButton state={showObelisk} setState={setShowObelisk}>
        Show Obelisks
      </BoolToggleButton>
    </aside>
  );
}
