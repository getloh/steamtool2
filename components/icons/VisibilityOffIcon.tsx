import { SvgProps } from "./SvgProps"

export default function VisibilityOffIcon(props: SvgProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size ? props.size : "24"} viewBox="0 96 960 960" width={props.size ? props.size : "24"}><path fill={props.color ? props.color : "#FFF"} d="M792 1000 624 834q-35 11-70.5 16.5T480 856q-151 0-269-83.5T40 556q21-53 53-98.5t73-81.5L56 264l56-56 736 736-56 56ZM480 736q11 0 20.5-1t20.5-4L305 515q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480 736Zm292 18L645 628q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480 376q-20 0-37.5 4T408 392L306 290q41-17 84-25.5t90-8.5q151 0 269 83.5T920 556q-23 59-60.5 109.5T772 754ZM587 570 467 450q28-5 51.5 4.5T559 482q17 18 24.5 41.5T587 570Z"/></svg>
    )
}