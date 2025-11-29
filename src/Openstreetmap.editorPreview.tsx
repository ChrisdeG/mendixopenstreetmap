import { ReactElement, createElement } from "react";
//import { OpenstreetmapPreviewProps } from "../typings/OpenstreetmapProps";
import leafletImg from "./ui/img/leaflet.png";

function parentInline(node?: HTMLElement | null): void {
    // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
    if (node && node.parentElement && node.parentElement.parentElement) {
        node.parentElement.parentElement.style.display = "inline-block";
    }
}
/*
function transformProps(props: OpenstreetmapPreviewProps): OpenstreetmapPreviewProps {
    return {
        translate(text: string) {
            return text;
        },
        className: props.className,
        class: "",
        style: "",
        readOnly: false,
        renderMode: "design",
        zoom: "13",
        height: "",
        width: "",
        scrollwheelzoom: false,
        routesentity: null,
        routecolor: "",
        pointsentity: null,
        pointstoroute: "",
        lonattribute: "",
        latattribute: "",
        pointsortorderattr: "",
        onClickAction: null,
        markersentity: null,
        markerlonattr: "",
        markerlatattr: "",
        markercolorattr: "",
        markerlabelattr: "",
        lonclickattr: "",
        latclickattr: "",
        markerAction: null,
        centerlatitude: "51.926517",
        centerlongitude: "4.462456"
    };
}
*/
export function preview(): ReactElement {
    return (
        <div ref={parentInline}>
            <img src={leafletImg} />
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/Openstreetmap.css");
}
