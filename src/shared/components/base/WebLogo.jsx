import React from "react";

const WebLogo = ({logo}) => {
    return(
        <div className='content-center'>
            <img src={logo} loading='lazy' alt='' className='inline sm:w-[130px] w-[100px]'/>
        </div>
    )
}
export default WebLogo