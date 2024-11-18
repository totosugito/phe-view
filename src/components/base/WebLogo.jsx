import Logo from "../../assets/logo.png";
import React from "react";
import {APP_NAME} from "../../constants/config.js";

const WebLogo = () => {
    return(
        <a className='content-center flex flex-row gap-x-2' href='/'>
            <img src={Logo} loading='lazy' alt='' className='inline w-[32px]'/>
            <div className='text-2xl font-bold text-tertiary'>{APP_NAME}</div>
        </a>
    )
}
export default WebLogo