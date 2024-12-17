import { defaultChartOptions, ReactChartJs } from "./ReactChartJs";
import React from "react";

const ChartLine = ({ data, height, options }) => {
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
        ticks: {
          color: "#000"
        },
        border: {
          color: "#000"
        }
      }
    }
  };

  const shadowPlugin = {
    id: 'shadowPlugin',
    afterDatasetDraw(chart) {
      const ctx = chart.ctx;

      // Function to apply shadow effect
      const applyShadow = () => {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      };

      // // Check if the drawing is for the legend
      // if ((chart.legend || chart.legend.ctx) === ctx) {
      //   // Do not apply shadow to the legend
      //   return;
      // }

      // // Apply shadow effect to the chart's fill method
      // let _fill = ctx.fill;
      // ctx.fill = function () {
      //   applyShadow();
      //   _fill.apply(this, arguments);
      //   ctx.restore();
      // };

      // Apply shadow effect to the chart's stroke method
      let _stroke = ctx.stroke;
      ctx.stroke = function () {
        applyShadow();
        _stroke.apply(this, arguments);
        ctx.restore();
      };
    }
  };

  return (
    <>
      <ReactChartJs type={"line"} height={height} plugins={[]}
                    data={data} options={ options ??
        {
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
          }
        }
      }
      />
    </>
  );
}
export default ChartLine
