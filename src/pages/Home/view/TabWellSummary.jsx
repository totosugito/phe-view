import {memo, useEffect, useState} from "react";
import FilterView from "src/pages/Home/well/FilterView.js";
import WellCardSummary from "src/pages/Home/well/WellCardSummary.jsx";
import TableWell from "src/pages/Home/well/TableWell.jsx";
import ChartLineView from "src/pages/Home/well/ChartLineView.js";

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
      values_.push({id: i, name: item?.well});
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
    console.log(data_)
  }

  return(
    <div className={"flex flex-col gap-3"}>
      {filterDropdown && <FilterView values={filterDropdown} onChange={filterOnChange}/>}
      {well && <WellCardSummary values={well}/>}
      {data && <div>

        <div className={styleRowGroup}>
          <ChartLineView values={data ?? []} title={"Top 5 Wells by Total Actual Water"}
                        keyPlot={"sum"} xlabel={"Total Actual Water (bbl)"} ylabel={"Well"} barColor={"purple"}/>
          {/*<TopAreaByKey values={values?.tops["5"] ?? []} title={"Top 5 Wells by Total Actual Gas"}*/}
          {/*              keyPlot={"sum"} xlabel={"Total Actual Gas (MCF)"} ylabel={"Well"} barColor={"green"}/>*/}
        </div>

        <TableWell well={well} values={data}/>
      </div>}
    </div>
  )
})
export default TabWellSummary
