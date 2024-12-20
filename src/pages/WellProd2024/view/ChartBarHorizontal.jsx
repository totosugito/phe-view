import React, { useEffect, useState } from "react";
import {defaultBarPercentage, defaultBarThickness, defaultChartOptions} from "shared/components/chart/ReactChartJs.js";
import {ChartBar} from "shared/components/chart";
import {CardLayout} from "shared/components/base";

const ChartBarHorizontal = ({ values, height="300px", borderRadius=0, title="", xlabel="", ylabel="",
                              color="blue", keyData="" }) => {
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
      const group = values[keyData]

      for(const item of group) {
        labels_.push(item["platform_name"]);
        data_.push(item["total"][keyData]);
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
export default ChartBarHorizontal;
