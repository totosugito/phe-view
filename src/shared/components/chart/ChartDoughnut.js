import { ReactChartJs } from "./ReactChartJs";
import React from "react";

const ChartDoughnut = ({ title, data, height, labelCenter }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 5, // Adjust the bottom padding
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Position at the bottom
        align: "center", // Align to the center
      },
      title: {
        display: false,
        text: title,
        font: {
          size: 16,
          weight: "bold"
        },
        color: "#000"
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum);
          percentage = Number.isNaN(percentage) ? 100 : percentage;
          return (value + "\n" + percentage.toFixed(0)) + "%";
        },
        color: "#000",
        textStrokeColor: "#FFF",
        textStrokeWidth: 5,
      },
      doughnutLabel: {
        total: 0
      }
    }
  };

  const doughnutLabel = {
    id: "doughnutLabel",
    beforeDraw: (chart) => {
      const { height, ctx } = chart;

      // Access custom options
      const doughnutLabel = chart.options.plugins["doughnutLabel"];

      const textX = chart.getDatasetMeta(0).data[0].x;
      const textY = chart.getDatasetMeta(0).data[0].y;

      const fontSize = (height / 114).toFixed(0);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(doughnutLabel["total"], textX, textY);
      ctx.save();
    }
  };

  const ShadowPlugin = {
    beforeDraw: (chart, args, options) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';  // Shadow color
      ctx.shadowBlur = 4;                     // Shadow blur radius
      ctx.shadowOffsetX = 2;                   // Horizontal shadow offset
      ctx.shadowOffsetY = 2;                   // Vertical shadow offset

      // Draw only the outer arc for the shadow
      ctx.beginPath();
      ctx.arc(
        (chartArea.left + chartArea.right) / 2, // X center
        (chartArea.top + chartArea.bottom) / 2, // Y center
        outerRadius,                            // Radius
        0,                                      // Start angle
        Math.PI * 2                             // End angle (full circle)
      );
      // ctx.strokeStyle = 'transparent';          // Hide the stroke
      ctx.lineWidth = 1;                       // Set a line width to create shadow on outer edge
      ctx.stroke();
      ctx.restore();
    },
  };

  return (
    <>
      <ReactChartJs type={"doughnut"} height={height} plugins={[doughnutLabel]}
                    data={data} options={
        {
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            doughnutLabel: labelCenter
          }
        }
      }
      />
    </>
  );
};
export default ChartDoughnut;
