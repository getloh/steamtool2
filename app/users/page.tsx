"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useState, useRef, useEffect } from 'react'
import SearchBar from '@/components/SearchBar';
import { apiGameData, apiGamesListResponse, apiPlayerData, apiPlayerIdSingle } from '@/types/apiResponses';
import Avatar from '@/components/Avatar';
import GameTile from '@/components/GameTile';
import Modal from '@/components/Modal';
import PlayerModal from '@/components/PlayerModal';
import LoadingRipple from '@/components/icons/LoadingRipple';

const inter = Inter({ subsets: ['latin'] })

export default function UsersMain()
{

    const [userIds, setUserIds] = useState([]);
    const [firstLoadComplete, setFirstLoadComplete] = useState(false);
    const [hiddenUserIds, setHiddenUserIds] = useState<string[]>([]);         // Used to filter out Ids that we have already fetched
    const [userData, setUserData] = useState<apiPlayerIdSingle[]>([]);      // Holds user api data
    const [userGameData, setUserGameData] = useState<apiGamesListResponse[]>([]);        // An object with userID, and an array of games
    const [search, setSearch] = useState("");   // used only for the search bar
    const [loadingUser, setLoadingUser] = useState(false);      // TODO: Some sort of loading state?
    const [error, setError] = useState("");     // TODO: Some sort of error toast?
    const [activeGameData, setActiveGameData] = useState<apiGameData[]>([]);    // A combined array of games, with additional users property on each game
    const [loadingGames, setLoadingGames] = useState(false);    // TODO: Some sort of loading state?
    const [userModal, setUserModal] = useState<apiPlayerIdSingle>();        // Put API data in here to show the player modal

    //!TODO: You can search for and add a user even if they already exist
    //!TODO: Some sort of clickability on gametiles?
    //!TODO: Responsive view for avatars

    /**If the userData state changes,  */
    useEffect(() =>
    {
        console.log("UserDataState changed " + userData.length)
        if (userData.length == 0)
        {
            console.log("no user data yet, skipping..")
            return
        }
        else
        {
            console.log("userData state useffect fired");
            const idsToFetch = findNewSteamIds(userData, userGameData);
            console.log("I should fetch - " + JSON.stringify(idsToFetch));
            idsToFetch.map(id =>
            {
                if (userGameData.findIndex((gameDataSet) => gameDataSet.steamid == id) !== -1)
                {
                    console.log("data already found, skipping fetch")
                    return
                }
                // console.log("game fetch goes here")             //usergamedata .filter (!playerids from first array)
                fetch(`/api/gamelist/${id.steamid}`)
                    .then(res => res.json())
                    .then(
                        (result: apiGamesListResponse) =>
                        {
                            let newPlayerGameList = result;
                            newPlayerGameList.steamid = id.steamid;
                            console.log("Successfully recx gamedata for " + id.personaname);
                            console.log(newPlayerGameList);
                            // let newData = [...userGameData, newPlayerGameList];
                            // console.log("userGamedata will be set to:");
                            // console.log(newData);
                            setUserGameData(prevData => [...prevData, newPlayerGameList]);
                            setLoadingUser(false);;
                        },
                        (error) =>
                        {
                            setLoadingUser(false);
                            setError("Failed to find gamedata for user " + id.personaname)
                            console.log(error);
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
        setFirstLoadComplete(true);
        console.log("FETCHPLAYER RUN")
        fetch(`/api/playerid/${search}`)
            .then(res => res.json())
            .then(
                (result: apiPlayerIdSingle) =>
                {
                    setUserData([...userData, result])
                    setLoadingUser(false);
                    setSearch("");
                },
                (error) =>
                {
                    setLoadingUser(false);
                    setError("Failed to find user")
                }
            )
    }

    // When the userGameData changes (fetch completes), go through the list to general the combined games list
    // This includes adding the userid to each gameobject so we know who owns what
    useEffect(() =>
    {
        console.log("userGameData state was updated! - Length is " + userGameData.length)
        if (userGameData.length == 0)
        {
            return;
        }
        setLoadingGames(true);
        // Set the activegameData state to an array of all the games, 
        // setActiveGameData(userGameData[0].games)
        generateActiveGameDataList()
        setLoadingGames(false);

    }, [userGameData])

    function generateActiveGameDataList()
    {
        setLoadingGames(true);

        let agd = activeGameData?.slice();
        userGameData.map((userGameDataSingle) =>
        {
            const user = userGameDataSingle.steamid;
            console.log("Trying to update the activeGameData list with " + user)
            if (agd.findIndex((singlegame) => singlegame.users?.includes(user)) !== -1)
            {
                console.log("user already found! - " + user)
                return;
            }
            if (hiddenUserIds.findIndex((steamid) => steamid == user) !== -1)
            {
                console.log("user is hidden - " + user)
                return;
            }
            userGameDataSingle.games?.map((game) =>
            {
                console.log("Crunching the list...")
                // if (agd.findIndex)
                // console.log(game)
                let gameObj = game;
                let gameIndex = agd.findIndex((singlegame) => singlegame.appid == game.appid);
                if (gameIndex == -1)
                {
                    gameObj.users = [user];
                    agd.push(gameObj)
                    // console.log(game + "pushed")
                }
                else
                {
                    agd[gameIndex].users = [...agd[gameIndex].users, user];
                }
                /** for each game
                 * if game.appid exists in the activegamedata array's list of objects
                 */

            })
        })
        // console.log(agd)

        setActiveGameData(agd)
        setLoadingGames(false);

    }

    function testButton()
    {
        setActiveGameData([]);
        setUserGameData([]);
    }

    function deleteUser(steamid: string)
    {
        let newActiveGameData = activeGameData.filter(agd => false)
        let newUserGameData = userGameData.filter(ugd => ugd.steamid !== steamid);
        let newUserData = userData.filter(user => user.steamid !== steamid);
        // setActiveGameData(newActiveGameData);
        setUserData(newUserData);
        // setUserGameData(newUserGameData);
        setActiveGameData([]);
        setUserGameData([]);
    }

    function toggleHideUser(steamid: string)
    {
        console.log("Hide user attempted - " + steamid)
        setActiveGameData([]);

        if (hiddenUserIds.findIndex((uid) => uid == steamid) !== -1)
        {
            //User is already hidden, enable the user
            let removedUserArr = hiddenUserIds.filter((id) => id !== steamid)
            setHiddenUserIds(removedUserArr)
        }
        else
        {
            // Lets hide the user
            setHiddenUserIds(oldArray => [...oldArray, steamid]);
        }
        // setActiveGameData([]);
        // generateActiveGameDataList();
    }

    useEffect(() =>
    {
        console.log("hiddenUserIds was changed")
        generateActiveGameDataList();

    }, [hiddenUserIds])

    useEffect(() =>
    {
        console.log("activeGameData state was updated! It now looks like...")
        console.log(activeGameData)
    }, [activeGameData])

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-300 w-screen">


            <div className="flex justify-between items-center px-10 h-16 bg-sky-950">
                <h1>Logo</h1>
                <div className="w-1/2 lg:w-1/3">
                    <SearchBar
                        value={search}
                        onChange={(text: string) => setSearch(text)}
                        onEnter={fetchPlayer}
                    />
                </div>
            </div>

            <main className="flex min-h-[calc(100vh-4rem)]">
                <div id="maincontent" className="pr-20 w-full">

                    {/* <p>Search state = {search}</p> */}

                    <div className="h-auto w-auto overflow-clip">

                        {/* <div id="USERDATA" className="border-2 border-blue-500">
                            <p className="text-xl">UserData state</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(userData)}
                            </div>
                        </div> */}

                        {/* <div id="USERGAMEDATA" className="border-2 border-orange-600">
                            <p className="text-xl">UserGameData state</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(userGameData)}
                            </div>
                        </div> */}

                        {/* <div id="HIDDENUSERS" className="border-2 border-orange-600">
                            <p className="text-xl">Hiddenusers state</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(hiddenUserIds)}
                            </div>
                        </div> */}

                        {/* <div id="ACTIVEGAMEDATA" className="border-2 border-red-600">
                            <p className="text-xl">ActiveGameData state</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(activeGameData)}
                            </div>
                        </div> */}

                        {/* <div className="border-2 border-red-600">
                            <p className="text-xl">UserModal</p>
                            <div className="h-40 w-100 overflow-scroll">
                                {JSON.stringify(userModal)}
                            </div>
                        </div> */}

                        {/* <div className="border-2 border-yellow-600">
                            <p style={{ color: "red" }}>Errors: {error}</p>
                            <div style={{ backgroundColor: loadingUser ? "orange" : "lime" }} className="h-8 w-8"></div>

                            <div style={{ backgroundColor: loadingGames ? "orange" : "lime" }} className="h-8 w-8"></div>

                        </div> */}

                        {/* <button onClick={testButton} className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-800 transition text-cyan-50">
                            <p>test</p>
                        </button> */}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-2 gap-2">
                            {activeGameData
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .sort((a, b) => b.users.length - a.users.length)
                                .map(game =>
                                {
                                    const userArr: apiPlayerIdSingle[] = [];
                                    game.users?.map((user) => userArr.push(userData.find(element => element.steamid == user)))

                                    return (
                                        <GameTile
                                            key={game.appid}
                                            data={game}
                                            users={(userData.length - hiddenUserIds.length) > 1 ? userArr : undefined}
                                        />
                                    )
                                })}
                        </div>
                        {activeGameData.length == 0 && firstLoadComplete && hiddenUserIds.length !== userData.length ?
                            <div className="flex justify-center items-center w-full">
                                <LoadingRipple />
                            </div>
                            : null
                        }
                        {firstLoadComplete && hiddenUserIds.length == userData.length ?
                            <div className="flex justify-center items-center w-full">
                                <p className="w">Hey, it looks like you filtered out all the users. Search for more users, or re-enable the existing ones.</p>
                            </div>
                            : null
                        }
                    </div>
                </div>

                <div id="avatararea" className="fixed right-0 flex-col flex items-end gap-2 mt-2">
                    {userData.map((id, index) =>
                    {
                        return (
                            <Avatar
                                key={id.steamid}
                                data={id}
                                enabled={!hiddenUserIds.includes(id.steamid)}
                                onOpen={() => { setUserModal(userData[index]) }}
                                onToggle={() => { toggleHideUser(id.steamid) }}
                                onDelete={() => { deleteUser(id.steamid) }}
                            />
                        )
                    })}

                </div>

            </main>
            {/* 
                Sample Player IDs
                76561197968130805 
                https://steamcommunity.com/profiles/76561198068117347/
                76561197967241237
            */}
            <PlayerModal
                visible={userModal?.steamid !== undefined}
                onClose={() => { setUserModal(undefined) }}
                data={userModal}
                games={userGameData}
            />

        </div>


    )
}