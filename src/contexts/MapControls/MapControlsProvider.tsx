import { useCallback, useMemo, useState } from "react";
import { MapControlsContext, PanDirections } from "./MapControlsContext";

export const MapControlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [targetPosition, setTargetPosition] = useState<Position | null>(null);
  const [panDirection, setPanDirection] = useState<PanDirections | null>(null);

  const panToPosition = useCallback(
    ({ x, y, z }: { x: number; y: number; z?: number }) => {
      setTargetPosition({ x, y, z });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      targetPosition,
      setTargetPosition: panToPosition,
      panDirection,
      setPanDirection,
    }),
    [panDirection, panToPosition, targetPosition]
  );

  return (
    <MapControlsContext value={contextValue}>{children}</MapControlsContext>
  );
};
