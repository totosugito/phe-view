import {MapContainer, Marker, Popup, ScaleControl, TileLayer} from "react-leaflet";
import L from "leaflet";
import {useState} from "react";
import "src/assets/leaflet/leaflet.css";
import {DEFAULT_MAP_TILE, defaultMapProps, getMapLegendItem, getTileMap, mapLegendProductionRate} from "src/constants/map-config.js";
import {MapControl, ViewCustomLegend} from "src/components/map/index.js";
import {useTranslation} from "react-i18next";

const MapView = ({geoPoints}) => {
    const {t} = useTranslation();
    const [map, setMap] = useState(null);
    const MapProps = defaultMapProps();
    const [selectedTile, setSelectedTile] = useState(DEFAULT_MAP_TILE);

    const popupKey = [
        {
            key: "name",
            name: "Name"
        },
        {
            key: "asset_type",
            name: "Asset Type"
        },
        {
            key: "remarks",
            name: "Remarks"
        },
        {
            key: "heading",
            name: "Heading"
        },
        {
            key: "region",
            name: "Region"
        },
        {
            key: "x_long",
            name: "X Longitude"
        },
        {
            key: "y_lat",
            name: "Y Latitude"
        }
    ]

    const mapPointPopup = (point) => {
        return (
            <div className={"flex flex-col gap-3"}>
                <table className={"table table-xs"}>
                    <tbody>
                    {popupKey.map((item, index) => (
                        <tr key={index} className={""}>
                            <td className={"w-[120px] text-right"}>{item.name}</td>
                            <td className={"font-bold"}>{point[item.key]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={"flex justify-end"}>
                    <div className={"btn btn-sm btn-primary"}>{t("button.details")}</div>
                </div>
            </div>
        );
    };

    const mapPointMarker = (point) => {
        const legendItem = getMapLegendItem(mapLegendProductionRate, "excellent");
        const html = `<div
      class="flex rounded-full items-center justify-center border"
      style="background-color: ${legendItem["bgColor"]}; border-color: ${legendItem["borderColor"]};
      position: relative; left: -10px; top: -10px; width: ${legendItem["size"]}; height: ${legendItem["size"]};">
      </div>`;

        return L.divIcon({
            // iconAnchor: [0, 0],
            labelAnchor: [0, 0],
            popupAnchor: [15, 0],
            html: html
        });
    };

    return (
        <div className={"h-full"}>
            <MapContainer
                className={"h-full"}
                style={{zIndex: 0}}
                center={MapProps["initial"]["center"]}
                zoom={MapProps["initial"]["zoom"]}
                ref={setMap}
                zoomControl={false}>
                <TileLayer
                    attribution={getTileMap(selectedTile)["attribution"]}
                    url={getTileMap(selectedTile)["url"]}
                />
                <MapControl selectedTile={selectedTile} setSelectedTile={setSelectedTile}>
                    <ViewCustomLegend title={t("map.mapLegend")} legends={mapLegendProductionRate}/>
                </MapControl>

                {geoPoints &&
                    geoPoints.map((point, index) => (
                        <Marker key={index} position={[point?.y_lat, point?.x_long]} icon={mapPointMarker(point)}>
                            <Popup minWidth={350} maxWidth={450}>
                                {mapPointPopup(point)}
                            </Popup>
                        </Marker>
                    ))
                }
                <ScaleControl imperial={false}/>
            </MapContainer>
        </div>
    );
};
export default MapView;
