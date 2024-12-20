import {memo} from "react";
import MapViewPotential from "./MapViewPotential.js";
import {mapLegendProductionPerformance} from "src/constants/map-config.js";

const TabPerformance = memo(({values, onClickDetails, title, ...props}) => {
  return(
    <div className={"flex flex-col gap-3 flex-grow w-full h-full"}>
      <MapViewPotential geoPoints={values} mode={"trend"} onClickDetails={onClickDetails} title={title} legends={mapLegendProductionPerformance} {...props}/>
    </div>
  );
})
export default TabPerformance