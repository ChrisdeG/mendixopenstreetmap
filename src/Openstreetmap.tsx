import { ReactElement, useState, useEffect, useCallback, createElement } from "react";
import { OpenstreetmapContainerProps } from "../typings/OpenstreetmapProps";
import { Big } from "big.js";
import L from "leaflet";
import { LeafletMap } from "./components/leafletmap";
import "./ui/Openstreetmap.css";
import { MarkerColor, toMarkerColor } from "./components/colormarkers";

type MultiPolyline = Array<Array<[number, number]>>;

type MarkerData = {
    id: string;
    position: [number, number];
    label?: string;
    opacity?: number;
    icon?: MarkerColor;
};

type CenterData = [number, number];

export function Openstreetmap(props: OpenstreetmapContainerProps): ReactElement {
    const { onClickAction, markerAction, markersentity } = props;
    const [multipolyline, setMultipolyline] = useState<MultiPolyline>([]);
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [lineColors, setLineColors] = useState<string[]>([]);

    const [center, setCenter] = useState<CenterData>([
        props.centerlatitude?.value ? Number(props.centerlatitude?.value) : 51.926517,
        props.centerlongitude?.value ? Number(props.centerlongitude?.value) : 4.462456
    ]);

    useEffect(() => {
        const lat = Number(props.centerlatitude?.value?.toNumber());
        const lon = Number(props.centerlongitude?.value);
        if (!isNaN(lat) && !isNaN(lon)) {
            setCenter([lat, lon]);
        }
    }, [props.centerlatitude, props.centerlongitude]);

    useEffect(() => {
        const multipolyline: MultiPolyline = [];
        const markers: MarkerData[] = [];
        const linecolors: string[] = [];
        const routeIndexMap = new Map<string, number>();
        props.routesentity.items?.forEach((route, index) => {
            const color = props.routecolor.get(route).value?.toString();
            linecolors.push(color ? color : "blue");
            if (route.id) {
                routeIndexMap.set(route.id, index);
            }
        });

        props.markersentity?.items?.forEach(marker => {
            const markerlon = Number(props.markerlonattr?.get(marker).value);
            const markerlat = Number(props.markerlatattr?.get(marker).value);
            const markercolor = toMarkerColor(props.markercolorattr?.get(marker).displayValue);
            const label = props.markerlabelattr?.get(marker).displayValue;
            if (!isNaN(markerlat) && !isNaN(markerlon)) {
                markers.push({ id: marker.id, position: [markerlat, markerlon], label, icon: markercolor });
            }
        });

        if (props.pointsentity.items) {
            const sortedItems = props.pointsentity.items.sort((a, b) => {
                const orderA = Number(props.pointsortorderattr.get(a).value);
                const orderB = Number(props.pointsortorderattr.get(b).value);
                return orderA - orderB; // ascending order
            });

            sortedItems.forEach(e => {
                const lon = Number(props.lonattribute.get(e).value);
                const lat = Number(props.latattribute.get(e).value);
                if (!isNaN(lat) && !isNaN(lon)) {
                    const routeRef = props.pointstoroute.get(e).value;
                    if (routeRef && typeof routeRef === "object" && "id" in routeRef) {
                        const routeIndex = routeIndexMap.get(routeRef.id);
                        if (routeIndex !== undefined) {
                            if (!multipolyline[routeIndex]) {
                                multipolyline[routeIndex] = [];
                            }
                            multipolyline[routeIndex].push([lat, lon]);
                        }
                    }
                }
            });
        }

        setLineColors(linecolors);
        setMultipolyline(multipolyline);
        setMarkers(markers);
    }, [props]);

    const onClick = useCallback(
        (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;
            props.latclickattr?.setValue(Big(lat.toFixed(8)));
            props.lonclickattr?.setValue(Big(lng.toFixed(8)));
            if (onClickAction && onClickAction.canExecute) {
                onClickAction.execute();
            }
        },
        [onClickAction, props.latclickattr, props.lonclickattr]
    );

    const onMarkerClick = useCallback(
        (id: string) => {
            if (id && markerAction) {
                // Find the marker object from the Mendix data source
                const markerObject = markersentity?.items?.find(marker => marker.id === id);
                if (markerObject) {
                    // Pass the marker object directly as the action parameter
                    markerAction.get(markerObject).execute();
                }
            }
        },
        [markerAction, markersentity]
    );

    // === Render ===
    return (
        <div>
            <LeafletMap
                center={center}
                zoom={props.zoom ? props.zoom?.value?.toNumber() : 13}
                height={props.height ? props.height.value : ""}
                width={props.width ? props.width.value : ""}
                markers={markers}
                multipolyline={multipolyline}
                linecolors={lineColors}
                onMapClick={onClick}
                onMarkerClick={onMarkerClick}
            ></LeafletMap>
        </div>
    );
}
