import { defaultChartOptions, ReactChartJs } from "./ReactChartJs";
import React from "react";

const ChartBar = ({ data, height, options }) => {
  const chartOptions = {
    ...defaultChartOptions,
    scales: {
      x: {
        position: "top",
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          color: "#000",
          font: {
            size: 14,
            weight: "bold"
          }
        },
        border: {
          color: "#000"
        }
      },
      y: {
        grace: "25%",
        ticks: {
          color: "#000"
        },
        border: {
          color: "#000"
        }
      }
    },
    plugins: {
      ...defaultChartOptions.plugins,
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        formatter: (value) => {
          return value.toLocaleString(); // Format with a thousand separators
        },
      }
    }
  };

  const shadowPlugin = {
    id: 'shadowPlugin',
    beforeDraw(chart) {
      const ctx = chart.ctx;

      // Function to apply shadow effect
      const applyShadow = () => {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      };

      // Apply shadow effect to the chart's fill method
      let _fill = ctx.fill;
      ctx.fill = function () {
        applyShadow();
        _fill.apply(this, arguments);
        ctx.restore();
      };
    }
  };

  return (
    <div>
      <ReactChartJs type={"bar"} height={height} plugins={[]}
                    data={data} options={ options ??
        {
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
          }
        }
      }
      />
    </div>
  );
}
export default ChartBar
