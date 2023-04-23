

import { apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect, ReactNode } from "react";
import classNames from "classnames";
import VisibilityIcon from "./icons/VisibilityIcon";
import VisibilityOffIcon from "./icons/VisibilityOffIcon";
import DeleteIcon from "./icons/DeleteIcon";


export interface ModalProps
{
    children?: ReactNode;
    visible?: boolean;
    onClose: Function;
}

export default function Modal(props: ModalProps)
{

    const modalStyles = classNames(
        "fixed top-0 left-0 w-full h-full z-20 border-2 border-green-500 bg-black bg-opacity-70 items-center justify-center transition duration-500",
        props.visible ? "flex visible " : "invisible bg-opacity-0",

    )

    function onClose(){
        props.onClose();
    }

    return (
        <div className={modalStyles}
            onClick={()=>console.log("OUTSIDE CLICKED")}
        >
            <button className="absolute top-0 right-0 " onClick={onClose}>
                <p>Close</p>
            </button>
            {props.children}
        </div>
    )
}