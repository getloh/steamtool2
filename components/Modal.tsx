

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
        props.visible ? "flex flex-col visible" : "invisible bg-opacity-0",

    )

    function onClose()
    {
        props.onClose();
    }

    //TODO: Make the outside bit clickable and trigger onclose

    return (
        <div className={modalStyles}
        >
            <button className="absolute top-0 right-0 " onClick={onClose}>
                <p>Close</p>
            </button>

            <div className="h-1/6 w-full "
                onClick={onClose}
            ></div>
            <div className="h-3/4 w-full flex">
                <div className="w-1/6" onClick={onClose}

                ></div>
                <div className="w-3/4 rounded-md p-2">
                    <div className="w-full h-full z-30 rounded-md p-1 bg-neutral-900">

                        {props.children}
                    </div>
                </div>
                <div className="w-1/6" onClick={onClose}

                ></div>
            </div>
            <div className="h-1/6 w-full" onClick={onClose}

            ></div>
        </div>
    )
}