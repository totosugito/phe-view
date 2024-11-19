import {BigInfoLabel} from "../../../components/dashboard/index.js";

const AreaCardSummary = ({values}) => {
  return(
    <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-3"}>
      <BigInfoLabel title={"Area"} value={values?.areas?.data?.length ?? 0}/>
      <BigInfoLabel title={"Well"} value={values?.wells?.length ?? 0}/>
      <BigInfoLabel title={"Total Actual Oil (bbl)"} value={values?.areas?.summary["3"]?.sum ?? 0} asMoney={true}/>
      <BigInfoLabel title={"Total Actual Water (bbl)"} value={values?.areas?.summary["4"]?.sum ?? 0} asMoney={true}/>
      <BigInfoLabel title={"Total Actual Gas (MCF)"} value={values?.areas?.summary["5"]?.sum ?? 0} asMoney={true}/>
    </div>
  )
}
export default AreaCardSummary