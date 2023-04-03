"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useState, useRef, useEffect } from 'react'
import SearchBar from '@/components/SearchBar';
import { apiGamesListResponse, apiPlayerIdSingle } from '@/types/apiResponses';

const inter = Inter({ subsets: ['latin'] })

export default function UsersMain()
{

    const [userIds, setUserIds] = useState([]);
    const [userData, setUserData] = useState<apiPlayerIdSingle[]>([]);
    const [userGameData, setUserGameData] = useState<apiGamesListResponse[]>([])
    const [search, setSearch] = useState("");
    const [loadingUser, setLoadingUser] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (userData.length == 0){
            console.log("no user data yet, skipping..")
        }
        else {
            const idsToFetch = findNewSteamIds(userData, userGameData)

            idsToFetch.map(id => {

                console.log("game fetch goes here")             //usergamedata .filter (!playerids from first array)
                fetch(`/api/gamelist/${id.steamid}`)
                .then(res => res.json())
                .then(
                    (result: apiGamesListResponse) =>
                    {
                        let newPlayerGameList = result;
                        newPlayerGameList.steamid = id.steamid;
    
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

    function findNewSteamIds(arr1: {steamid: number}[], arr2: {steamid:number}[])
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
    

    async function fetchPlayer()
    {
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
        <div className="h-screen bg-neutral-900 text-neutral-300 w-screen">

            <div className="flex justify-between items-center px-10 py-5 bg-sky-950">
                <h1>Logo</h1>
                <div className="w-1/4">
                    <SearchBar
                        value={search}
                        onChange={(text: string) => setSearch(text)}
                    />
                </div>
            </div>
            <div className="h-auto w-auto overflow-clip">

            <div className="h-40 w-100 overflow-scroll">
                    {JSON.stringify(userData)}
                </div>
                <SearchBar
                    value={search}
                    onChange={(text: string) => setSearch(text)}
                />
                <p>Search state = {search}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={fetchPlayer}>
                    Search
                </button>

                <p style={{ color: "red" }}>Errors: {error}</p>

                <div style={{ backgroundColor: loadingUser ? "orange" : "lime" }} className="h-4 w-4"></div>
                
                <div className="grid-cols-3">

                <div className="h-40 w-100 overflow-scroll">
                    {JSON.stringify(userGameData)}
                </div>

                </div>
                {/* 76561197968130805 
                76561197964454963
                76561197967241237
                */}
            </div>
        </div>
    )
}