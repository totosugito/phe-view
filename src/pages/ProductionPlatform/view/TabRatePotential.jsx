import {memo} from "react";
import MapViewPotential from "./MapViewPotential.js";
import {mapLegendProductionRate} from "src/constants/map-config.js";

const TabRatePotential = memo(({values, onClickDetails, title, ...props}) => {
  return(
    <div className={"flex flex-col gap-3 flex-grow w-full h-full"}>
      <MapViewPotential geoPoints={values} mode={"rate"} onClickDetails={onClickDetails} title={title} legends={mapLegendProductionRate} {...props}/>
    </div>
  );
})
export default TabRatePotential