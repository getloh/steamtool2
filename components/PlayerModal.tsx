

import { apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect } from "react";
import classNames from "classnames";
import VisibilityIcon from "./icons/VisibilityIcon";
import VisibilityOffIcon from "./icons/VisibilityOffIcon";
import DeleteIcon from "./icons/DeleteIcon";
import Modal from "./Modal";

export interface PlayerModalProps
{
    data?: apiPlayerIdSingle;
    visible: boolean;
    onClose: Function;
}

export default function PlayerModal(props: PlayerModalProps)
{

    return (
        <Modal
            visible={props.visible}
            onClose={props.onClose}
        >
            {/* <div className="bg-white w-full h-full z-30 rounded-md p-2"> */}
                {/* <button className="w-80 h-80 bg-teal-700" onClick={()=>console.log("TEST")}>
                    <p>PRESS MEEEE</p>
                </button> */}
                
            {/* </div> */}
            <div className="w-full border-2 border-red-700">

            <p className="t">{props.data?.personaname}</p>
            <p className="1">{props.data?.realname}</p>
            <p className="2">{props.data?.avatar}</p>
            </div>
        </Modal>
    )
}