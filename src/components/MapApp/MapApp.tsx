import { SetStateAction } from "react";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import InfoPanel from "../InfoPanel/InfoPanel";
import MapControls from "../MapControls/MapControls";
import WorldMap from "../WorldMap/WorldMap";
import { BaseMapData } from "@/queries/baseMapData/baseMapData";

type MapAppProps = {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<SetStateAction<boolean>>;
  infoOpen: boolean;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>;
  baseMapData: BaseMapData;
};

export default function MapApp({
  filtersOpen,
  setFiltersOpen,
  infoOpen,
  setInfoOpen,
  baseMapData,
}: MapAppProps) {
  return (
    <div
      id="app-container"
      className="relative h-svh w-svw flex overflow-hidden"
    >
      <FiltersPanel open={filtersOpen} setOpen={setFiltersOpen} />
      <div className="w-full absolute top-0 right-0 z-10 p-8">
        <MapControls
          setFiltersOpen={setFiltersOpen}
          setInfoOpen={setInfoOpen}
        />
      </div>
      <WorldMap baseMapData={baseMapData} />
      <InfoPanel open={infoOpen} setOpen={setInfoOpen} />
    </div>
  );
}
