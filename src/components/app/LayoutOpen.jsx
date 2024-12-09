import AppSidebar from "./AppSidebar.jsx";
import {Outlet} from "react-router-dom";

const LayoutOpen = ({navigation}) => {
  return (
    <div className={"h-screen flex flex-row overflow-auto"}>
      <div data-theme={"dark"}>
        <AppSidebar navigation={navigation}/>
      </div>
      <div data-theme={"light"} className="w-full overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};
export default LayoutOpen;