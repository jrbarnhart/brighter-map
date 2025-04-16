import { BookOpen, ListFilterPlus, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import type { SetStateAction } from 'react'

type MapSearchBar = {
  setFiltersOpen: React.Dispatch<SetStateAction<boolean>>
  setInfoOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function MapControls({
  setFiltersOpen,
  setInfoOpen,
}: MapSearchBar) {
  return (
    <div
      id="map-search-container"
      className="w-full flex items-center justify-between gap-4"
    >
      <Button
        aria-label="Open Filters Panel"
        className="cursor-pointer bg-sky-800 hover:bg-sky-600 md:h-14 md:w-14"
        onClick={() => {
          setFiltersOpen(true)
        }}
      >
        <ListFilterPlus aria-hidden />
      </Button>
      <Label
        htmlFor="search"
        aria-label="Search"
        className="bg-background/90 border border-border rounded-lg pl-2"
      >
        <Search aria-hidden />
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="md:max-w-80 border-l border-t-0 border-r-0 border-b-0 rounded-tl-none rounded-bl-none"
        />
      </Label>
      <Button
        aria-label="Open Info Panel"
        className="cursor-pointer bg-green-800 hover:bg-green-600 md:h-14 md:w-14"
        onClick={() => {
          setInfoOpen(true)
        }}
      >
        <BookOpen aria-hidden />
      </Button>
    </div>
  )
}
