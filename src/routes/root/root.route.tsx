import { FiltersState } from "@/components/FiltersPanel/FiltersPanel";
import MapApp from "@/components/MapApp/MapApp";

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

  // Filters state
  const [showLabels, setShowLabels] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMonsters, setShowMonsters] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [showPortal, setShowPortal] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const filtersState: FiltersState = {
    showLabels,
    setShowLabels,
    showNames,
    setShowNames,
    showMonsters,
    setShowMonsters,
    showPortal,
    setShowPortal,
    showResources,
    setShowResources,
    showStorage,
    setShowStorage,
  };

  // Lazy data loading
  //const { data: lazyData, handlers: lazyHandlers } = useLazyQueries();

  // TODO: Replace with loading interface
  if (isLoading) return <p>Loading...</p>;

  // TODO: Throw an error after error boundary established with react router
  if (isError || !data) return <p>Error!</p>;

  return (
    <MapApp
      baseMapData={data}
      filtersOpen={filtersOpen}
      filtersState={filtersState}
      setFiltersOpen={setFiltersOpen}
      infoOpen={infoOpen}
      setInfoOpen={setInfoOpen}
    />
  );
}

export default RootRoute;
