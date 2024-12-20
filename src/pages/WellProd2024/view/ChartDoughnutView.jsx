import {ChartDoughnut} from "shared/components/chart";
import React, {useEffect} from "react";
import {CardLayout} from "shared/components/base";

const ChartDoughnutView = ({title, values, height="300px", keyGroup="", keyValue=""}) => {
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
      labels_.push(item[keyGroup] ?? "");
      values_.push(item[keyValue] ?? 0);
      total_ += item[keyValue] ?? 0;
    }

    setTotal(total_);
    setData(values_);
    setChartLabels(labels_);
  }

  return (
    <CardLayout title={title}>
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
export default ChartDoughnutView
