import {ChartDoughnut} from "shared/components/chart";
import React, {useEffect} from "react";
import {CardLayout} from "shared/components/base";

const DoughnutAreaWellCount = ({values, height="300px"}) => {
  const [colors, setColors] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [chartLabels, setChartLabels] = React.useState([]);

  useEffect(() => {
    initData();
  }, [values])

  const initData = () => {
    let values_ = [];
    let total_ = 0;
    let labels_ = [];
    for (let i = 0; i < values.length; i++) {
      let item = values[i];
      values_.push(item?.count ?? 0);
      total_ += item?.count ?? 0;
      labels_.push(item?.area ?? "");
    }

    setTotal(total_);
    setData(values_);
    setChartLabels(labels_);
  }

  return (
    <CardLayout title={"Number of wells in the Area"}>
      {(data.length > 0) && <ChartDoughnut title={""} height={height} labelCenter={{total: total}} data={{
        labels: chartLabels,
        datasets: [
          {
            data: data,
          }
        ]
      }}/>}
    </CardLayout>
  );
}
export default DoughnutAreaWellCount
