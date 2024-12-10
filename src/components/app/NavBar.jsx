import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {FiMenu} from "react-icons/fi";
import {setOpenSideMenu} from "src/stores/slices/sidebarSlice.js";

const NavBar = ({title, left, right}) => {
  const dispatch = useDispatch();
  const { openSideMenu } = useSelector((state) => state.sidebar);

  return (
    <div className="navbar items-center justify-between shadow px-4 min-w-full">
      <div className={"flex gap-x-2"}>
      <div role="button" className="btn btn-ghost btn-circle avatar">
        <button className={"flex btn-ghost btn-circle text-center items-center justify-center"}
                onClick={() => dispatch(setOpenSideMenu(!openSideMenu))}>
          <FiMenu fontSize={20}/>
        </button>
      </div>
        {title}
        {left}
      </div>

      <div className='flex gap-x-4 items-center'>
        {right}
      </div>
    </div>
  )
}

export default NavBar
