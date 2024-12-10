import {AppFooter, BodyContents, ModalDialog, WebLoading} from "src/components/base/index.js";
import {useEffect, useState} from "react";
import Worker from "../../utils/excelWorker?worker";
import {toast} from "react-hot-toast";
import TabAreaSummary from "./view/TabAreaSummary.jsx";
import TabWellSummary from "src/pages/ProductionData/view/TabWellSummary.jsx";
import {NavBar} from "src/components/app/index.js";
import excelFormatImg from "src/assets/images/excel-format.png";
import {RiQuestionLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";
import {AppRoutes} from "src/routers/router.js";

const ProductionData = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [xlsxRowStart, setXlsxRowStart] = useState(7);
  const [xlsxRowEnd, setXlsxRowEnd] = useState(100000);
  const [xlsxColStart, setXlsxColStart] = useState(0);
  const [xlsxColEnd, setXlsxColEnd] = useState(11);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const fetchExcelFile = async () => {
      try {
        const response = await fetch("/data/Wells_1Okt24-15Nov24-mini.xlsx");
        // const response = await fetch("/data/Wells_1Okt24-15Nov24.xlsx");
        const blob = await response.blob();
        onScanFile(blob);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    }

    fetchExcelFile().then(r => {
    });
  }, []);

  const onScanFile = (file) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Initialize the worker
      const worker = new Worker();

      // Start loading animation
      setLoading(true);
      setError("");

      // Send the file content to the worker
      worker.postMessage({fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd});

      // Handle messages from the worker
      worker.onmessage = function (event) {
        const {status, data, error} = event.data;

        if (status === "success") {
          setData(data); // Set the processed data
        } else if (status === "error") {
          setError(error); // Handle any errors
          toast.error(error);
        }

        setLoading(false); // Stop loading
        worker.terminate(); // Clean up the worker
      };
    };
    reader.readAsBinaryString(file);
  }

  const onImportClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onScanFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={"h-screen flex flex-col"}>
      <NavBar title={<div className={"text-lg"}>{AppRoutes.productionData.name}</div>}/>
      {loading ? <WebLoading/> :
        <BodyContents>
          <div className={"flex flex-row gap-x-2 justify-end items-center"}>
            <div className={"flex flex-row gap-2 w-full max-w-lg"}>
              <input type="file"
                     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                     onChange={onImportClick}
                     className="file-input file-input-bordered file-input-sm w-full"/>
            </div>
            {/*</button>*/}
            <div role="button" className="btn btn-ghost btn-circle avatar" onClick={() => {
              setConfirmationModal({
                title: t("dialog.excelFormatTitle"),
                confirmText: t("button.close"),
                content: (
                  <div>
                    <img src={excelFormatImg} alt="" className={"w-full"}/>
                  </div>
                ),
                styles: "w-10/12",
                onConfirmClick: () => {
                  setConfirmationModal(null);
                },
                onCancelClick: () => {
                  setConfirmationModal(null);
                },
              })
            }}>
              <RiQuestionLine className={"text-3xl"}/>
            </div>
          </div>

          <div className="tabs tabs-boxed">
            <a className={`tab tab-bordered ${activeTab === 0 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(0)}>
              Area Summary
            </a>
            <a className={`tab tab-bordered ${activeTab === 1 ? 'tab-active font-bold' : ''}`} onClick={() => handleTabClick(1)}>
              Well Summary
            </a>
          </div>

          {data &&
            <div className="bordered p-2">
              <div className={activeTab === 0 ? '' : 'hidden'}>
                <TabAreaSummary values={data?.summary ?? {}}/>
              </div>
              <div className={activeTab === 1 ? '' : 'hidden'}>
                <TabWellSummary values={data?.summary?.wells ?? []} raw={data?.data ?? []}/>
              </div>
            </div>
          }
        </BodyContents>
      }
      <AppFooter/>

      {confirmationModal && <ModalDialog modal={confirmationModal} styles={"w-10/12"} content={
        <div>
          <img src={excelFormatImg} alt="" className={"w-full"}/>
        </div>}
      />}
    </div>
  )
}

export default ProductionData