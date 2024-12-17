import {MapContainer, Marker, Popup, ScaleControl, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import {useState} from "react";
import "src/assets/leaflet/leaflet.css";
import {
  DEFAULT_MAP_TILE,
  defaultMapProps,
  getTileMap,
} from "src/constants/map-config.js";
import {MapControl, ViewCustomLegend} from "shared/components/map";
import {useTranslation} from "react-i18next";

const MapViewPotential = ({geoPoints, mode = "rate", title="", onClickDetails, legends, ...props}) => {
  const {t} = useTranslation();
  const [map, setMap] = useState(null);
  const MapProps = defaultMapProps();
  const [selectedTile, setSelectedTile] = useState(DEFAULT_MAP_TILE);

  const popupKey = [
    {
      type: "text",
      key: "name",
      name: "Name"
    },
    {
      type: "text",
      key: "asset_type",
      name: "Asset Type"
    },
    {
      type: "text",
      key: "remarks",
      name: "Remarks"
    },
    {
      type: "text",
      key: "heading",
      name: "Heading"
    },
    {
      type: "text",
      key: "region",
      name: "Region"
    },
    {
      type: "number",
      key: "x_long",
      name: "X Longitude",
      precision: 8
    },
    {
      type: "number",
      key: "y_lat",
      name: "Y Latitude",
      precision: 8
    },
    {
      type: "number",
      key: "sma7",
      name: `${t("label.sma7")} (${title})`,
      precision: 2
    },
    {
      type: "number",
      key: "sma30",
      name: `${t("label.sma30")} (${title})`,
      precision: 2
    },
    {
      type: "number",
      key: "data",
      name: title,
      precision: 2
    },
    ...props.popup ?? []
  ]

  const ResizeMap = () => {
    const map = useMap();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    const container = document.getElementById("map-container");
    resizeObserver.observe(container);

    return null;
  };

  const mapPointPopup = (point) => {
    return (
      <div className={"flex flex-col gap-3"}>
        <table className={"table table-xs"}>
          <tbody>
          {popupKey.map((item, index) => (
            <tr key={index} className={""}>
              <td className={"w-[160px] text-right"}>{item.name}</td>
              <td className={"font-bold"}>{(item.type === "number") ? point[item.key].toFixed(item.precision ?? 5) : point[item.key]}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className={"flex justify-end"}>
          <div className={"btn btn-sm btn-primary"} onClick={(e) => {
            e.preventDefault();
            if(onClickDetails) {
              onClickDetails(point?.name ??"");
            }
          }}>{t("button.details")}</div>
        </div>
      </div>
    );
  };

  const mapPointMarker = (point) => {
    let legendItem = (mode === "rate") ? legends[point.rate] : legends[point.trend];

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
        id="map-container"
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
        <MapControl selectedTile={selectedTile} setSelectedTile={setSelectedTile} initialLegend={true} legendMode={"legend"}>
          <ViewCustomLegend title={t("shared.mapLegend")} legends={legends}/>
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
        <ResizeMap/>
      </MapContainer>
    </div>
  );
};
export default MapViewPotential;
