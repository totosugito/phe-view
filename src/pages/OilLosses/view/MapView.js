import {MapContainer, Marker, Popup, ScaleControl, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import {useState} from "react";
import "src/assets/leaflet/leaflet.css";
import {
  DEFAULT_MAP_TILE,
  defaultMapProps,
  getTileMap,
  mapLegendProductionRate,
  mapLegendProductionTrend
} from "src/constants/map-config.js";
import {MapControl, ViewCustomLegend} from "shared/components/map";
import {useTranslation} from "react-i18next";

const MapView = ({geoPoints, mode = "rate", onClickDetails}) => {
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
    },
    {
      key: "daily_actual_oil_losses",
      name: "Est. Actual Oil Losses"
    },
    {
      key: "daily_actual_oil_losses_sma7",
      name: t("label.sma7")
    },
    {
      key: "daily_actual_oil_losses_sma30",
      name: t("label.sma30")
    }
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
              <td className={"w-[150px] text-right"}>{item.name}</td>
              <td className={"font-bold"}>{point[item.key]}</td>
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
    let legendItem = (mode === "rate") ? mapLegendProductionRate[point.rate] : mapLegendProductionTrend[point.trend];

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
          <ViewCustomLegend title={t("shared.mapLegend")} legends={(mode === "rate") ? mapLegendProductionRate : mapLegendProductionTrend}/>
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
export default MapView;
