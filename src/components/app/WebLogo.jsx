import Logo from "src/assets/logo.png";
import React from "react";
import {APP_NAME} from "src/constants/config.js";

const WebLogo = () => {
    return(
        <a className='content-center flex flex-row gap-x-2' href='/public'>
            <img src={Logo} loading='lazy' alt='' className='inline w-[32px]'/>
            <div className='text-2xl font-bold text-tertiary'>{APP_NAME}</div>
        </a>
    )
}
export default WebLogo