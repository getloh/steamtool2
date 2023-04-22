"use client";

import SearchUserIcon from "./icons/SearchUserIcon";

export interface SearchBarProps
{
    onChange: Function;
    value: string;
    onEnter: Function;
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

            <input name="myInput"
                className="shadow appearance-none border border-neutral-500 rounded-md w-full py-2 pl-1 pr-10 leading-tight outline-none text-zinc-200 bg-zinc-800 focus:border-2 focus:border-white"
                value={props.value}
                onKeyUp={checkKeyPress}
                onChange={onType}
                placeholder="Search for UserID or VanityURL"
            />
            <button className="absolute right-1 shadow appearance-none rounded-l-none rounded-md py-1 px-2 leading-tight outline-none text-zinc-200 bg-zinc-800 rounded-md fill-white opacity-40 hover:opacity-100"><SearchUserIcon /></button>

        </div>
    )


}