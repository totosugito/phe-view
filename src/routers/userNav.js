import {LuGlobe} from "react-icons/lu";
import {TbFileReport} from "react-icons/tb";
import {AppRoutes} from "./router.js";

const iconClassName = "text-2xl";
export const AppNavigation = [
  {
    component: "title",
    name: "MONITOR"
  },
  {
    component: "group",
    name: "Surveillance Map",
    to: "/base",
    icon: <LuGlobe className={iconClassName}/>,
    items: [
      {...AppRoutes.actualOil, component: "item"},
      {...AppRoutes.actualGas, component: "item"},
      {...AppRoutes.potentialOil, component: "item"},
      {...AppRoutes.potentialGas, component: "item"},
      {...AppRoutes.oilLosses, component: "item"},
    ]
  },
  {...AppRoutes.productionData, component: "item"},
  {...AppRoutes.vesselTracking, component: "item"},
  {
    component: "title",
    name: "ZARA TOOLS",
  },
  {
    component: "item",
    name: AppRoutes.dailyReport.name,
    to: "https://076a-118-137-172-3.ngrok-free.app",
    target: "_blank",
    icon: <TbFileReport className={iconClassName}/>,
  },
  {
    component: "title",
    name: "DATA MANAGEMENT"
  },
  {
    component: "title",
    name: "SETTING"
  },
  {
    component: "title",
    name: "ABOUT"
  },
]