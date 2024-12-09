import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { APP_NAME } from "src/constants/config";
import WebLogo from "src/assets/logo.png";
import WavivLogo from "src/assets/images/waviv.png";
import { setOpenSideMenu, setScreenSize } from "src/stores/slices/sidebarSlice";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {SidebarLink} from "src/components/base";

const AppSidebar = ({ navigation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If screen size is small then close the sidebar
  useEffect(() => {
    if (screenSize <= 640) {
      dispatch(setOpenSideMenu(false));
    }
    else {
      if(openSideMenu)
        dispatch(setOpenSideMenu(true));
    }
  }, [screenSize]);

  return (
    <>
      {
        openSideMenu && <div className={"flex flex-col min-w-[270px] h-full justify-between p-3 overflow-auto"}>
          <div>
            <div className={"flex flex-row justify-between mb-[20px]"}>
              <div className={"btn flex flex-row btn-ghost"} onClick={()=>navigate("/")}>
                <img src={WebLogo} width={32} alt={""} />
                <span className="ml-2 text-2xl font-bold">{APP_NAME}</span>
              </div>
              <button className={"btn btn-dark btn-ghost text-2xl"} onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}><IoMdClose/></button>
            </div>
            <div className={"divider"}/>

            {navigation.map((nav, index) => {
              return (
                <SidebarLink key={index} nav={nav} setOpenSideMenu={setOpenSideMenu} className={"my-side-bar"} />
              );
            })}
          </div>
          <div>
            <img src={WavivLogo} width={100} alt={""} />
          </div>
        </div>
      }
    </>
  );
};

export default AppSidebar
