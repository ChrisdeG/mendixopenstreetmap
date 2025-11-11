import React, { useMemo, createElement, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getColorMarker, MarkerColor } from "./colormarkers";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

type MultiPolyline = Array<Array<[number, number]>>;
type MarkerData = { id: string; position: [number, number]; label?: string; icon?: MarkerColor };

interface LeafletMapProps {
    center: [number, number];
    zoom?: number;
    height?: string;
    width?: string;
    scrollwheelzoom?: boolean;
    markers?: MarkerData[];
    multipolyline?: MultiPolyline;
    linecolors?: string[];
    onMapClick?: (e: L.LeafletMouseEvent) => void;
    onMarkerClick?: (markerid: string) => void;
}

interface MapUpdaterProps {
    center: [number, number];
    zoom?: number;
}

const MapClickHandler: React.FC<{ onClick: (e: L.LeafletMouseEvent) => void }> = ({ onClick }) => {
    useMapEvents(
        useMemo(
            () => ({
                click(e) {
                    onClick(e);
                }
            }),
            [onClick]
        )
    );
    return null;
};

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom ?? map.getZoom());
    }, [center, zoom, map]);

    return null;
};

export const LeafletMap: React.FC<LeafletMapProps> = ({
    center,
    zoom,
    height,
    width,
    scrollwheelzoom,
    markers = [],
    multipolyline = [],
    linecolors = [],
    onMapClick,
    onMarkerClick
}) => {
    const style = { height, width };

    const handleMarkerClick = (markerId: string): void => {
        if (onMarkerClick) {
            onMarkerClick(markerId);
        }
    };
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollwheelzoom} style={style}>
            {onMapClick && <MapClickHandler onClick={onMapClick} />}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((m, i) => (
                <Marker
                    key={i}
                    position={m.position}
                    icon={getColorMarker(m.icon)}
                    eventHandlers={{ click: () => handleMarkerClick(m.id || `marker-${i}`) }}
                >
                    {m.label && <Tooltip>{m.label}</Tooltip>}
                </Marker>
            ))}
            {multipolyline.map((line, index) => (
                <Polyline
                    key={index}
                    positions={line}
                    pathOptions={{ color: linecolors[index] || "gray", weight: 4 }}
                />
            ))}

            <MapUpdater center={center} zoom={zoom ? zoom : undefined} />
        </MapContainer>
    );
};
