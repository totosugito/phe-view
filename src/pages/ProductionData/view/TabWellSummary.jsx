import {memo, useEffect, useState} from "react";
import FilterView from "src/pages/ProductionData/well/FilterView.js";
import WellCardSummary from "src/pages/ProductionData/well/WellCardSummary.jsx";
import TableWell from "src/pages/ProductionData/well/TableWell.jsx";
import ChartLineView from "src/pages/ProductionData/well/ChartLineView.js";
import {COLORS_LIST} from "shared/config/config.js";

const TabWellSummary = memo(({raw, values}) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [well, setWell] = useState(null);
  const [data, setData] = useState(null);
  const styleRowGroup = "grid md:grid-cols-2 grid-cols-1 gap-3";

  useEffect(() => {
    initData();
    filterOnChange(0);
  }, [values])

  const initData = () => {
    let values_ = [];
    for(let i=0; i<values.length; i++) {
      let item = values[i];
      values_.push({value: i, label: item?.well});
    }
    setFilterDropdown(values_);
  }

  const filterOnChange =(v) => {
    let well_ = values[v];
    setWell(well_);
    let data_ = [];
    for(let i=well_.start; i<=well_.end; i++) {
      data_.push(raw[i]);
    }
    setData(data_);
  }

  return(
    <div className={"flex flex-col gap-3"}>
      {filterDropdown && <FilterView values={filterDropdown} onChange={filterOnChange}/>}
      <div className={"text-center text-2xl font-bold text-primary my-3"}>{well?.well}</div>
      {well && <WellCardSummary values={well}/>}
      {data && <div className={"flex flex-col gap-3"}>

        <div className={styleRowGroup}>
          <ChartLineView values={data ?? []} title={"Time vs Oil (bbl)"}
                         xlabel={"Time"} ylabel={"Oil (bbl)"} color={COLORS_LIST[0]} keyX="1" keyY="3"
                         color2={COLORS_LIST[1]} keyY2={"8"} label1={"Actual Oil"} label2={"Potential Oil"}/>
          <ChartLineView values={data ?? []} title={"Time vs Water (bbl)"}
                         xlabel={"Time"} ylabel={"Water (bbl)"} color={COLORS_LIST[2]} keyX="1" keyY="4"
                         color2={COLORS_LIST[3]} keyY2={"9"} label1={"Actual Water"} label2={"Potential Water"}/>
        </div>

        <div className={styleRowGroup}>
          <ChartLineView values={data ?? []} title={"Time vs Gas (MCF)"}
                         xlabel={"Time"} ylabel={"Gas (MCF)"} color={COLORS_LIST[4]} keyX="1" keyY="5"
                         color2={COLORS_LIST[5]} keyY2={"10"} label1={"Actual Gas"} label2={"Potential Gas"}/>
          <ChartLineView values={data ?? []} title={"Time vs GOR (MCF/bbl)"}
                         xlabel={"Time"} ylabel={"GOR (MCF/bbl)"} color={COLORS_LIST[6]} keyX="1" keyY="7" label1={"GOR"}/>
        </div>

        <TableWell well={well} values={data}/>
      </div>}
    </div>
  )
})
export default TabWellSummary
