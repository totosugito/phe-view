import React, { useEffect, useState } from "react";
import {defaultBarPercentage, defaultBarThickness, defaultChartOptions} from "shared/components/chart/ReactChartJs.js";
import {ChartBar} from "shared/components/chart";
import {CardLayout} from "shared/components/base";

const TopAreaByKey = ({ values, height="300px", borderRadius=0, keyPlot="sum",
                        title="", xlabel="", ylabel="", color="blue" }) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const chartOptions = {
    ...defaultChartOptions,
    indexAxis: "y",
    scales: {
      x: {
        grace: '70%',
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: xlabel,
        }
      },
      y: {
        // beginAtZero: true, // Ensures the Y-axis starts at 0
        ticks: {
        },
        title: {
          display: true,
          text: ylabel,
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        formatter: (value) => {
          return value.toLocaleString(); // Format with a thousand separators
        },
      }
    },

  };

  useEffect(() => {
    let data_ = [];
    let labels_ = [];

    if (values) {
      // Sort the data by summary.sum
      const sorted = values.sort((a, b) => (b.summary[keyPlot] ?? 0) - (a.summary[keyPlot] ?? 0));
      for(let i=0; i<sorted.length; i++) {
        let item = sorted[i];
        labels_.push(item["well"]);
        data_.push(item?.summary[keyPlot] ?? 0);
      }
    }
    setData(data_);
    setLabels(labels_);
  }, [values]);

  return (
    <CardLayout title={title}>
      <ChartBar height={height} options={chartOptions} data={{
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: color,
            maxBarThickness: defaultBarThickness,// + 10,
            categoryPercentage: defaultBarPercentage,// + 0.2,
            borderRadius: borderRadius,
          }
        ]
      }} />
    </CardLayout>
  );
};
export default TopAreaByKey;
