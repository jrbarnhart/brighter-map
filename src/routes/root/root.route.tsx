import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import MapControls from "@/components/MapControls/MapControls";
import WorldMap from "@/components/WorldMap/WorldMap";
// import useLazyQueries from "@/lib/hooks/useLazyQueries";
import { baseMapDataQueryOptions } from "@/queries/baseMapData/baseMapDataQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function RootRoute() {
  // Base map data comes from loader
  const { data, isLoading, isError } = useQuery(baseMapDataQueryOptions);

  // Side panel state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Lazy data loading
  //const { data: lazyData, handlers: lazyHandlers } = useLazyQueries();

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data) return <p>Error!</p>;

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
      <WorldMap baseMapData={data} />
      <InfoPanel open={infoOpen} setOpen={setInfoOpen} />
    </div>
  );
}

export default RootRoute;
