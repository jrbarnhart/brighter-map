import { useCallback, useMemo, useState } from "react";
import { MapControlsContext } from "./MapControlsContext";

export const MapControlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [targetPosition, setTargetPosition] = useState<Position | null>(null);

  const panToPosition = useCallback(
    ({ x, y, z }: { x: number; y: number; z?: number }) => {
      setTargetPosition({ x, y, z });
    },
    []
  );

  const contextValue = useMemo(
    () => ({ targetPosition, setTargetPosition: panToPosition }),
    [panToPosition, targetPosition]
  );

  return (
    <MapControlsContext value={contextValue}>{children}</MapControlsContext>
  );
};
