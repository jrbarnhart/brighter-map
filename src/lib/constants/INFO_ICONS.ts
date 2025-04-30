export const INFO_ICONS = {
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
} as const;

export type InfoIconsType = keyof typeof INFO_ICONS;
