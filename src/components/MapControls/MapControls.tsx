import { BookOpen, ListFilterPlus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, type SetStateAction } from "react";
import useSearch from "@/lib/hooks/useSearch";
import InfoLink from "../InfoPanel/InfoLink/InfoLink";
import { INFO_ICONS } from "@/lib/constants/INFO_ICONS";

type MapControlsProps = {
  setFiltersOpen: React.Dispatch<SetStateAction<boolean>>;
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>;
  searchRef: React.RefObject<HTMLInputElement | null>;
};

export default function MapControls({
  setFiltersOpen,
  setInfoOpen,
  searchRef,
}: MapControlsProps) {
  const { query, setQuery, results, searchHandler } = useSearch();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search results if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setQuery(""); // Clear the query to hide results
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setQuery]);

  // Reopen search results on focus
  const handleSearchFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      searchHandler(e);
    }
  };

  return (
    <div
      id="map-controls-container"
      className="w-full flex items-center justify-between gap-4 pointer-events-none"
    >
      <Button
        aria-label="Open Filters Panel"
        className="cursor-pointer bg-sky-800 hover:bg-sky-600 md:h-14 md:w-14 pointer-events-auto"
        onClick={() => {
          setFiltersOpen(true);
        }}
      >
        <ListFilterPlus aria-hidden />
      </Button>
      <div className="relative" ref={searchContainerRef}>
        <div className="flex items-center bg-background/90 border border-border rounded-lg overflow-hidden pointer-events-auto focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
          <div className="pl-3 text-muted-foreground">
            <Search aria-hidden />
          </div>
          <Input
            ref={searchRef}
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              searchHandler(e);
            }}
            onFocus={handleSearchFocus}
            className="flex-1 bg-transparent border-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground"
          />
        </div>

        {query.length > 0 && results && results.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-md shadow-lg ring-1 ring-border bg-stone-900/80 backdrop-blur-md overflow-y-auto max-h-52 border border-muted pointer-events-auto">
            {results.map((result) => (
              <div
                key={`${result.item.type}-${result.item.id.toString()}`}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-700 cursor-pointer transition"
              >
                <span>{INFO_ICONS[result.item.type]}</span>
                <InfoLink
                  to={result.item.url}
                  variant={result.item.type}
                  setInfoOpen={setInfoOpen}
                >
                  {result.item.name}
                </InfoLink>
              </div>
            ))}
          </div>
        )}

        {query.length > 0 && results && results.length === 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-background/95 px-3 py-2 text-muted-foreground text-sm border border-muted pointer-events-auto">
            No results found.
          </div>
        )}
      </div>
      <Button
        aria-label="Open Info Panel"
        className="cursor-pointer bg-green-800 hover:bg-green-600 md:h-14 md:w-14 pointer-events-auto"
        onClick={() => {
          setInfoOpen(true);
        }}
      >
        <BookOpen aria-hidden />
      </Button>
    </div>
  );
}
