import {memo, useEffect, useState} from "react";
import FilterView from "src/pages/Home/well/FilterView.js";
import WellCardSummary from "src/pages/Home/well/WellCardSummary.jsx";
import TableWell from "src/pages/Home/well/TableWell.jsx";

const TabWellSummary = memo(({raw, values}) => {
  const [filterDropdown, setFilterDropdown] = useState(null);
  const [well, setWell] = useState(null);
  const [data, setData] = useState(null);

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
      let item = values[i];
      data_.push({id: i, name: item?.well});
    }
    setData(data_);
  }

  return(
    <div className={"flex flex-col gap-3"}>
      {filterDropdown && <FilterView values={filterDropdown} onChange={filterOnChange}/>}
      {well && <WellCardSummary values={well}/>}
      {data && <div>

        <TableWell values={data}/>
      </div>}
    </div>
  )
})
export default TabWellSummary
