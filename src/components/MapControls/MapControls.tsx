import { BookOpen, ListFilterPlus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState, type SetStateAction } from "react";
import useSearch from "@/lib/hooks/useSearch";
import { FuseResult } from "fuse.js";
import { SearchableItem } from "@/lib/types/searchTypes";

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
  const fuse = useSearch();

  const [results, setResults] = useState<FuseResult<SearchableItem>[] | null>(
    null
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fuse) return;
    const searchResults = fuse.search(e.target.value);
    setResults(searchResults);
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
      <div>
        <Label
          htmlFor="search"
          aria-label="Search"
          className="bg-background/90 border border-border rounded-lg pl-2 pointer-events-auto"
        >
          <Search aria-hidden />
          <Input
            ref={searchRef}
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => {
              handleSearchChange(e);
            }}
            className="md:max-w-80 border-l border-t-0 border-r-0 border-b-0 rounded-tl-none rounded-bl-none"
          />
        </Label>
        {results && (
          <div>
            {results.map((result) => (
              <p key={result.item.id}>{result.item.name}</p>
            ))}
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
