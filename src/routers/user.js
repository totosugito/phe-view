import {UserDashboard} from "../pages/user/index.js";

export const RouteUserDashboard = {
  name: "",
  navBar: "",
  path: "user/dashboard",
};

export const DefaultRouteUser = RouteUserDashboard;
export const userRoutes = [
  {route: RouteUserDashboard, element: UserDashboard},
];