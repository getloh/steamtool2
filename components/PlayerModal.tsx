

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
import { Button } from "./Button";
import IntensityMeter from "./IntensityMeter";

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

    function dateToYearsAgo(date: DateTime): string
    {
        let today = DateTime.now();
        // let diff = today.minus(date)
        let diff = today.diff(date, ["years"]).toObject()
        //@ts-ignore
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

    function getIntensity(): JSX.Element
    {
        let hoursPlayed = getHoursPlayed();
        console.log(props.games)
        if (hoursPlayed !== "No Data"){
            let hourPoints = Number(hoursPlayed) / 166;
            let gamePoints = Number(userGameData?.game_count) / 31

            return (
                <IntensityMeter value={hourPoints + gamePoints}/>
            )
        }
        return <div></div>
    }

    const userGameData = props.games?.filter(item => item?.steamid == props.data?.steamid).pop()


    return (
        <Modal
            visible={props.visible}
            onClose={props.onClose}
        >

            <div className="w-full p-2 h-full flex flex-col justify-between">
                <div className="">

                    {/** //! PROFILE AREA */}
                    <div className="flex justify-between flex-col sm:flex-row">
                        <div className="flex justify-between" >
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
                            <div className="ml-2 pb-2">
                                <p className="text-3xl xl:text-6xl xl:py-2 text-right sm:text-left">{props.data?.personaname}</p>
                                {props.data?.communityvisibilitystate === 3 ?
                                    <div className="text-right sm:text-left">

                                        <p className="xl:text-2xl">{props.data?.realname}</p>
                                        <div className="flex justify-end sm:justify-normal">
                                            <p className="text-xs sm:text-sm xl:text-base">Created: {props.data?.timecreated ? unixToDate(props.data.timecreated).toFormat("d MMM yyyy") : "X"}</p>
                                            <p className="pl-1 text-xs sm:text-sm xl:text-base hidden sm:inline">{props.data?.timecreated ? "(" + dateToYearsAgo(unixToDate(props.data.timecreated)) + ")" : "X"}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm xl:text-base">{props.data?.lastlogoff ? "Last Update: " + unixToDate(props.data.lastlogoff).toFormat("dd/MM/yyyy") : ""}</p>
                                        <p className={props.data?.personastate === 1 ? "text-green-500 text-xs xl:text-base" : "text-neutral-500 text-xs xl:text-base"}>{props.data?.personastate === 1 ? "Online" : "Offline"}</p>

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
                        <div className="mr-4 flex flex-col items-end justify-between">
                            <a href={props.data?.profileurl} target="_blank">
                                <button className="fill-white h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500 hidden sm:block">
                                    <SteamIcon size={"100%"} />
                                </button>
                            </a>
                            {props.data?.communityvisibilitystate === 3 && userGameData.games ?

                                <p className="text-xl xl:text-2xl text-right p-2 -mb-1">Most played games</p>
                                : null
                            }

                            {/* <button className=" fill-teal-500 h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500" onClick={() => {console.log(props.data)}}>
                                    <p className="">PlayerData</p>
                                </button>
                            <button className=" fill-red-500 h-12 w-12 overflow-hidden object-contain opacity-40 hover:opacity-100 transition duration-500" onClick={() => {console.log(props.games)}}>
                                    <p>gameData</p>
                                </button> */}
                        </div>
                    </div>

                    {/** //!GAME ZONE */}
                    {props.data?.communityvisibilitystate === 3 && userGameData.games ?
                        <div className="h-[55vh]">
                            {/* <p className="text-lg xl:text-2xl text-right p-2">Most played games</p> */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 pr-2 overflow-y-scroll h-full xl:h-auto xl:overflow-y-auto">

                                {userGameData?.games?.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 10).map((game) =>
                                {
                                    return (<GameTile key={game.appid}
                                        data={game} />)
                                })}
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center flex-col pt-8">
                            <p className="font-bold">Unable to find game information for this account</p>
                            <p>Account may have no games, or may be set to limited privacy</p>
                            <p>If this is your account, review your privacy settings</p>

                            {props.data?.communityvisibilitystate === 3 ?
                                <a href="https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276" target="_blank" >
                                    <Button>
                                        Steam FAQ
                                    </Button>
                                </a>
                                :
                                null
                            }
                        </div>
                    }
                </div>

                {/** //! INTENSITY AREA */}
                {userGameData?.games ?
                    <div className=" flex justify-between items-center">
                        {/* <div className="l"> */}
                        {/* <div className="flex gap-2">

                            <p className="text-center md:text-2xl">Intensity Level</p>
                            <IntensityMeter value={getIntensity()}/>
                        </div> */}
                        {getIntensity()}
                            <div className="text-end">
                                <p className="text-blue-200 text-xs md:text-lg">Total Games: {userGameData?.game_count}</p>
                                <p className="text-blue-200 text-xs md:text-lg">Hours played: {getHoursPlayed()}</p>
                            </div>
                        {/* </div> */}
                        {/* <div id="r" className="flex justify-end h-full mt-4">
                        </div> */}
                    </div>
                    :
                    null
                }
            </div>
        </Modal>
    )
}