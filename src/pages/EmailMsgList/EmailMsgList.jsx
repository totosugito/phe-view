import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {msgFileReader, msgInfoToHtml} from "src/utils/file-reader.js";

const EmailMsgList = ({}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const fileName = "/msg/CBU_AM_Report_Dec_14_2024.msg"
  useEffect(() => {
    const fetchMsgFile = async () => {
      try {
        const response = await fetch(fileName);
        const blob = await response.blob();

        onScanFile(blob);
      } catch (error) {
        console.error("Error loading msg file:", error);
      }
    }

    fetchMsgFile().then(r => {
    });
  }, []);

  const onScanFile = (file) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = async function (e) {
      const arrayBuffer = e.target.result;
      const msgHtml = msgInfoToHtml(await msgFileReader(arrayBuffer));
      setHtmlContent(msgHtml);
    }
    reader.readAsArrayBuffer(file);
    setLoading(false);
  }

  return (
    <div className={"h-screen flex flex-col p-2"}>
      <div className="container py-5">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <input type="file" id="fileInput" className="mt-4 p-2 border border-gray-300 rounded d-none"/>
            <div id="dropZone" className="p-5 text-gray-600"> Drop the *.msg file here or click to select a file</div>
          </div>
          <div id="emailViewer" className="p-4"></div>
          <div
              dangerouslySetInnerHTML={{__html: htmlContent}}
              style={{marginTop: "20px", border: "1px solid #ccc", padding: "10px"}}
          ></div>
        </div>
      </div>
    </div>)
}
export default EmailMsgList
