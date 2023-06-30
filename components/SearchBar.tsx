"use client";

import SearchUserIcon from "./icons/SearchUserIcon";

export interface SearchBarProps
{
    onChange: Function;
    value: string;
    onEnter: Function;
    loading?: boolean;
}

export default function SearchBar(props: SearchBarProps)
{

    function onType(e: any)
    {
        props.onChange(e.target.value)
    }

    function checkKeyPress(e: any)
    {
        if (e.key === 'Enter')
        {
            props.onEnter();
        }
    }

    return (
        <div className="flex relative items-center">
 
                <div
                    className={`inline-block h-6 w-6 mr-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${props.loading ? "visible" : "invisible"}`}
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading</span
                    >
                </div>
                
            <input name="myInput"
                className="shadow appearance-none border border-neutral-500 rounded-md w-full py-2 pl-2 pr-10 leading-tight outline-none text-zinc-200 bg-zinc-800 focus:border-2 focus:border-white"
                value={props.value}
                onKeyUp={checkKeyPress}
                onChange={onType}
                placeholder="Search for UserID or VanityURL"
            />
            <button className="absolute right-1 shadow appearance-none rounded-l-none py-1 px-2 leading-tight outline-none text-zinc-200 bg-zinc-800 rounded-md fill-white opacity-40 hover:opacity-100"><SearchUserIcon /></button>

        </div>
    )


}