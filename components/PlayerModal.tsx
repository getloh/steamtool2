

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
import { DateTime } from "luxon";

export interface PlayerModalProps
{
    data?: apiPlayerIdSingle;
    games?: apiGamesListResponse[];
    visible: boolean;
    onClose: Function;
}

export default function PlayerModal(props: PlayerModalProps)
{

    function unixToDate(unix: number): DateTime
    {
        let date = DateTime.fromSeconds(unix)
        return date
    }

    function dateToYearsAgo(date: DateTime): DateTime
    {
        let today = DateTime.now();
        // let diff = today.minus(date)
        let diff = today.diff(date, ["years"]).toObject()
        return (Math.floor(diff.years) + " Years ago")
    }

    function getHoursPlayed()
    {
        let mins = userGameData?.games.reduce((a, b) => a + b.playtime_forever, 0);
        if (mins !== undefined)
        {
            return Math.round(mins / 60);
        }
        return "No Data"
    }

    function getIntensity()
    {
        console.log(props.games)
    }

    const userGameData = props.games?.filter(item => item?.steamid == props.data?.steamid).pop()


    return (
        <Modal
            visible={props.visible}
            onClose={props.onClose}
        >

            <div className="w-full p-2 h-full flex flex-col sm:flex-row justify-between">
                <div className="flex-grow">

                    {/** //! PROFILE AREA */}
                    <div className="flex justify-between flex-col sm:flex-row">
                        <div className="flex" >
                            <div className="flex flex-col justify-between">
                                {props.data ?
                                    <div className="h-20 xl:h-40 aspect-square">
                                        <Image src={props.data?.avatarfull ?? ""} height={200} width={200} alt="avatar" className="rounded-md" />
                                    </div>
                                    :
                                    null
                                }
                                <button className="fill-white h-8 w-8 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500 sm:hidden">
                                    <SteamIcon size={"100%"} />
                                </button>
                            </div>
                            <div className="ml-2 pb-2 border">
                                <p className="text-3xl xl:text-6xl xl:py-2">{props.data?.personaname}</p>
                                {props.data?.communityvisibilitystate === 3 ?
                                    <div>

                                        <p className="xl:text-2xl">{props.data?.realname}</p>
                                        <p className="text-xs sm:text-sm xl:text-base">Acc Created: {props.data?.timecreated ? unixToDate(props.data.timecreated).toFormat("d MMM yyyy") + " (" + dateToYearsAgo(unixToDate(props.data.timecreated)) + ")" : "X"}</p>
                                        <p className="text-xs sm:text-sm xl:text-base">{props.data?.lastlogoff ? "Last Update: " + unixToDate(props.data.lastlogoff).toFormat("dd/MM/yyyy") : ""}</p>
                                        <p className={props.data?.personastate === 1 ? "text-green-500 text-sm xl:text-base" : "text-neutral-500 text-sm xl:text-base"}>{props.data?.personastate === 1 ? "Online" : "Offline"}</p>

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
                        <div className="mr-4 flex flex-col items-end justify-between border border-red-800">
                            <a href={props.data?.profileurl} target="_blank">
                                <button className="fill-white h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500 hidden sm:block">
                                    <SteamIcon size={"100%"} />
                                </button>
                            </a>
                            <p className="text-xl xl:text-2xl text-right p-2 -mb-1">Most played games</p>

                            {/* <button className=" fill-teal-500 h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500" onClick={() => {console.log(props.data)}}>
                                    <p className="">PlayerData</p>
                                </button>
                            <button className=" fill-red-500 h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500" onClick={() => {console.log(props.games)}}>
                                    <p>gameData</p>
                                </button> */}
                        </div>
                    </div>

                    {/** //!GAME ZONE */}
                    {props.data?.communityvisibilitystate === 3 && props.games ?
                        <div className="">
                            {/* <p className="text-lg xl:text-2xl text-right p-2">Most played games</p> */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 pr-2 overflow-y-scroll h-[50vh] xl:h-auto xl:overflow-y-auto">

                                {userGameData?.games?.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 10).map((game) =>
                                {
                                    return (<GameTile key={game.appid}
                                        data={game} />)
                                })}
                            </div>
                        </div>
                        : null
                    }
                </div>

                {/** //! INTENSITY AREA */}
                {userGameData?.games ?
                    <div className="border-2 border-green-400">
                        <p className="text-center text-2xl">Intensity<br></br> Score</p>

                        <div className="text-center">
                            <p className="text-blue-200">Total Games: {userGameData?.game_count}</p>
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