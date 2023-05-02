

import { apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect } from "react";
import classNames from "classnames";
import VisibilityIcon from "./icons/VisibilityIcon";
import VisibilityOffIcon from "./icons/VisibilityOffIcon";
import DeleteIcon from "./icons/DeleteIcon";

export interface AvatarProps
{
    data: apiPlayerIdSingle;
    enabled: boolean;
    onOpen: Function;
    onToggle: Function;
    onDelete: Function;
}

export default function Avatar(props: AvatarProps)
{

    const [hover, setHover] = useState(false)


    
    function hoverIn(): void
    {
        // console.log("IN");
        setHover(true);
    }

    function hoverOut(): void
    {
        // console.log("OUT");
        setHover(false);
    }

    const avatarSideClass = classNames(
        "transition-all bg-neutral-900 overflow-hidden flex flex-column items-center h-10 rounded-l-md bg-opacity-80 pl-1",
        // hover ? "block" : "hidden",
        hover ? "w-14": "w-0"
    )

    const avatarImageClass = classNames(
        "h-full w-full rounded-md filter transition duration-500",
        props.enabled ? "brightness-100" : "brightness-50"
    )

    return (
        <div className="flex items-center "
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        >
            <div className={avatarSideClass}>
                <button onClick={() => props.onToggle()} className=" hover:fill-orange-300 fill-white transition-colors">
                    {props.enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                
                </button>
                <button onClick={() => {props.onDelete()}} className=" hover:fill-red-500 fill-white transition-colors">
                <DeleteIcon />
                </button>

            </div>

            <div className="w-16 aspect-square p-1 cursor-pointer" onClick={() => props.onOpen()}>
                <img src={props.data?.avatarmedium} className={avatarImageClass} />
            </div>
        </div>
    )
}