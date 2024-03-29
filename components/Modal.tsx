

import { useState, useEffect, ReactNode } from "react";
import classNames from "classnames";
import CloseIcon from "./icons/CloseIcon";

export interface ModalProps
{
    children?: ReactNode;
    visible?: boolean;
    onClose: Function;
}

export default function Modal(props: ModalProps)
{
    const modalStyles = classNames(
        "fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-70 items-center justify-center transition duration-500 backdrop-blur-sm opacity-0",
        props.visible ? "flex flex-col visible opacity-100" : "invisible bg-opacity-0",
    )

    function onClose()
    {
        props.onClose();
    }

    return (
        <div className={modalStyles}
        >
            <button className="absolute top-1 lg:top-4 right-1 lg:right-4 h-10 xl:h-20 fill-white" onClick={onClose}>
                <CloseIcon size={"100%"}/>
            </button>

            <div className="h-1 sm:h-1/6 w-full"onClick={onClose} id="MODALTOP"/>

            <div className="w-full flex flex-grow justify-center">
                <div className="flex-grow" onClick={onClose}/>
                <div className=" w-[95%] xl:w-3/4 rounded-md p-2">
                    <div className="w-full h-full z-30 rounded-md p-1 bg-neutral-900">

                        {props.children}
                    </div>
                </div>
                <div className="flex-grow" onClick={onClose}/>
            </div>
            
            <div className="h-1 sm:h-1/6 w-full" onClick={onClose} id="MODALBOTTOM"/>
        </div>
    )
}