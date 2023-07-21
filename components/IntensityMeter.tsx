export interface IntensityMeterProps
{
    value: number;
}

export default function IntensityMeter(props: IntensityMeterProps)
{

    function getColor(val: number)
    {
        switch(true){
            case val >= 105: return "bg-black border-2 border-red-500 text-white"
            case val >= 90:  return "bg-[#ff0000] text-black";
            case val >= 75:  return "bg-[#ff4800] text-black"
            case val >= 60:  return "bg-[#ffbb00] text-black"
            case val >= 45:  return "bg-[#bfff00] text-black"
            case val >= 30:  return "bg-[#88ff00] text-black"
            default: return "bg-[#00ff1e]"
        }
    }

    function getIntensity(val: number){
        switch(true){
            case val >= 105: return "Nerd";
            case val >= 90:  return "Hardcore";
            case val >= 75:  return "Gamerboy"
            case val >= 60:  return "Gamergirl"
            case val >= 45:  return "Casual"
            case val >= 30:  return "Filthy Casual"
            default: return "Normie"
        }
    }

    return (
        <div className="flex gap-2 items-center">

            <div className={`h-10 w-10 rounded-full flex justify-center items-center ` + getColor(props.value)}>
                <p className=" font-bold text-center">{Math.floor(props.value)}</p>
            </div>
            <p className="text-md md:text-2xl text-left">Player Intensity: {getIntensity(props.value)}</p>
        </div>
    )
}
