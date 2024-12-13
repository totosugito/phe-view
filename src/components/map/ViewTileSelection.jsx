import { useMap } from "react-leaflet";
import L from "leaflet";
import { mapTileList } from "src/constants/map-config.js";
import ViewInfoLayout from "./ViewInfoLayout";
import {useTranslation} from "react-i18next";

const ViewTileSelection = ({ selectedTile, setSelectedTile, visible, setVisible }) => {
  const {t} = useTranslation();
  const map = useMap();

  const handleLayerChange = (layer) => {
    // Remove the existing tile layer(s)
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    // Add the new tile layer
    L.tileLayer(layer.url).addTo(map);

    setSelectedTile(layer.key);
  };

  return (
    <ViewInfoLayout title={t("map.mapLayers")} visible={visible} setVisible={setVisible}>
      {mapTileList.map((layer) => (
        <div key={layer.key} onClick={() => handleLayerChange(layer)}
             className={`cursor-pointer rounded-md border-4 ${selectedTile === layer.key ? "border-blue-400" : "border-transparent hover:border-purple-300"}`}>
          <div style={{ position: "absolute" }} className={"p-1 bg-base-300 rounded-br-md"}>
            <div className={"text-xs text-neutral font-semibold"}>
              {layer.name}
            </div>
          </div>
          <img src={layer.thumbnail} alt={layer.name} className={"h-[80px] w-full object-cover"} />
        </div>
      ))}
    </ViewInfoLayout>
  );
};
export default ViewTileSelection;
