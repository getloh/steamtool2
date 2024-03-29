import { apiGameData, apiPlayerIdSingle } from "@/types/apiResponses"
import Image from "next/image";
import SteamIcon from "./icons/SteamIcon";

export interface GameTileProps
{
    data: apiGameData;
    users?: apiPlayerIdSingle[];
    hours?: boolean;
}

export default function GameTile(props: GameTileProps)
{
    return (
        <div className="p-2 sm:p-4 bg-neutral-950 flex justify-between relative rounded-md hover:bg-sky-900 group">
            <div className="flex z-10 items-center">
                {props.data.img_icon_url !== "" ?

                    <img className="w-10 h-10 mr-2" alt={props.data.name + " icon"} src={"http://media.steampowered.com/steamcommunity/public/images/apps/" + props.data.appid + "/" + props.data.img_icon_url + ".jpg"}></img>
                    :
                    <div className="w-10 h-10 mr-2"></div>
                }

                <div className="flex flex-col justify-center">
                    <p className={props.data.name.length > 25 ? "text-xs sm:text-sm xl:text-base" : "text-md xl:text-lg"}>{props.data.name}</p>
                    <p className="text-2xs opacity-40">AppID: {props.data.appid}</p>
                </div>
            </div>

            <div className="-mt-1 md:-mt-2 md:-mr-2 ml-6 ">
                <a href={"https://store.steampowered.com/app/" + props.data.appid} target="_blank">
                    <button className="fill-white opacity-0 hover:!opacity-100 hover:fill-white h-4 w-4 md:h-6 md:w-6 overflow-hidden object-contain group-hover:opacity-20">
                        <SteamIcon size={"100%"} />
                    </button>
                </a>
            </div>

            {props.users ?
                <div className="flex justify-end items-end gap-1 absolute bottom-2 right-2 z-0 opacity-80">
                    {props.users?.map((user) =>
                    {
                        return (
                            <img className="h-6 w-6 rounded-md filter brightness-75" src={user.avatar} key={user.steamid} />
                        )
                    })}
                </div>

                :
                <div className="flex justify-end items-end gap-1 absolute bottom-2 right-2 z-0 opacity-80">
                    {props.data.playtime_forever !== 0 ? 
                    <p className="text-xs sm:text-base">{Math.round(props.data.playtime_forever / 60)} Hrs</p>
                    :
                    <p className="text-xs sm:text-base">Unplayed</p>
                    }

                </div>
            }

        </div>
    )
}