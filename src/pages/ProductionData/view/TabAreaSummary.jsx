import AreaCardSummary from "../area/AreaCardSummary.jsx";
import TableArea from "src/pages/ProductionData/area/TableArea.jsx";
import DoughnutAreaWellCount from "src/pages/ProductionData/area/DoughnutAreaWellCount.jsx";
import TopAreaByKey from "src/pages/ProductionData/area/TopAreaByKey.jsx";
import {memo} from "react";
import TableWell from "src/pages/ProductionData/area/TableWell.jsx";
import {COLORS_LIST} from "src/constants/config.js";

const TabAreaSummary = memo(({values}) => {
  const styleRowGroup = "grid md:grid-cols-2 grid-cols-1 gap-3";

  return(
    <div className={"flex flex-col gap-3"}>
      <AreaCardSummary values={values}/>
      <div className={styleRowGroup}>
        <DoughnutAreaWellCount values={values?.areas?.data ?? []}/>
        <TopAreaByKey values={values?.tops["3"] ?? []} title={"Top 5 Wells by Total Actual Oil"}
                      keyPlot={"sum"} xlabel={"Total Actual Oil (bbl)"} ylabel={"Well"} color={COLORS_LIST[0]}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["4"] ?? []} title={"Top 5 Wells by Total Actual Water"}
                      keyPlot={"sum"} xlabel={"Total Actual Water (bbl)"} ylabel={"Well"} color={COLORS_LIST[1]}/>
        <TopAreaByKey values={values?.tops["5"] ?? []} title={"Top 5 Wells by Total Actual Gas"}
                      keyPlot={"sum"} xlabel={"Total Actual Gas (MCF)"} ylabel={"Well"} color={COLORS_LIST[2]}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["7"] ?? []} title={"Top 5 Wells by Total GOR"}
                      keyPlot={"sum"} xlabel={"Total GOR (MCF/bbl)"} ylabel={"Well"} color={COLORS_LIST[3]}/>
        <TopAreaByKey values={values?.tops["8"] ?? []} title={"Top 5 Wells by Total Potential Oil"}
                      keyPlot={"sum"} xlabel={"Total Potential Oil (bbl)"} ylabel={"Well"} color={COLORS_LIST[4]}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["9"] ?? []} title={"Top 5 Wells by Total Potential Water"}
                      keyPlot={"sum"} xlabel={"Total Potential Water (bbl)"} ylabel={"Well"} color={COLORS_LIST[5]}/>
        <TopAreaByKey values={values?.tops["10"] ?? []} title={"Top 5 Wells by Total Potential Gas"}
                      keyPlot={"sum"} xlabel={"Total Potential Gas (MCF)"} ylabel={"Well"} color={COLORS_LIST[6]}/>
      </div>
      <TableArea values={values?.areas?.data ?? []}/>
      <TableWell values={values?.wells ?? []}/>
    </div>
  )
});
export default TabAreaSummary