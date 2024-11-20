import React, {useEffect, useState} from "react";
import {ChartLine} from "src/components/chart";
import {defaultChartOptions} from "src/components/chart/ReactChartJs";
import {useTranslation} from "react-i18next";
import {CardLayout} from "src/components/base/index.js";
import {scales} from "chart.js";
import {date_to_string} from "src/utils/MyUtils.js";

const ChartLineView = ({
                         values, height = "300px", title = "", xlabel = "", ylabel = "",
                         color = "blue", keyX = "1", keyY = "3", keyY2 = undefined, color2 = 'red',
                         label1 = "", label2 = ""
                       }) => {
  const {t} = useTranslation();
  const [data, setData] = useState([])
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    let data_ = [];
    let data2_ = [];
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      data_.push({x: date_to_string(value[keyX]), y: value[keyY]});
      if (keyY2 !== undefined) {
        data2_.push({x: date_to_string(value[keyX]), y: value[keyY2]});
      }
    }
    setData(data_);

    setDataset(
      {
        datasets: [
          {
            label: label1,
            cubicInterpolationMode: "monotone",
            data: data_,
            borderColor: color
          },
          ...((data2_.length>0) ? [{
            label: label2,
            cubicInterpolationMode: "monotone",
            data: data2_,
            borderColor: color2
          }] : []),
        ]
      }
    )
  }, [values]);


  const options = {
    ...defaultChartOptions,
    ...scales,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd, yyyy',
        },
        title: {
          display: true,
          text: xlabel,
        }
      },
      y: {
        ...defaultChartOptions.scales.y,
        title: {
          display: true,
          text: ylabel,
        }
      },
    },
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins.legend,
        display: true,
      },
    }
  };
  return (
    <CardLayout title={title}>
      {dataset && <ChartLine
        options={options}
        height={height}
        data={dataset}/>}
    </CardLayout>
  );
};
export default ChartLineView;
