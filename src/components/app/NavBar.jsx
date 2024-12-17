import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {FiMenu} from "react-icons/fi";
import {setOpenSideMenu} from "shared/stores/sidebarSlice.js";
import {IoPersonOutline} from "react-icons/io5";
import {ModalDialog} from "shared/components/dialog";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {setUserLogin} from "shared/stores/authSlice.js";
import {AppRoutes} from "src/routers/router.js";

const NavBar = ({title, left, right}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {openSideMenu} = useSelector((state) => state.sidebar);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate()

    const logout = () => {
        dispatch(setUserLogin({token: "", email: ""}));
        navigate(AppRoutes.userLogin.to);
    }

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
                <button className="btn btn-ghost btn-circle" onClick={() => {
                    setConfirmationModal({
                        title: t("dialog.logOutTitle"),
                        content: <div>{t("dialog.logOutDesc")}</div>,
                        confirmText: "Logout",
                        cancelText: "Cancel",
                        onConfirmClick: () => logout(),
                        onCancelClick: () => setConfirmationModal(null),
                    })
                }}>
                    <IoPersonOutline className={"text-2xl"}/>
                </button>
            </div>
            {confirmationModal && <ModalDialog modal={confirmationModal}/>}
        </div>
    )
}

export default NavBar
