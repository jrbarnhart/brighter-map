type RoomRenderData = Array<RoomRenderItem>;

type RoomRenderItem = {
  name: string;
  originOffset: [number, number];
  points: Array<[number, number]>;
  fillColor: string;
  borderColor: string;
  labelOffset?: [number, number];
};

type Position = {
  x: number;
  y: number;
  z?: number;
};
