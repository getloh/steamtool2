"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useState, useRef, useEffect } from 'react'
import SearchBar from '@/components/SearchBar';
import { apiGamesListResponse, apiPlayerData, apiPlayerIdSingle } from '@/types/apiResponses';
import Avatar from '@/components/Avatar';

const inter = Inter({ subsets: ['latin'] })

export default function UsersMain()
{

    const [userIds, setUserIds] = useState([]);
    const [userData, setUserData] = useState<apiPlayerIdSingle[]>([]);
    const [userGameData, setUserGameData] = useState<apiGamesListResponse[]>([])        // An object with userID, and an array of games
    const [search, setSearch] = useState("");
    const [loadingUser, setLoadingUser] = useState(false);
    const [error, setError] = useState("");

    /**If the userData state changes,  */
    useEffect(() =>
    {
        if (userData.length == 0)
        {
            console.log("no user data yet, skipping..")
        }
        else
        {
            const idsToFetch = findNewSteamIds(userData, userGameData)

            idsToFetch.map(id =>
            {
                console.log("game fetch goes here")             //usergamedata .filter (!playerids from first array)
                fetch(`/api/gamelist/${id.steamid}`)
                    .then(res => res.json())
                    .then(
                        (result: apiGamesListResponse) =>
                        {
                            let newPlayerGameList = result;
                            newPlayerGameList.steamid = Number(id.steamid);

                            setUserGameData([...userGameData, newPlayerGameList])
                            setLoadingUser(false);
                        },
                        (error) =>
                        {
                            setLoadingUser(false);
                            setError("Failed to find user")
                        }
                    )

            })

        }
    }, [userData]);

    /** Compares two arrays of objects, looks for the steamid key of both 
     * For each userData object, we look for a userGameData object, if we don't find it, the id is returned in the array
     **/
    function findNewSteamIds(arr1: apiPlayerIdSingle[], arr2: apiGamesListResponse[]): apiPlayerIdSingle[]
    {
        let filteredArr = [];
        for (let i = 0; i < arr1.length; i++)
        {
            let steamid = arr1[i].steamid;

            if (arr2.findIndex((obj) => obj.steamid === steamid) === -1)
            {
                filteredArr.push(arr1[i])
            }
        }
        return filteredArr;
    }

    /**Finds player based on the search state */
    async function fetchPlayer()
    {
        setLoadingUser(true);
        console.log("FETCHPLAYER RUN")
        fetch(`/api/playerid/${search}`)
            .then(res => res.json())
            .then(
                (result: apiPlayerIdSingle) =>
                {
                    setUserData([...userData, result])
                    setLoadingUser(false);
                },
                (error) =>
                {
                    setLoadingUser(false);
                    setError("Failed to find user")
                }
            )
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-300 w-screen">

            <div className="flex justify-between items-center px-10 h-16 bg-sky-950">
                <h1>Logo</h1>
                <div className="w-1/4">
                    <SearchBar
                        value={search}
                        onChange={(text: string) => setSearch(text)}
                        onEnter={fetchPlayer}
                    />
                </div>
            </div>

            <main className="flex border-2 border-pink-400 min-h-[calc(100vh-4rem)]">
                <div id="maincontent" className="pr-16 w-full">

                    <p>Search state = {search}</p>

                    <div className="h-auto w-auto overflow-clip">
                        <div className="border-2 border-blue-500">

                            <p className="text-xl">UserData state</p>

                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(userData)}
                            </div>
                        </div>


                        <div className="border-2 border-orange-600">
                            <p className="text-xl">UserGameData state</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(userGameData)}
                            </div>
                        </div>

                        <div className="border-2 border-yellow-600">
                            <p style={{ color: "red" }}>Errors: {error}</p>
                            <div style={{ backgroundColor: loadingUser ? "orange" : "lime" }} className="h-8 w-8"></div>
                        </div>

                        <div className="grid-cols-3 border-2 border-purple-400">
                        </div>


                    </div>
                </div>

                <div id="avatararea" className="border-2 border-teal-400 absolute right-0 flex-col flex items-end gap-2">
                    {userData.map((id)=> {
                        return (
                        <Avatar 
                            data={id}
                            enabled={true}
                            onClose={()=>{console.log("onClose triggered")}}
                        />
                        )
                    })}



                    
                </div>

            </main>
                                    {/* 
                Sample Player IDs
                76561197968130805 
                76561197964454963
                76561197967241237
            */}
        </div>

        
    )
}