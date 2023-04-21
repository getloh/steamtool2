import { apiGameData, apiPlayerIdSingle } from "@/types/apiResponses"
import Image from "next/image";
import SteamIcon from "./icons/SteamIcon";

export interface GameTileProps
{
    data: apiGameData;
    users: apiPlayerIdSingle[];
}


export default function GameTile(props: GameTileProps)
{



    return (
        <div className="p-4 bg-zinc-950 flex justify-between relative rounded-md">
            <div className="flex z-10 border">

                <img className="w-10 h-10 mr-2" alt={props.data.name + " icon"} src={"http://media.steampowered.com/steamcommunity/public/images/apps/" + props.data.appid + "/" + props.data.img_icon_url + ".jpg"}></img>

                <div className="">
                    <p className="">{props.data.name}</p>
                    <p className="text-xs">{props.data.appid}</p>
                </div>
            </div>

            <div className="-mt-2 -mr-2">
                <button className="fill-white opacity-50 hover:opacity-100 transition h-6 w-6 overflow-hidden object-contain ">
                <SteamIcon size={"100%"}/>
                </button>
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