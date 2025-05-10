import { FiltersState } from "@/components/FiltersPanel/FiltersPanel";
import MapApp from "@/components/MapApp/MapApp";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

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
  const [showVendors, setShowVendors] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showMonsters, setShowMonsters] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [showPortal, setShowPortal] = useState(true);
  const [showStorage, setShowStorage] = useState(true);
  const [showObelisk, setShowObelisk] = useState(true);
  const filtersState: FiltersState = {
    showVendors,
    setShowVendors,
    showLabels,
    setShowLabels,
    showMonsters,
    setShowMonsters,
    showPortal,
    setShowPortal,
    showResources,
    setShowResources,
    showStorage,
    setShowStorage,
    showObelisk,
    setShowObelisk,
  };

  if (isLoading) return <SplashScreen />;

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
