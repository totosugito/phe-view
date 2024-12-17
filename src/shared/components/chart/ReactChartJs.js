import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Chart,
  registerables
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';

import 'chartjs-adapter-date-fns';
export const defaultBarThickness = 60;
export const defaultBarPercentage = 0.5;
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index"
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        color: '#000',
      },
      border: {
        color: '#000',
      }
    },
    y: {
      // beginAtZero: true, // Ensures the Y-axis starts at 0
      ticks: {
        color: '#000',
      },
      border: {
        color: '#000',
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: "",
      color: "#000",
      font: {
        size: 16,
        weight: "bold",
      }
    },
    legend: {
      display: true,
      position: "bottom",
      // align: 'start',  // Aligns legend items to the start of the container (for 'left' position)
      labels: {
        usePointStyle: true,
        font: {
          size: 12,
        },
        color: '#000',
      }
    },
    tooltip: {
      enabled: true
    },
    datalabels: {
      display: false
    },
    // zoom: {
    //   zoom: {
    //     pan: {
    //       enabled: true,
    //       mode: 'xy',
    //     },
    //     drag: {
    //       enabled: true,
    //       mode: 'xy',
    //     },
    //     wheel: {
    //       enabled: true,
    //     },
    //     pinch: {
    //       enabled: true
    //     },
    //     mode: 'xy',
    //   }
    // }
  }
};

const generateID = (prefix) => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

const noop = () => {
};

export const ReactChartJs = ({
                               id,
                               data,
                               options,
                               type,
                               plugins,
                               updateMode,
                               height,
                               width
                             }) => {
  const chartInstance = useRef({
    update: noop,
    destroy: noop
  });
  const [CHART_ID] = useState(id || generateID("Chart"));

  useEffect(() => {
    chartInstance.current.data = data;
    chartInstance.current.options = options;

    chartInstance.current.update(updateMode);
  }, [data, options]);

  const nodeRef = useCallback((node) => {
    chartInstance.current.destroy();

    if (node) {
      chartInstance.current = new Chart(node, {
        type,
        data,
        options,
        plugins
      });
    }
  }, []);

  return (
    <canvas
      ref={nodeRef}
      // height={height}
      width={width}
      style={{height: height}}
      id={CHART_ID}
      role="chart"
    />
  );
};

ReactChartJs.register = Chart.register(...registerables, ChartDataLabels, annotationPlugin, zoomPlugin) || noop;
