import { apiGameData, apiPlayerIdSingle } from "@/types/apiResponses"

export interface GameTileProps
{
    data: apiGameData;
    users: apiPlayerIdSingle[];
}


export default function GameTile(props: GameTileProps)
{



    return (
        <div className="p-4 bg-teal-950 flex justify-between">
            <p className="w-2/3">{props.data.name}</p>
            <div className="flex justify-end items-middle gap-1">

                {props.users.map((user) =>
                {
                    return (
                        <img className="h-6 w-6 rounded-md" src={user.avatar} />
                    )
                })}
            </div>
        </div>
    )



}