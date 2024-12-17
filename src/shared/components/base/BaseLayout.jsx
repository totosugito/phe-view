import React from 'react'
import {Outlet} from "react-router-dom"
import AppSidebar from "./AppSidebar.jsx";

const BaseLayout = ({navigation = null, ...props}) => {
  return (
    (navigation === null) ?
      <div className={"h-screen flex flex-col overflow-auto"}>
        <Outlet/>
      </div>
      :
      <div className={"h-screen flex flex-row overflow-auto"}>
        <div data-theme={"dark"}>
          <AppSidebar navigation={navigation} {...props}/>
        </div>
        <div data-theme={"light"} className="w-full overflow-auto">
          <Outlet/>
        </div>
      </div>
  )
}

export default BaseLayout
