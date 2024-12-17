import {NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {date_to_string} from "src/utils/MyUtils.js";
import {BodyContents, WebLoading} from "shared/components/base/index.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Worker from "src/utils/excelProductionPlatformWorker?worker";
import {
  computeDataSummaryAndGroupsBy,
  fillGeojsonDataWithSummaryCustom
} from "src/utils/excelProductionPlatform.js";
import {geoJsonPointsToArray} from "src/utils/utils-map.js";
import {toast} from "react-hot-toast";
import TabRatePotential from "./view/TabRatePotential.jsx";
import TabPerformance from "./view/TabPerformance.jsx";
import TabSummaryOilPotential from "./view/TabSummaryOilPotential.jsx"

const PotentialOil = ({title = "Potential Oil", idxData = 5, idxSma7 = 10, idxSma30 = 11, idxActual = 2}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [xlsxRowStart, setXlsxRowStart] = useState(1);
  const [xlsxRowEnd, setXlsxRowEnd] = useState(100000);
  const [xlsxColStart, setXlsxColStart] = useState(0);
  const [xlsxColEnd, setXlsxColEnd] = useState(9);
  const [selectedDay, setSelectedDay] = useState(new Date(2024, 10, 27));
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const geojsonFile = "/data/geojson_point_oses.geojson";
  const excelFile = "/data/DailyPlatform2024Production.xlsx";
  const initData = async () => {
    // read excels file
    const fetchExcelFile = async () => {
      try {
        const response = await fetch(excelFile);
        const blob = await response.blob();
        onScanFile(blob);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    }

    fetchExcelFile().then(r => {
    });
  }

  const onScanFile = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Initialize the worker
      const worker = new Worker();

      worker.postMessage({fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd, idxData, idxSma7, idxSma30, idxActual});

      // Handle messages from the worker
      worker.onmessage = async function (event) {
        const {status, data, error} = event.data;

        console.log(data)
        if (status) {
          // 10 : avg7
          // 11 : avg30
          // 12 : delta
          // 13 : percentage
          const idxActual = "2";
          const dataSummary = computeDataSummaryAndGroupsBy(data.groups, 1, selectedDay, idxData, idxSma7, idxSma30,
            "9", idxActual);

          const geojson_ = await fetch(geojsonFile); // read geojson file
          let geoPoints = geoJsonPointsToArray(await geojson_.json());

          // add the summary data to geo points
          let selected = fillGeojsonDataWithSummaryCustom(
            {
              geoPoints: geoPoints, summary: dataSummary, idxData: idxData,
              idxSma7: idxSma7, idxSma30: idxSma30, idxActual: idxActual, idxDelta: 12, idxPercentage: 13
            });

          setData(data); // Set the processed data
          setFilteredData(selected);
          setSelectedItem("Rama B");
        } else {
          toast.error(error);
          setData(null);
          setFilteredData(null);
          setSelectedItem(null);
        }

        worker.terminate(); // Clean up the worker
      };
    }
    reader.readAsBinaryString(file);
  }

  useEffect(() => {
    setLoading(true);
    initData().then(r => {
    });
    setLoading(false);
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const onClickDetails = (name) => {
    setSelectedItem(name);
    setActiveTab(2);
  }

  return (
    <div className={"h-screen flex flex-col"}>
      <NavBar title={<div className={"text-lg"}><span className={"mr-2"}>{AppRoutes.potentialOil.name}</span><span
        className={"text-primary font-bold"}>{date_to_string(selectedDay, "dd/MM/yyyy")}</span></div>}/>
      {loading ? <WebLoading/> :
        <BodyContents>
          <div className={"flex flex-col flex-grow h-full w-full"}>
            <div className="tabs tabs-boxed">
              <a className={`tab tab-bordered ${activeTab === 0 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(0)}>
                Rate
              </a>
              <a className={`tab tab-bordered ${activeTab === 1 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(1)}>
                Performance
              </a>
              <a className={`tab tab-bordered ${activeTab === 2 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(2)}>
                Details
              </a>
            </div>

            {(data && filteredData) &&
              <div className="bordered pt-1 flex-1">
                <div className={`flex flex-grow w-full h-full ${activeTab === 0 ? '' : 'hidden'}`}>
                  <TabRatePotential values={filteredData} onClickDetails={onClickDetails} title={title}
                                    popup={[
                                      {type: "number", key: "actual", name: "Actual Oil", precision: 2},
                                      {type: "number", key: "delta", name: "Delta", precision: 2},
                                      {type: "number", key: "percentage", name: "Percentage", precision: 2}]}/>
                </div>
                <div className={`flex flex-grow w-full h-full ${activeTab === 1 ? '' : 'hidden'}`}>
                  <TabPerformance values={filteredData} onClickDetails={onClickDetails} title={title}
                                  popup={[
                                    {type: "number", key: "actual", name: "Actual Oil", precision: 2},
                                    {type: "number", key: "delta", name: "Delta", precision: 2},
                                    {type: "number", key: "percentage", name: "Percentage", precision: 2}]}/>
                </div>
                <div className={`flex flex-grow w-full h-full ${activeTab === 2 ? '' : 'hidden'}`}>
                  <TabSummaryOilPotential values={data.groups} filterList={data.summary.keys} selectedItem={selectedItem}
                                          labelKey={"Potential Oil"}/>
                </div>
              </div>
            }
          </div>
        </BodyContents>
      }
    </div>
  )
}
export default PotentialOil