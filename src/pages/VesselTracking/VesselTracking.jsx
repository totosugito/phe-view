import {NavBar} from "src/components/app/index.js";
import {AppRoutes} from "src/routers/router.js";
import {BodyContents, WebLoading} from "shared/components/base";
import {AppFooter} from "src/components/app";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const VesselTracking = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  return (
    <div className={"h-screen flex flex-col"}>
      <NavBar title={<div className={"text-lg"}>{AppRoutes.vesselTracking.name}</div>}/>
      {loading ? <WebLoading/> :
        <BodyContents>
          <div className={"w-full h-full"} style={{position: "relative"}}>
            <iframe
              style={{position: "absolute", top: -5, left: 0, width: "100%"}}
              name="vesselfinder"
              id="vesselfinder"
              className={"w-full h-full"}
              src="https://www.vesselfinder.com/aismap?imo=9503718&track=true&width=1600&height=600&names=true">
              Your browser does not support iframes. Visit <a href="" target="_blank">Waviv</a>.
            </iframe>
            <div style={{position: "absolute", height: "20px", width: "100%", top: -5, left: 0, zIndex: 1000}}
                 className={"bg-base-200"}/>
          </div>
        </BodyContents>
      }
      <AppFooter/>
    </div>
  )
}

export default VesselTracking