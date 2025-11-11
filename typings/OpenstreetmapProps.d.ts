/**
 * This file was generated from Openstreetmap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListReferenceValue, ListReferenceSetValue } from "mendix";
import { Big } from "big.js";

export interface OpenstreetmapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    zoom: DynamicValue<Big>;
    centerlatitude?: DynamicValue<Big>;
    centerlongitude?: DynamicValue<Big>;
    height: DynamicValue<string>;
    width: DynamicValue<string>;
    scrollwheelzoom: boolean;
    routesentity?: ListValue;
    routecolor?: ListExpressionValue<string>;
    pointsentity?: ListValue;
    pointstoroute?: ListReferenceValue | ListReferenceSetValue;
    lonattribute?: ListAttributeValue<Big>;
    latattribute?: ListAttributeValue<Big>;
    pointsortorderattr?: ListAttributeValue<Big>;
    onClickAction?: ActionValue;
    markersentity?: ListValue;
    markerlonattr?: ListAttributeValue<Big>;
    markerlatattr?: ListAttributeValue<Big>;
    markercolorattr?: ListAttributeValue<string>;
    markerlabelattr?: ListAttributeValue<string>;
    markerAction?: ListActionValue;
    lonclickattr?: EditableValue<Big>;
    latclickattr?: EditableValue<Big>;
}

export interface OpenstreetmapPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    zoom: string;
    centerlatitude: string;
    centerlongitude: string;
    height: string;
    width: string;
    scrollwheelzoom: boolean;
    routesentity: {} | { caption: string } | { type: string } | null;
    routecolor: string;
    pointsentity: {} | { caption: string } | { type: string } | null;
    pointstoroute: string;
    lonattribute: string;
    latattribute: string;
    pointsortorderattr: string;
    onClickAction: {} | null;
    markersentity: {} | { caption: string } | { type: string } | null;
    markerlonattr: string;
    markerlatattr: string;
    markercolorattr: string;
    markerlabelattr: string;
    markerAction: {} | null;
    lonclickattr: string;
    latclickattr: string;
}
