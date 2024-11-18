import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";
import { RiFileExcel2Line } from "react-icons/ri";
import WebLogo from "./WebLogo.jsx";

const AppNavbar = () => {
  const {t} = useTranslation();
  // const navigate = useNavigate()
  const headerRef = useRef();
  // const [title, setTitle] = useState("");

  // const dispatch = useDispatch();
  // const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);
  // const [confirmationModal, setConfirmationModal] = useState(null);

  // useEffect(() => {
  //   setTitle(getPageRoutesName(window.location.hash));
  // }, [title]);

  // useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     headerRef.current &&
  //     headerRef.current.classList.toggle("shadow-sm", document.documentElement.scrollTop > 0);
  //   });
  // }, []);

  return (
    <div className="navbar flex flex-row w-full items-center justify-between shadow px-2" ref={headerRef}>
      <div className={"w-full"}>
        <WebLogo/>
        {/*<div role="button" className="btn btn-ghost btn-circle avatar">*/}
        {/*  <button className={"flex btn-ghost btn-circle text-center items-center justify-center"}*/}
        {/*          onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>*/}
        {/*    <FiMenu fontSize={24} />*/}
        {/*  </button>*/}
        {/*</div>*/}
        {/*<div className="text-xl md:text-2xl truncate">*/}
        {/*  {t(`navBar.${title}`)}*/}
        {/*</div>*/}
      </div>
      <button className="btn btn-sm btn-primary" onClick={() => {}}>
        <RiFileExcel2Line className={"text-lg"} /> Import Excel
      </button>
    </div>
  );
};

export default AppNavbar;
