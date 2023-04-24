import { apiGameData, apiPlayerIdSingle } from "@/types/apiResponses"
import Image from "next/image";
import SteamIcon from "./icons/SteamIcon";
import classNames from "classnames";

export interface GameTileProps
{
    data: apiGameData;
    users: apiPlayerIdSingle[];
}


export default function GameTile(props: GameTileProps)
{

    return (
        <div className="p-4 bg-neutral-950 flex justify-between relative rounded-md hover:bg-sky-950 group">
            <div className="flex z-10 items-center">
                {props.data.img_icon_url !== "" ? 
                
                <img className="w-10 h-10 mr-2" alt={props.data.name + " icon"} src={"http://media.steampowered.com/steamcommunity/public/images/apps/" + props.data.appid + "/" + props.data.img_icon_url + ".jpg"}></img>
                : 
                <div className="w-10 h-10 mr-2"></div>    
            }

                <div className="flex flex-col justify-center">
                    <p className={props.data.name.length > 25 ? "text-sm xl:text-base" : "text-md xl:text-lg"}>{props.data.name}</p>
                    <p className="text-2xs opacity-40">AppID: {props.data.appid}</p>
                </div>
            </div>

            <div className="-mt-2 -mr-2 ml-6 ">
                <a href={"https://store.steampowered.com/app/" + props.data.appid} target="_blank">
                    <button className="fill-white opacity-0 hover:!opacity-100 hover:fill-white h-6 w-6 overflow-hidden object-contain group-hover:opacity-20">
                        <SteamIcon size={"100%"} />
                    </button>
                </a>
            </div>




            <div className="flex justify-end items-end gap-1 absolute bottom-2 right-2 z-0 opacity-80">
                {props.users.map((user) =>
                {
                    return (
                        <img className="h-6 w-6 rounded-md" src={user.avatar} key={user.steamid} />
                    )
                })}
            </div>

        </div>
    )



}