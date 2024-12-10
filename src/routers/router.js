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
    to: "/user/login",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  productionData: {
    name: "Production Data",
    to: "/production-data",
    // to: "/",
    icon: <RiDatabase2Line className={iconClassName}/>,
  },
  oilLosses: {
    name: "Oil Losses",
    to: "/oil-losses",
    // to: "/",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualOil: {
    name: "Actual Oil",
    to: "/production-actual-oil",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  actualGas: {
    name: "Actual Gas",
    to: "/production-actual-gas",
    // to: "/",
    icon: <RiHome5Fill className={iconClassName}/>,
  },
  vesselTracking: {
    name: "Vessel Tracking",
    // to: "/vessel-tracking",
    to: "/",
    icon: <RiShip2Line className={iconClassName}/>,
  },
}

export const AppNavigation = [
  {
    component: "title",
    name: "GENERAL"
  },
  {...AppRoutes.vesselTracking, component: "item"},
  {...AppRoutes.productionData, component: "item"},
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
  }
]