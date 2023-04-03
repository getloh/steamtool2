"use client";

export interface SearchBarProps
{
    onChange: Function;
    value: string;
}

export default function SearchBar(props: SearchBarProps)
{


    return (
        <div className="flex">

            <input name="myInput"
                className="shadow appearance-none border border-neutral-500 rounded-md rounded-r-none w-full py-2 px-1 leading-tight outline-none text-zinc-200 bg-zinc-800"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder="Search for UserID or VanityURL"
            />
            <button className="shadow appearance-none border border-neutral-500 rounded-l-none rounded-md py-2 px-3 leading-tight outline-none text-zinc-200 bg-zinc-800">@</button>

        </div>
    )


}