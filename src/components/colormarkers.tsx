import L, { Icon, IconOptions } from "leaflet";

// 🧭 Import all non-2x marker icons statically so Mendix bundles them

import iconBlue from "../ui/img/marker-icon-blue.png";
import iconGold from "../ui/img/marker-icon-gold.png";
import iconRed from "../ui/img/marker-icon-red.png";
import iconGreen from "../ui/img/marker-icon-green.png";
import iconOrange from "../ui/img/marker-icon-orange.png";
import iconYellow from "../ui/img/marker-icon-yellow.png";
import iconViolet from "../ui/img/marker-icon-violet.png";
import iconGrey from "../ui/img/marker-icon-grey.png";
import iconBlack from "../ui/img/marker-icon-black.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Define supported colors
export type MarkerColor = "blue" | "gold" | "red" | "green" | "orange" | "yellow" | "violet" | "grey" | "black";

// Map each color to its imported file
const iconMap: Record<MarkerColor, string> = {
    blue: iconBlue,
    gold: iconGold,
    red: iconRed,
    green: iconGreen,
    orange: iconOrange,
    yellow: iconYellow,
    violet: iconViolet,
    grey: iconGrey,
    black: iconBlack
};

// Common icon options
const commonOpts: Omit<IconOptions, "iconUrl"> = {
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
};

// Build all Leaflet icon instances
export const colorMarkers: Record<MarkerColor, Icon> = Object.fromEntries(
    Object.entries(iconMap).map(([color, iconUrl]) => [color, new L.Icon({ iconUrl, ...commonOpts })])
) as Record<MarkerColor, Icon>;

// Helper to pick a color safely
export function getColorMarker(color?: MarkerColor): Icon {
    return color ? colorMarkers[color] ?? colorMarkers.blue : colorMarkers.blue;
}

export const colorMarkerList = (Object.keys(colorMarkers) as MarkerColor[]).map(color => ({
    color,
    icon: colorMarkers[color]
}));

export function toMarkerColor(value?: string): MarkerColor | undefined {
    if (!value) {
        return undefined;
    }

    const normalized = value.trim().toLowerCase();

    const validColors: MarkerColor[] = ["blue", "gold", "red", "green", "orange", "yellow", "violet", "grey", "black"];

    return validColors.includes(normalized as MarkerColor) ? (normalized as MarkerColor) : undefined;
}
