import MapView from "./view/MapView.js";
import {NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {BodyContents, WebLoading} from "src/components/base/index.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {geoJsonPointsToArray} from "src/utils/utils-map.js";
import Worker from "../../utils/excelOilLossesWorker?worker";
import {toast} from "react-hot-toast";

const OilLosses = ({}) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [geoPoints, setGeoPoints] = useState(null);
    const [xlsxRowStart, setXlsxRowStart] = useState(1);
    const [xlsxRowEnd, setXlsxRowEnd] = useState(100000);
    const [xlsxColStart, setXlsxColStart] = useState(0);
    const [xlsxColEnd, setXlsxColEnd] = useState(6);

    const initData = async () => {
        // read geojson file
        const geojson_ = await fetch("/data/geojson_point_oses.geojson");

        // read excels file
        const fetchExcelFile = async () => {
            try {
                const response = await fetch("/data/DailyPlatform2024OilLosses.xlsx");
                const blob = await response.blob();
                onScanFile(blob);
            } catch (error) {
                console.error("Error loading Excel file:", error);
            }
        }
        fetchExcelFile().then(r => {
        });

        // update the data

        setGeoPoints(geoJsonPointsToArray(await geojson_.json()));
    }

    const onScanFile = (file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;

            // Initialize the worker
            const worker = new Worker();

            worker.postMessage({fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd});

            // Handle messages from the worker
            worker.onmessage = function (event) {
                const {status, data, error} = event.data;
                console.log(data)

                if (status === "success") {
                    // setData(data); // Set the processed data
                } else if (status === "error") {
                    toast.error(error);
                }

                setLoading(false); // Stop loading
                worker.terminate(); // Clean up the worker
            };
        }
        reader.readAsBinaryString(file);
    }

    useEffect(() => {
        setLoading(true);
        initData().then(r => {});
        setLoading(false);
    }, []);

    return (
        <div className={"h-screen flex flex-col"}>
            <NavBar title={AppRoutes.oilLosses.name}/>
            {loading ? <WebLoading/> :
                <BodyContents>
                    {geoPoints && <MapView geoPoints={geoPoints}/>}
                </BodyContents>
            }
        </div>
    )
}

export default OilLosses