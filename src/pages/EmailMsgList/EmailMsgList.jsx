import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import MsgReader from '@kenjiuno/msgreader'
import {decompressRTF} from '@kenjiuno/decompressrtf'
import { deEncapsulateSync } from 'rtf-stream-parser'; // Main function for de-encapsulation
import * as iconvLite from 'iconv-lite'; // For decoding ANSI code pages


const EmailMsgList = ({}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null);

  const fileName = "/msg/CBU_AM_Report_Dec_14_2024.msg"
  useEffect(() => {
    const fetchExcelFile = async () => {
      try {
        // const response = await fetch("/data/Wells_1Okt24-15Nov24-mini.xlsx");
        const response = await fetch(fileName);
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
      const arrayBuffer = e.target.result;
      const msgInfo = extractMsg(arrayBuffer);

      // // Use MsgReader to read the file
      // const msgReader = new MsgReader(arrayBuffer);
      // const msgData = msgReader.getFileData();

      // console.log(msgData);
      // setMessageInfo(msgData); // Save message data to state
    }
    reader.readAsArrayBuffer(file);
  }

  function convertRTFToHTML(rtfContent) {
    const result = deEncapsulateSync(rtfContent, { decode: iconvLite.decode });
    return result.text;
  }

  function extractMsg(fileBuffer) {
    let msgInfo = null;
    let msgReader = null;
    try {
        msgReader = new MsgReader(fileBuffer);
        msgInfo = msgReader.getFileData();
    } catch (error) {
      console.error("Error creating a MsgReader instance:", error);
    }

    let emailBodyContent = msgInfo.bodyHTML || msgInfo.body;
    let emailBodyContentHTML = '';

    let decompressedRtf = decompressRTF(Uint8Array.from(Object.values(msgInfo.compressedRtf)));
    emailBodyContentHTML = deEncapsulateSync(decompressedRtf, {
      decode: iconvLite.decode, // Decode ANSI code pages
      mode: 'html', // Expect encapsulated HTML
      replaceSymbolFontChars: true, // Replace symbol font characters
      htmlEncodeNonAscii: true, // Encode non-ASCII characters in HTML
    });
    // emailBodyContentHTML = convertRTFToHTML(decompressedRtf);
    console.log(emailBodyContentHTML);

    // const a = deEncapsulateSync(rtf, { decode: iconvLite.decode });
    // console.log(a);
    // // Extract images and attachments
    // if (msgInfo.attachments && msgInfo.attachments.length > 0) {
    //   msgInfo.attachments.forEach((attachment, index) => {
    //
    //     const contentUint8Array = msgReader.getAttachment(attachment).content;
    //     const contentBuffer = Buffer.from(contentUint8Array);
    //     const contentBase64 = contentBuffer.toString('base64');
    //
    //     const base64String = `data:${attachment.attachMimeTag};base64,${contentBase64}`;
    //
    //     if (attachment.attachMimeTag && attachment.attachMimeTag.startsWith('image/')) {
    //       emailBodyContentHTML = emailBodyContentHTML.replace(`cid:${attachment.pidContentId}`, base64String);
    //     } else {
    //       emailBodyContentHTML = emailBodyContentHTML.replace(`href="cid:${attachment.pidContentId}"`, `href="${base64String}"`);
    //     }
    //
    //     msgInfo.attachments[index].contentBase64 = base64String;
    //   });
    // }

    return {
      ...msgInfo,
      bodyContent: emailBodyContent,
      bodyContentHTML: emailBodyContentHTML
    };
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
        </div>
      </div>
    </div>)
}
export default EmailMsgList
