import {ChartLinesView, NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {simpleReformatText, to_formatted_money} from "src/utils/MyUtils.js";
import {BodyContents, WebLoading} from "shared/components/base/index.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
    http_well_prod2024_region_best_by_platform,
    http_well_prod2024_region_list, http_well_prod2024_region_summary
} from "src/services/api/wells-prod-2024.js";
import TableView from "./view/TableView.jsx";
import {COLORS_LIST} from "shared/config/config.js";
import ChartBarHorizontal from "./view/ChartBarHorizontal.jsx";
import {
    KEY_ACTUAL_OIL,
    KEY_ACTIVE_OIL_COUNT,
    KEY_POTENTIAL_OIL,
    KEY_REGION,
    KEY_INACTIVE_OIL_COUNT
} from "src/pages/WellProd2024/constant/constant.js";
import CardStats from "../../shared/components/base/CardStats.jsx";
import ChartDoughnutView from "./view/ChartDoughnutView.jsx";
import ChartLineWithAvg from "./view/ChartLineWithAvg.jsx";

const ActualOil = () => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [regionList, setRegionList] = useState(null);
    const [regionSummary, setRegionSummary] = useState(null);
    const [bestPlatform, setBestPlatform] = useState(null);
    const styleRowGroup = "grid md:grid-cols-2 grid-cols-1 gap-2";

    const KEY_GROUP = KEY_REGION;
    const KEY_ACTUAL = KEY_ACTUAL_OIL;
    const KEY_POTENTIAL = KEY_POTENTIAL_OIL;
    const KEY_ACTIVE_COUNT = KEY_ACTIVE_OIL_COUNT;
    const KEY_INACTIVE_COUNT = KEY_INACTIVE_OIL_COUNT;
    const Y_LABEL = "Platform";
    const pageTitle = AppRoutes.wellProd2024.actualOil.name;

    const http_region_list = async () => {
        const response = await http_well_prod2024_region_list();
        if (response) {
            setRegionList(response);
        }
    };

    const http_region_summary = async () => {
        const response = await http_well_prod2024_region_summary();
        if (response) {
            setRegionSummary(response);
        }
    };

    const http_platform_best_by_platform = async () => {
        const response = await http_well_prod2024_region_best_by_platform();
        if (response) {
            setBestPlatform(response);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                http_region_list(),
                http_region_summary(),
                http_platform_best_by_platform()
            ]);
            setLoading(false);
        }
        fetchData().then(r => {
        });
    }, []);

    return (
        <div className={"h-screen flex flex-col"}>
            <NavBar title={<div className={"text-lg"}><span className={"mr-2"}>{pageTitle}</span>
                {/*<span className={"text-primary font-bold"}>{date_to_string(selectedDay, "dd/MM/yyyy")}</span>*/}
            </div>}/>
            {loading ? <WebLoading/> :
                <BodyContents>
                    {regionList &&
                        <div className={"flex flex-col flex-grow h-full w-full gap-2"}>
                            {regionSummary &&
                                <div>
                                    <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-2 rounded-lg"}>
                                        <CardStats label={"Region"} title={regionSummary?.total_region ?? 0}/>
                                        <CardStats label={"Platform"} title={regionSummary?.total_platform ?? 0}/>
                                        <CardStats label={"Wells"} title={<><span>{regionSummary[KEY_ACTIVE_COUNT] ?? 0}</span>/<span
                                            className={"sm:text-2xl text-xl text-error"}>{regionSummary[KEY_INACTIVE_COUNT] ?? 0}</span></>}/>
                                        <CardStats label={`Total ${simpleReformatText(KEY_ACTUAL)}`}
                                                   title={to_formatted_money(regionSummary?.total[KEY_ACTUAL] ?? 0, "", 2)}/>
                                        <CardStats label={`Total ${simpleReformatText(KEY_POTENTIAL)}`}
                                                   title={to_formatted_money(regionSummary?.total[KEY_POTENTIAL] ?? 0, "", 2)}/>
                                    </div>

                                    <ChartLineWithAvg values={regionSummary?.data ?? []}
                                                      height={"450px"}
                                                      title={`Total ${simpleReformatText(KEY_ACTUAL)}`}
                                                      xLabel={"Date"} yLabel={simpleReformatText(KEY_ACTUAL)} keyX="date"
                                                      color1={COLORS_LIST[0]} keyY1={KEY_ACTUAL} label1={simpleReformatText(KEY_ACTUAL)}
                                                      cubicInterpolationMode1={""}
                                                      avgWindow2={7} color2={COLORS_LIST[1]} keyY2={KEY_ACTUAL} label2={t("label.sma7")}
                                                      cubicInterpolationMode2={""}
                                                      avgWindow3={30} color3={COLORS_LIST[2]} keyY3={KEY_ACTUAL} label3={t("label.sma30")}
                                                      cubicInterpolationMode3={""}
                                    />

                                </div>
                            }

                            <div className={styleRowGroup}>
                                <ChartDoughnutView values={regionList} keyGroup={KEY_GROUP} keyValue={KEY_ACTIVE_COUNT}
                                                   title={`Total Active Wells in the Region`}/>
                                <ChartDoughnutView values={regionList} keyGroup={KEY_GROUP} keyValue={KEY_INACTIVE_COUNT}
                                                   title={`Total Inactive Wells in the Region`}/>
                            </div>

                            {bestPlatform &&
                                <div className={"flex flex-col gap-2"}>
                                    <div className={styleRowGroup}>
                                        <ChartBarHorizontal values={bestPlatform} keyData={KEY_ACTUAL}
                                                            title={`Top 5 Platforms by Total ${simpleReformatText(KEY_ACTUAL)}`}
                                                            xlabel={`Total ${simpleReformatText(KEY_ACTUAL)}`} ylabel={Y_LABEL}
                                                            color={COLORS_LIST[1]}/>
                                        <ChartBarHorizontal values={bestPlatform} keyData={KEY_POTENTIAL}
                                                            title={`Top 5 Platforms by Total ${simpleReformatText(KEY_POTENTIAL)}`}
                                                            xlabel={`Total ${simpleReformatText(KEY_POTENTIAL)}`} ylabel={Y_LABEL}
                                                            color={COLORS_LIST[2]}/>
                                    </div>
                                </div>
                            }

                            {regionList &&
                                <TableView title={"Region"} values={regionList} actualKey={KEY_ACTUAL} potentialKey={KEY_POTENTIAL}
                                           isActiveKey={KEY_ACTIVE_COUNT}/>
                            }
                        </div>
                    }
                </BodyContents>
            }
        </div>
    )
}

export default ActualOil