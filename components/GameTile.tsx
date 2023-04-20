import { apiGameData } from "@/types/apiResponses"

export interface GameTileProps{
    data: apiGameData;
}


export default function GameTile(props: GameTileProps) {



    return (
        <div className="p-4 bg-teal-950">
            <p>{props.data.name}</p>
        </div>
    )

    

}