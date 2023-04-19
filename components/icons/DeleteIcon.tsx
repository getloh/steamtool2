import { SvgProps } from "./SvgProps"

export default function DeleteIcon(props: SvgProps){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size ? props.size : "24"} viewBox="0 96 960 960" width={props.size ? props.size : "24"}><path d="m376 756 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200 856V336h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680 936H280Z"/></svg>
    )
}