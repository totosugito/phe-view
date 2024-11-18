import {AppFooter, BodyContents} from "../../components/base/index.js";
import {WebLoading} from "../../components/index.js";
import {useEffect, useState} from "react";
import AppNavbar from "./view/AppNavbar.jsx";
import Worker from "../../utils/excelWorker?worker";
import {toast} from "react-hot-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [xlsxRowStart, setXlsxRowStart] = useState(7);
  const [xlsxRowEnd, setXlsxRowEnd] = useState(100000);
  const [xlsxColStart, setXlsxColStart] = useState(0);
  const [xlsxColEnd, setXlsxColEnd] = useState(11);

  useEffect(() => {
    const fetchExcelFile = async () => {
      try {
        const response = await fetch("/data/Wells_1Okt24-15Nov24-mini.xlsx"); // Fetch the file from public folder
        const blob = await response.blob();
        onScanFile(blob);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    }

    fetchExcelFile().then(r => {});
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
      worker.postMessage({ fileContent, xlsxRowStart, xlsxRowEnd, xlsxColStart, xlsxColEnd });

      // Handle messages from the worker
      worker.onmessage = function (event) {
        const { status, data, error } = event.data;

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

  return (
    <div className={"h-screen flex flex-col"}>
      <AppNavbar onImportClick={onImportClick}/>
      {loading ? <WebLoading/> :
        <BodyContents>
          Home
        </BodyContents>
      }
      <AppFooter/>
    </div>
  )
}

export default Dashboard