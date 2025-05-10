import { ArrowRightToLine, Home } from "lucide-react";
import { Button } from "../ui/button";
import { type SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Link, Outlet } from "react-router";
import { CombinedRoomMap } from "@/lib/hooks/useCombinedMap";
import { ScreenSize } from "@/lib/hooks/useScreenSize";

type InfoPanelProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  combinedRoomMap: CombinedRoomMap;
  screenSize: ScreenSize;
};

export type InfoPanelContext = {
  open: boolean;
  searchRef: React.RefObject<HTMLInputElement | null> | undefined;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>> | undefined;
  combinedRoomMap: CombinedRoomMap;
  screenSize: ScreenSize;
};

export default function InfoPanel({
  open,
  setOpen,
  searchRef,
  combinedRoomMap,
  screenSize,
}: InfoPanelProps) {
  // Context for info panel outlet details routes
  const infoPanelContext: InfoPanelContext = {
    open,
    searchRef,
    setInfoOpen: setOpen,
    combinedRoomMap,
    screenSize,
  };

  return (
    <aside
      inert={!open ? true : undefined}
      className={cn(
        "flex flex-col gap-3 p-6 shrink-0 transition-transform duration-300 ease-in-out z-20 absolute top-0 bottom-0 right-0 bg-stone-900 w-full", // Mobile
        open ? "translate-x-0" : "translate-x-full", // Translate if open
        "md:border-l md:max-w-[20rem]", // 768px
        "lg:max-w-[32rem]", // 1024px
        "xl:max-w-[40rem]" // 1280px
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          aria-label="Home"
          className="flex items-center gap-1 cursor-pointer text-white py-2 px-3 w-10 h-10 md:w-12 md:h-12  rounded-md border border-stone-400 bg-gray-700 hover:bg-gray-500"
        >
          <Home />
        </Link>
        <Button
          aria-label="Close Info Panel"
          className="self-end w-10 h-10 md:w-12 md:h-12 cursor-pointer border border-stone-400 bg-gray-700 hover:bg-gray-500"
          onClick={() => {
            setOpen(false);
          }}
        >
          <ArrowRightToLine />
        </Button>
      </div>
      <div className="overflow-y-auto">
        <Outlet context={infoPanelContext} />
      </div>
    </aside>
  );
}
