import {cloneElement, useState} from "react";
import { useMap } from "react-leaflet";
import { FaMinus, FaPlus, FaLayerGroup, FaCircleInfo } from "react-icons/fa6";
import CompassControl from "./CompassControl.jsx";
import FullscreenControl from "./FullscreenControl.jsx";
import ViewTileSelection from "./ViewTileSelection.jsx";

const MapControl = ({ children, selectedTile, setSelectedTile }) => {
  const map = useMap();
  const [showInput, setShowInput] = useState(false);
  const [infoViewMode, setInfoViewMode] = useState("legend");

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
        <div className={"h-screen w-[256px] bg-white p-3 gap-2"}>
          {infoViewMode === "tile" && <ViewTileSelection visible={showInput} setVisible={setShowInput} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />}
          {children && cloneElement(children, {visible: showInput, setVisible: setShowInput})}
        </div>
      }
    </div>
  );
};
export default MapControl;
