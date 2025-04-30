import { SearchDataType } from "../types/searchTypes";

export const INFO_ICONS: Record<SearchDataType, string> & {
  portal: string;
  storage: string;
  obelisk: string;
} = {
  monster: "🧟",
  vendor: "💰",
  resource: "🪵",
  portal: "🌐",
  storage: "🌀",
  obelisk: "🏛️",
  npc: "🧑", // if you distinguish NPCs
  quest: "📜", // or maybe "⭐"
  consumable: "🧪", // if applicable
  weapon: "⚔️",
  armor: "🛡️",
  miscItem: "📦",
  room: "🧭",
} as const;
