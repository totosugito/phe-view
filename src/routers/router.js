import {RiHome5Fill, RiDatabase2Line, RiShip2Line} from "react-icons/ri";
import {LuGlobe} from "react-icons/lu";

const iconClassName = "text-2xl";
export const AppRoutes = {
  userRegister: {
    name: "Register",
    to: "/user/register",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  userLogin: {
    name: "Login",
    to: "/login",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  productionData: {
    name: "Production Data",
    to: "/production-data",
    icon: <RiDatabase2Line className={iconClassName}/>,
  },
  oilLosses: {
    name: "Oil Losses",
    to: "/oil-losses",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualOil: {
    name: "Actual Oil",
    to: "/actual-oil",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualGas: {
    name: "Actual Gas",
    to: "/production-actual-gas",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  vesselTracking: {
    name: "Vessel Tracking",
    to: "/vessel-tracking",
    icon: <RiShip2Line className={iconClassName}/>,
  },
}

export const DefaultUserRouter = AppRoutes.oilLosses.to;

export const AppNavigation = [
  {
    component: "title",
    name: "GENERAL"
  },
  {
    component: "group",
    name: "Surveillance Map",
    to: "/base",
    icon: <LuGlobe className={iconClassName}/>,
    items: [
      {...AppRoutes.oilLosses, component: "item"},
      {...AppRoutes.actualOil, component: "item"},
      {...AppRoutes.actualGas, component: "item"},
    ]
  },
  {...AppRoutes.productionData, component: "item"},
  {...AppRoutes.vesselTracking, component: "item"},
]