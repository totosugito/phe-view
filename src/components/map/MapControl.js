import {cloneElement, useState} from "react";
import { useMap } from "react-leaflet";
import { FaMinus, FaPlus, FaLayerGroup, FaCircleInfo } from "react-icons/fa6";
import CompassControl from "./CompassControl.jsx";
import FullscreenControl from "./FullscreenControl.jsx";
import ViewTileSelection from "./ViewTileSelection.jsx";

const MapControl = ({ children, selectedTile, setSelectedTile, ...props }) => {
  const map = useMap();
  const [showInput, setShowInput] = useState(props?.initialLegend ?? false);
  const [infoViewMode, setInfoViewMode] = useState(props?.legendMode ?? "legend");

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="flex flex-row" style={{ position: "absolute", top: "0px", right: "0px", zIndex: 1000 }}>
      <div className={"flex flex-col mt-[10px]"}>
        <CompassControl />
        <FullscreenControl/>
        <button className={"mt-[30px] my-group-button-first"} onClick={handleZoomIn}><FaPlus /></button>
        <button className={"my-group-button-mid"} onClick={handleZoomOut}><FaMinus /></button>
        <button className={"my-group-button-last"} onClick={() => {
          setInfoViewMode("tile");
          setShowInput(true);
        }}><FaLayerGroup /></button>
        <button className={"mt-4 my-group-button-self"} onClick={() => {
          setInfoViewMode("legend");
          setShowInput(true);
        }}><FaCircleInfo /></button>
      </div>
      {showInput &&
        <div className={"min-h-[300px] w-[200px] bg-white p-2 gap-2 rounded-bl-lg opacity-90"}>
          {infoViewMode === "tile" && <ViewTileSelection visible={showInput} setVisible={setShowInput} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />}
          {((infoViewMode === "legend") && children) && cloneElement(children, {visible: showInput, setVisible: setShowInput})}
        </div>
      }
    </div>
  );
};
export default MapControl;
