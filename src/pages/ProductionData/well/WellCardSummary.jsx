import {BigInfoLabel} from "../../../components/dashboard/index.js";

const WellCardSummary = ({values}) => {
  return(
    <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-3"}>
      <BigInfoLabel title={"Area"} value={values?.area ?? ""}/>
      <BigInfoLabel title={"Data"} value={(values?.end ?? 0) - (values?.start ?? 0) + 1}/>
      <BigInfoLabel title={"Total Actual Oil (bbl)"} value={values?.summary["3"]?.sum ?? 0} asMoney={true}/>
      <BigInfoLabel title={"Total Actual Water (bbl)"} value={values?.summary["4"]?.sum ?? 0} asMoney={true}/>
      <BigInfoLabel title={"Total Actual Gas (MCF)"} value={values?.summary["5"]?.sum ?? 0} asMoney={true}/>
    </div>
  )
}
export default WellCardSummary