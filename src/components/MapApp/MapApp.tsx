import { SetStateAction, useRef } from "react";
import FiltersPanel, { FiltersState } from "../FiltersPanel/FiltersPanel";
import InfoPanel from "../InfoPanel/InfoPanel";
import MapControls from "../MapControls/MapControls";
import WorldMap from "../WorldMap/WorldMap";
import { BaseMapData } from "@/queries/baseMapData/baseMapData";
import useCombinedData from "@/lib/hooks/useCombinedData";

type MapAppProps = {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<SetStateAction<boolean>>;
  infoOpen: boolean;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>;
  baseMapData: BaseMapData;
  filtersState: FiltersState;
};

export default function MapApp({
  filtersOpen,
  setFiltersOpen,
  infoOpen,
  setInfoOpen,
  filtersState,
  baseMapData,
}: MapAppProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const combinedRoomData = useCombinedData({ baseMapData });

  return (
    <div
      id="app-container"
      className="relative h-svh w-svw flex overflow-hidden"
    >
      <FiltersPanel
        open={filtersOpen}
        setOpen={setFiltersOpen}
        filtersState={filtersState}
      />
      <div className="w-full absolute top-0 right-0 z-10 p-8 pointer-events-none">
        <MapControls
          setFiltersOpen={setFiltersOpen}
          setInfoOpen={setInfoOpen}
          searchRef={searchRef}
        />
      </div>
      <WorldMap
        combinedRoomData={combinedRoomData}
        filtersState={filtersState}
        setInfoOpen={setInfoOpen}
      />
      <InfoPanel
        open={infoOpen}
        setOpen={setInfoOpen}
        searchRef={searchRef}
        combinedRoomData={combinedRoomData}
      />
    </div>
  );
}
