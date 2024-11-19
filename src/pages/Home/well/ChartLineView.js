import React, {useEffect, useState} from "react";
import {ChartLine} from "src/components/chart";
import {defaultChartOptions} from "src/components/chart/ReactChartJs";
import {useTranslation} from "react-i18next";
import {CardLayout} from "src/components/base/index.js";
import {scales} from "chart.js";

const ChartLineView = ({values, height = "300px", title = "", xlabel = "", ylabel = "", color = "blue"}) => {
  const {t} = useTranslation();
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [z, setZ] = useState([])

  useEffect(() => {
    let x_ = [];
    let y_ = [];
    let z_ = [];
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      x_.push(value["1"])
      y_.push(value["3"]);
      z_.push({x: value["1"], y: value["3"]})
    }
    setX(x_);
    setY(y_);
    setZ(z_);
  }, [values]);


  const options = {
    ...defaultChartOptions,
    ...scales,
    scales : {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        // type: 'time',
        // time: {
        //   unit: 'day', // Adjust the unit (e.g., 'minute', 'hour', 'day')
        // },
      }
    },
    plugins: {
      ...defaultChartOptions.plugins,
      // title: {
      //   ...defaultChartOptions.plugins.title,
      //   text: t("dashboard.trend_budget_vs_actual_cost")
      // },
      // annotation: {
      //   annotations: {
      //     ...vertYears
      //   }
      // }
    }
  };
  return (
    <CardLayout title={title}>
      <ChartLine
        options={options}
        height={height}
        data={{
          // labels: x,
          datasets: [
            {
              cubicInterpolationMode: "monotone",
              // label: objStyle.legend[0],
              data: z,
              // borderColor: objStyle.color[0],
              // pointBackgroundColor: objStyle.color[0],
              // borderWidth: 2,
              // borderDash: [10, 5] // Optional: dashed line style
            },
          ]
        }}/>
    </CardLayout>
  );
};
export default ChartLineView;
