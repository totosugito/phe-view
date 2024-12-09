import { useDispatch, useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import {setOpenSideMenu} from "src/stores/slices/sidebarSlice.js";

export default function SidebarLink({ nav }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);
  const [isExpanded, setIsExpanded] = useState(true);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick = () => {
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false));
  };

  const ItemMenu = ({ nav }) => {
    return (
      <NavLink
        to={nav["to"]}
        target={nav["target"] !== undefined ? nav["target"] : ""}
        onClick={handleClick}
        className={`my-side-bar ${matchRoute(nav["to"]) ? "text-white" : "opacity-50"}`}>
        <div className={`flex items-center gap-x-2 hover:bg-neutral m-1 ${matchRoute(nav["to"]) ? "bg-neutral" : "bg-base"} p-1 rounded-md`}>
          <div className={"w-[32px]"}>{nav["icon"]}</div>
          <span>{nav["name"]}</span>
        </div>

      </NavLink>
    );
  };

  const ItemSubMenu = ({ nav }) => {
    return (
      <NavLink
        to={nav["to"]}
        target={nav["target"] !== undefined ? nav["target"] : ""}
        onClick={handleClick}
        className={`my-side-bar ${matchRoute(nav["to"]) ? "text-white" : "opacity-50"}`}>
        <div className={`flex items-center gap-x-2 hover:bg-neutral m-1 ${matchRoute(nav["to"]) ? "bg-neutral" : "bg-base"} p-1 rounded-md`}>
          <div className={"flex w-[32px] justify-end pr-[5px]"}><FaCircle size={5}/></div>
          <span>{nav["name"]}</span>
        </div>

      </NavLink>
    );
  };

  const ItemGroup = ({ nav }) => {
    return (
      <>
        <div className="flex items-center p-1 m-1 my-side-bar justify-between cursor-pointer w-full hover:bg-neutral opacity-50 rounded-md" onClick={() => {
          setIsExpanded(!isExpanded);
        }}>
          <div className={`flex flex-row gap-x-2 opacity-50`}>
            <div className={"w-[32px]"}>{nav["icon"]}</div>
            <span>{nav["name"]}</span>
          </div>
          <FaChevronDown className={`text-sm ${isExpanded ? "rotate-180" : ""}`} />
        </div>
        <div className={`w-full ` + (isExpanded ? "" : "hidden")}>
          {nav.items?.map((item) =>
            item.items ? (
              <ItemGroup nav={item} key={item["name"]} />
            ) : <ItemSubMenu nav={{ ...item }} key={item["name"]} />
          )}
        </div>
      </>
    );
  };

  const CreateSidebarMenu = () => {
    if (nav["component"] === "title") {
      return (<div className={"my-side-bar font-semibold mt-3 mb-1"}>{nav["name"]}</div>);
    } else if (nav["component"] === "item") {
      return (<ItemMenu nav={nav} />);
    } else if (nav["component"] === "group") {
      return (<ItemGroup nav={nav} />);
    } else {
      return (<div>Undefined</div>);
    }
  };
  return (<CreateSidebarMenu />);
}
