import { BookOpen, ListFilterPlus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { type SetStateAction } from "react";
import useSearch from "@/lib/hooks/useSearch";
import InfoLink from "../InfoPanel/InfoLink/InfoLink";

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
  const { results, searchHandler } = useSearch();

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
      <div className="relative">
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
              searchHandler(e);
            }}
            className="md:max-w-80 border-l border-t-0 border-r-0 border-b-0 rounded-tl-none rounded-bl-none"
          />
        </Label>
        {results && (
          <div className="absolute pointer-events-auto grid bg-stone-900/85 px-4 py-2 max-h-40 overflow-y-auto">
            {results.map((result) => (
              <InfoLink
                to={result.item.url}
                variant={result.item.type}
                key={`${result.item.type}-${result.item.id.toString()}`}
                setInfoOpen={setInfoOpen}
              >
                {result.item.name}
              </InfoLink>
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
