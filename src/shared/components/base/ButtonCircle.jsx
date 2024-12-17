import {TiArrowBackOutline} from "react-icons/ti";
import React from "react";

const ButtonCircle = ({children, onClick, ...props}) => {
  return (
      <div className={`flex items-center justify-center rounded-full p-1 hover:bg-neutral-500 hover:text-neutral-300 cursor-pointer text-2xl font-bold ${props?.className}`} onClick={onClick}>
          {children ? children : <TiArrowBackOutline className={"text-3xl"}/>}
      </div>
  )
}

export default ButtonCircle