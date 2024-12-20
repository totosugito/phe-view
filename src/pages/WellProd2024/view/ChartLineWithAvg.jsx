import React, {useEffect, useState} from "react";
import {ChartLine} from "shared/components/chart";
import {defaultChartOptions} from "shared/components/chart/ReactChartJs";
import {useTranslation} from "react-i18next";
import {CardLayout} from "shared/components/base";
import {scales} from "chart.js";
import {date_to_string} from "src/utils/MyUtils.js";
import {movingAverage} from "shared/utils/smoothing.js";

const ChartLineWithAvg = ({
                            values, height = "300px", title = "",
                            xLabel = "", yLabel = "", keyX = "1",
                            color1 = "blue", keyY1 = "3", label1 = "", pointRadius1=0, borderWidth1=2,
                            cubicInterpolationMode1="monotone",
                            avgWindow2=0, color2 = 'red', label2 = "", pointRadius2=0, borderWidth2=2,
                            cubicInterpolationMode2="monotone",
                            avgWindow3=0, color3 = 'green', label3 = "", pointRadius3=0, borderWidth3=2,
                            cubicInterpolationMode3="monotone",
                        }) => {
    const {t} = useTranslation();
    const [data, setData] = useState([])
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        let data1_ = [];
        let tmp_data1_ = []
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
            data1_.push({x: date_to_string(value[keyX]), y: value[keyY1]});
            tmp_data1_.push(value[keyY1]);
        }

        let data2_ = [];
        if(avgWindow2 > 0) {
            const avg2 = movingAverage(tmp_data1_, avgWindow2);
            for (let i = 0; i < values.length; i++) {
                let value = values[i];
                data2_.push({x: date_to_string(value[keyX]), y: avg2[i]});
            }
        }

        let data3_ = [];
        if(avgWindow3 > 0) {
            const avg3 = movingAverage(tmp_data1_, avgWindow3);
            for (let i = 0; i < values.length; i++) {
                let value = values[i];
                data3_.push({x: date_to_string(value[keyX]), y: avg3[i]});
            }
        }

        setDataset(
            {
                datasets: [
                    {
                        label: label1,
                        cubicInterpolationMode: cubicInterpolationMode1,
                        data: data1_,
                        borderColor: color1,
                        pointRadius: pointRadius1,
                        borderWidth: borderWidth1,
                    },
                    ...((avgWindow2 > 0) ? [{
                        label: label2,
                        cubicInterpolationMode: cubicInterpolationMode2,
                        data: data2_,
                        borderColor: color2,
                        pointRadius: pointRadius2,
                        borderWidth: borderWidth2,
                        borderDash: [10, 5]
                    }] : []),
                    ...((avgWindow3 > 0) ? [{
                        label: label3,
                        cubicInterpolationMode: cubicInterpolationMode3,
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
export default ChartLineWithAvg;
