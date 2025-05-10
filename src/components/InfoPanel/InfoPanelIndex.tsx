import { useOutletContext } from "react-router";
import { Button } from "../ui/button";
import { InfoPanelContext } from "./InfoPanel";

export default function InfoPanelIndex() {
  const context: InfoPanelContext | undefined = useOutletContext();
  const { searchRef, setInfoOpen } = context || {};

  const onSearchClick = () => {
    if (context && searchRef && searchRef.current && setInfoOpen) {
      searchRef.current.focus();
      setInfoOpen((prev) => !prev);
    }
  };

  return (
    <div className="text-white flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Brighter Map</h1>
      <p>Click or tap a room to see info about that room's contents.</p>
      <div className="flex items-baseline">
        <Button
          variant={"link"}
          onClick={onSearchClick}
          className="p-0 pr-1.5 text-sky-400 hover:brightness-125 text-base font-bold cursor-pointer"
        >
          Search
        </Button>
        <p>to find something specific.</p>
      </div>
    </div>
  );
}
