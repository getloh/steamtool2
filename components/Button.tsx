import { ReactNode } from "react";

export interface ButtonProps {
    onClick: Function;
    children?: ReactNode;
}

export const Button = (props: ButtonProps) =>
{

    return (

        <button className="p-2 bg-sky-800 hover:bg-sky-600 mt-2 rounded-md transition duration-300" onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}