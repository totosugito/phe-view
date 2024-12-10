import {memo} from "react";
import MapView from "./MapView.js";

const TabTrend = memo(({values, onClickDetails, title}) => {

  return(
    <div className={"flex flex-col gap-3 flex-grow w-full h-full"}>
      <MapView geoPoints={values} mode={"trend"} onClickDetails={onClickDetails} title={title}/>
    </div>
  );
})
export default TabTrend