import { SvgProps } from "./SvgProps"

export default function CloseIcon(props: SvgProps)
{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size ? props.size : "24"} viewBox="0 96 960 960" width={props.size ? props.size : "24"}>
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
    )
}