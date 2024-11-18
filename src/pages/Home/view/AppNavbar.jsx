import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {RiFileExcel2Line, RiQuestionLine} from "react-icons/ri";
import {ConfirmationModal, WebLogo} from "../../../components/base/index.js";
import excelFormatImg from "../../../assets/images/excel-format.png";

const AppNavbar = ({onImportClick}) => {
  const {t} = useTranslation();
  const headerRef = useRef();
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="navbar flex flex-row w-full items-center justify-between shadow px-2" ref={headerRef}>
      <div className={"flex1"}>
        <WebLogo/>
      </div>
      <div className={"flex flex-row gap-x-2"}>
        {/*<button className="btn btn-sm btn-primary">*/}
          <div className={"flex flex-row gap-2 w-full max-w-3xl"}>
            <input type="file"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   onChange={onImportClick}
                   className="file-input file-input-bordered file-input-sm w-full max-w-xl"/>
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
      {confirmationModal && <ConfirmationModal modal={confirmationModal} styles={"w-10/12"} content={
        <div>
          <img src={excelFormatImg} alt="" className={"w-full"}/>
        </div>}
      />}
    </div>
  );
};

export default AppNavbar;
