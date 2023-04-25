

import { apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect } from "react";
import classNames from "classnames";
import VisibilityIcon from "./icons/VisibilityIcon";
import VisibilityOffIcon from "./icons/VisibilityOffIcon";
import DeleteIcon from "./icons/DeleteIcon";
import Modal from "./Modal";
import Image from "next/image";

export interface PlayerModalProps
{
    data?: apiPlayerIdSingle;
    visible: boolean;
    onClose: Function;
}

export default function PlayerModal(props: PlayerModalProps)
{

    function unixToDate(unix: number){
        let date = new Date(unix * 1000)
        return date.toDateString();
    }

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
            <div className="w-full border-2 border-red-700 p-2">
                <div className="flex">
                    <Image src={props.data?.avatarfull} height={200} width={200} alt="avatar"/>
                    <div className="ml-2">
                        <p className=" text-6xl">{props.data?.personaname}</p>
                        <p className=" text-xl">{props.data?.realname}</p>
                <p className="text-sm">SteamID: {props.data?.steamid}</p>
                {/* unixToDate(props.data?.timecreated) */}
                    </div>
                </div>
                <p className="1">{props.data?.lastlogoff ? "Last Update: " + unixToDate(props.data.lastlogoff) : ""}</p>
                <p className="text-4xl text-red-700">{props.data?.gameid}</p>
                <p className="text-blue-700">Account Created: {props.data?.timecreated ? unixToDate(props.data.timecreated) : "X"}</p>

                <p className="text-green-500">{props.data?.personastate === 1 ? "Online" : "Offline"}</p>

                <p className="1">{props.data?.communityvisibilitystate === 3 ? "Public" : "Private"}</p>

                <p className="text-blue-700">Location Code: {props.data?.loccountrycode}</p>


            </div>
        </Modal>
    )
}