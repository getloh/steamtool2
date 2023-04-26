

import { apiGamesListResponse, apiPlayerIdSingle } from "@/types/apiResponses"
import { useState, useEffect } from "react";
import classNames from "classnames";
import VisibilityIcon from "./icons/VisibilityIcon";
import VisibilityOffIcon from "./icons/VisibilityOffIcon";
import DeleteIcon from "./icons/DeleteIcon";
import Modal from "./Modal";
import Image from "next/image";
import GameTile from "./GameTile";
import SteamIcon from "./icons/SteamIcon";

export interface PlayerModalProps
{
    data?: apiPlayerIdSingle;
    games?: apiGamesListResponse;
    visible: boolean;
    onClose: Function;
}

export default function PlayerModal(props: PlayerModalProps)
{

    function unixToDate(unix: number): Date
    {
        let date = new Date(unix * 1000)
        return date
    }

    function dateToYearsAgo(date: Date)
    {
        let today = new Date();
        return (today.getFullYear() - date.getFullYear() + " Years old")
    }

    function getHoursPlayed()
    {
        let mins = props.games?.games.reduce((a, b) => a + b.playtime_forever, 0);
        if (mins !== undefined)
        {
            return Math.round(mins / 60);
        }
        return "No Data"
    }

    function getIntensity()
    {

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
            <div className="w-full p-2 h-full flex justify-between">
                <div className="flex-grow">

                    <div className="flex justify-between">
                        <div className="flex">
                            <Image src={props.data?.avatarfull} height={200} width={200} alt="avatar" className="aspect-square rounded-md" />
                            <div className="ml-2 border">
                                <p className=" text-6xl py-2">{props.data?.personaname}</p>
                                {props.data?.communityvisibilitystate === 3 ?
                                    <div>

                                        <p className=" text-2xl">{props.data?.realname}</p>
                                        <p className="">Account Created: {props.data?.timecreated ? unixToDate(props.data.timecreated).toDateString() + " (" + dateToYearsAgo(unixToDate(props.data.timecreated)) + ")" : "X"}</p>
                                        <p className="1">{props.data?.lastlogoff ? "Last Update: " + unixToDate(props.data.lastlogoff).toDateString() : ""}</p>
                                        <p className={props.data?.personastate === 1 ? "text-green-500" : "text-neutral-500"}>{props.data?.personastate === 1 ? "Online" : "Offline"}</p>
                                        <p className="text-2xs">Location Code: {props.data?.loccountrycode ? props.data?.loccountrycode : "Unknown"}</p>
                                        <p className="text-2xs">SteamID: {props.data?.steamid}</p>
                                    </div>
                                    :
                                    <div>
                                        <p className="font-bold">This account is private</p>
                                        <p>If this is your account, click below see more info on how to make account public</p>
                                        <a href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276" target="_blank" >
                                            <button className="p-2 bg-sky-800 hover:bg-sky-600 mt-2 rounded-md">
                                                Steam FAQ
                                            </button>
                                        </a>
                                    </div>

                                }
                            </div>
                        </div>
                        <div className="mr-2">
                            <a href={props.data?.profileurl} target="_blank">
                                <button className="fill-white h-8 w-8 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500">
                                    <SteamIcon size={"100%"} />
                                </button>
                            </a>
                        </div>
                    </div>
                    {props.data?.communityvisibilitystate === 3 ?


                        <div>
                            <p className="text-2xl text-right p-2">Most played games</p>
                            <div className="grid grid-cols-2 w-full gap-2 pr-2">

                                {props.games?.games?.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 10).map((game) =>
                                {
                                    return (<GameTile key={game.appid}
                                        data={game} />)
                                })}
                            </div>
                        </div>
                        : null
                    }
                </div>


                {props.games?.games ?
                    <div className="border-2 border-green-400">
                        <p className="text-center text-2xl">Intensity<br></br> Score</p>

                        <div className="text-center">
                            <p className="text-blue-200">Total Games: {props.games?.game_count}</p>
                            <p className="text-blue-200">Hours played: {getHoursPlayed()}</p>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        </Modal>
    )
}