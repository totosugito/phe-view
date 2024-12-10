import React, {useEffect, useState} from "react";
import {ChartLine} from "src/components/chart";
import {defaultChartOptions} from "src/components/chart/ReactChartJs";
import {useTranslation} from "react-i18next";
import {CardLayout} from "src/components/base/index.js";
import {scales} from "chart.js";
import {date_to_string} from "src/utils/MyUtils.js";

const ChartLinesView = ({
                          values, height = "300px", title = "",
                          xLabel = "", yLabel = "", keyX = "1",
                          color1 = "blue", keyY1 = "3", label1 = "", pointRadius1=0, borderWidth1=2,
                          color2 = 'red', keyY2 = undefined, label2 = "", pointRadius2=0, borderWidth2=2,
                          color3 = 'green', keyY3 = undefined, label3 = "", pointRadius3=0, borderWidth3=2,
                        }) => {
  const {t} = useTranslation();
  const [data, setData] = useState([])
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    let data1_ = [];
    let data2_ = [];
    let data3_ = [];
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      data1_.push({x: date_to_string(value[keyX]), y: value[keyY1]});

      if (keyY2 !== undefined) {
        data2_.push({x: date_to_string(value[keyX]), y: value[keyY2]});
      }

      if (keyY3 !== undefined) {
        data3_.push({x: date_to_string(value[keyX]), y: value[keyY3]});
      }
    }
    setData(data1_);

    setDataset(
      {
        datasets: [
          {
            label: label1,
            cubicInterpolationMode: "monotone",
            data: data1_,
            borderColor: color1,
            pointRadius: pointRadius1,
            borderWidth: borderWidth1,
          },
          ...((data2_.length > 0) ? [{
            label: label2,
            cubicInterpolationMode: "monotone",
            data: data2_,
            borderColor: color2,
            pointRadius: pointRadius2,
            borderWidth: borderWidth2,
            borderDash: [10, 5]
          }] : []),
          ...((data3_.length > 0) ? [{
            label: label3,
            cubicInterpolationMode: "monotone",
            data: data3_,
            borderColor: color3,
            pointRadius: pointRadius3,
            borderWidth: borderWidth3,
            borderDash: [10, 5]
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
          text: xLabel,
        }
      },
      y: {
        ...defaultChartOptions.scales.y,
        title: {
          display: true,
          text: yLabel,
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
    <CardLayout title={title} height={height}>
      {dataset && <ChartLine
        options={options}
        // height={height}
        data={dataset}/>}
    </CardLayout>
  );
};
export default ChartLinesView;
