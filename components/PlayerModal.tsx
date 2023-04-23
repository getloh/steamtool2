

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
            <div className="bg-white w-2/3 h-2/3 z-30">
                <button className="w-80 h-80 bg-teal-700" onClick={()=>console.log("TEST")}>
                    <p>PRESS MEEEE</p>
                </button>
                
            </div>
        </Modal>
    )
}