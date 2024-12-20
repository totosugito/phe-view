import {NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {simpleReformatText} from "src/utils/MyUtils.js";
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
import {KEY_ACTUAL_OIL, KEY_IS_OIL_ACTIVE, KEY_POTENTIAL_OIL} from "src/pages/WellProd2024/constant/constant.js";
import {BigInfoLabel} from "src/components/dashboard/index.js";

const ActualOil = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [regionList, setRegionList] = useState(null);
  const [regionSummary, setRegionSummary] = useState(null);
  const [bestPlatform, setBestPlatform] = useState(null);
  const styleRowGroup = "grid md:grid-cols-2 grid-cols-1 gap-2";

  const KEY_DATA1 = KEY_ACTUAL_OIL;
  const KEY_DATA2 = KEY_POTENTIAL_OIL;
  const KEY_DATA3 = KEY_IS_OIL_ACTIVE;
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
      setRegionSummary(response?.region);
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
                <div className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-2 rounded-lg"}>
                  <BigInfoLabel title={"Region"} value={regionSummary?.total_region ?? 0}/>
                  <BigInfoLabel title={"Platform"} value={regionSummary?.total_platform ?? 0}/>
                  <BigInfoLabel title={"Wells"} value={regionSummary?.total_wells ?? 0}/>
                  <BigInfoLabel title={`Total ${simpleReformatText(KEY_DATA1)}`} value={regionSummary?.total[KEY_DATA1] ?? 0} asMoney={true}/>
                  <BigInfoLabel title={`Total ${simpleReformatText(KEY_DATA2)}`} value={regionSummary?.total[KEY_DATA2] ?? 0} asMoney={true}/>
                </div>
              }

              {bestPlatform &&
                <div className={styleRowGroup}>
                  <ChartBarHorizontal values={bestPlatform} keyData={KEY_DATA1}
                                      title={`Top 5 Platforms by Total ${simpleReformatText(KEY_DATA1)}`}
                                      xlabel={`Total ${simpleReformatText(KEY_DATA1)}`} ylabel={Y_LABEL} color={COLORS_LIST[1]}/>
                  <ChartBarHorizontal values={bestPlatform} keyData={KEY_DATA2}
                                      title={`Top 5 Platforms by Total ${simpleReformatText(KEY_DATA2)}`}
                                      xlabel={`Total ${simpleReformatText(KEY_DATA2)}`} ylabel={Y_LABEL} color={COLORS_LIST[2]}/>
                </div>
              }

              {regionList &&
                <TableView title={"Region"} values={regionList} actualKey={KEY_DATA1} potentialKey={KEY_DATA2}
                           isActiveKey={KEY_DATA3}/>
              }
            </div>
          }
        </BodyContents>
      }
    </div>
  )
}

export default ActualOil