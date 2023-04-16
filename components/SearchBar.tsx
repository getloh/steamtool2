"use client";

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
        <div className="flex">

            <input name="myInput"
                className="shadow appearance-none border border-neutral-500 rounded-md rounded-r-none w-full py-2 px-1 leading-tight outline-none text-zinc-200 bg-zinc-800"
                value={props.value}
                onKeyUp={checkKeyPress}
                onChange={onType}
                placeholder="Search for UserID or VanityURL"
            />
            <button className="shadow appearance-none border border-neutral-500 rounded-l-none rounded-md py-2 px-3 leading-tight outline-none text-zinc-200 bg-zinc-800">@</button>

        </div>
    )


}