import AreaCardSummary from "../area/AreaCardSummary.jsx";
import TableArea from "src/pages/Home/area/TableArea.jsx";
import DoughnutAreaWellCount from "src/pages/Home/area/DoughnutAreaWellCount.jsx";
import TopAreaByKey from "src/pages/Home/area/TopAreaByKey.jsx";
import {memo} from "react";
import TableWell from "src/pages/Home/area/TableWell.jsx";

const TabAreaSummary = memo(({values}) => {
  const styleRowGroup = "grid md:grid-cols-2 grid-cols-1 gap-3";

  return(
    <div className={"flex flex-col gap-3"}>
      <AreaCardSummary values={values}/>
      <div className={styleRowGroup}>
        <DoughnutAreaWellCount values={values?.areas?.data ?? []}/>
        <TopAreaByKey values={values?.tops["3"] ?? []} title={"Top 5 Wells by Total Actual Oil"}
                      keyPlot={"sum"} xlabel={"Total Actual Oil (bbl)"} ylabel={"Well"}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["4"] ?? []} title={"Top 5 Wells by Total Actual Water"}
                      keyPlot={"sum"} xlabel={"Total Actual Water (bbl)"} ylabel={"Well"} barColor={"purple"}/>
        <TopAreaByKey values={values?.tops["5"] ?? []} title={"Top 5 Wells by Total Actual Gas"}
                      keyPlot={"sum"} xlabel={"Total Actual Gas (MCF)"} ylabel={"Well"} barColor={"green"}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["7"] ?? []} title={"Top 5 Wells by Total GOR"}
                      keyPlot={"sum"} xlabel={"Total GOR (MCF/bbl)"} ylabel={"Well"} barColor={"grey"}/>
        <TopAreaByKey values={values?.tops["8"] ?? []} title={"Top 5 Wells by Total Potential Oil"}
                      keyPlot={"sum"} xlabel={"Total Potential Oil (bbl)"} ylabel={"Well"} barColor={"orange"}/>
      </div>
      <div className={styleRowGroup}>
        <TopAreaByKey values={values?.tops["9"] ?? []} title={"Top 5 Wells by Total Potential Water"}
                      keyPlot={"sum"} xlabel={"Total Potential Water (bbl)"} ylabel={"Well"} barColor={"teal"}/>
        <TopAreaByKey values={values?.tops["10"] ?? []} title={"Top 5 Wells by Total Potential Gas"}
                      keyPlot={"sum"} xlabel={"Total Potential Gas (MCF)"} ylabel={"Well"} barColor={"purple"}/>
      </div>
      <TableArea values={values?.areas?.data ?? []}/>
      <TableWell values={values?.wells ?? []}/>
    </div>
  )
});
export default TabAreaSummary