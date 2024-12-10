import {memo} from "react";
import MapView from "./MapView.js";

const TabRate = memo(({values, onClickDetails}) => {
  return(
    <div className={"flex flex-col gap-3 flex-grow w-full h-full"}>
      <MapView geoPoints={values} mode={"rate"} onClickDetails={onClickDetails}/>
    </div>
  );
})
export default TabRate