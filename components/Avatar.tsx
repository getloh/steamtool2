

import { apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect } from "react";
import classNames from "classnames";

export interface AvatarProps
{
    player: apiPlayerIdSingle;
    selected: boolean;

}

export default function Avatar(props: any)
{

    const [hover, setHover] = useState(false)


    
    function hoverIn()
    {
        console.log("IN");
        setHover(true);
    }

    function hoverOut()
    {
        console.log("OUT");
        setHover(false);
    }

    const avatarSideClass = classNames(
        "border-2 border-slate-200 transition-all bg-slate-600 overflow-hidden",
        // hover ? "block" : "hidden",
        hover ? "w-8": "w-0"
    )

    return (
        <div className="flex"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        >
            <div className={avatarSideClass}>
                <p>TEST</p>
            </div>
            <div className="w-16 aspect-square border-2 border-red-900 p-1 cursor-pointer">
                <div className="bg-lime-900 h-full w-full"
                // this is the avatar image container
                >
                    <p>test</p>
                </div>
            </div>
        </div>
    )
}