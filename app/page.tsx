"use client";

import { Inter } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import SearchBar from '@/components/SearchBar';
import { apiGameData, apiGamesListResponse, apiPlayerData, apiPlayerIdSingle } from '@/types/apiResponses';
import Avatar from '@/components/Avatar';
import GameTile from '@/components/GameTile';
import PlayerModal from '@/components/PlayerModal';
import LoadingRipple from '@/components/icons/LoadingRipple';
import AvatarMobile from '@/components/AvatarMobile';
import Logo from '@/components/Logo';
import Toast from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function UsersMain()
{
    const [userIds, setUserIds] = useState<string[]>([]);
    const [firstLoadComplete, setFirstLoadComplete] = useState<boolean>(false);
    const [hiddenUserIds, setHiddenUserIds] = useState<string[]>([]);         // Used to filter out Ids that we have already fetched
    const [userData, setUserData] = useState<apiPlayerIdSingle[]>([]);      // Holds user api data
    const [userGameData, setUserGameData] = useState<apiGamesListResponse[]>([]);        // An object with userID, and an array of games
    const [search, setSearch] = useState<string>("");   // used only for the search bar
    const [loadingUser, setLoadingUser] = useState(false);
    const [error, setError] = useState<string>("");     // TODO: Some sort of error toast?
    const [activeGameData, setActiveGameData] = useState<apiGameData[]>([]);    // A combined array of games, with additional users property on each game
    const [loadingGames, setLoadingGames] = useState<boolean>(false);
    const [userModal, setUserModal] = useState<apiPlayerIdSingle>();        // Put API data in here to show the player modal

    //!TODO: You can search for and add a user even if they already exist
    //!TODO: Some sort of clickability on gametiles?

    /**If the userData state changes,  */
    useEffect(() =>
    {
        // console.log("UserDataState changed " + userData.length)
        if (userData.length == 0)
        {
            // console.log("no user data yet, skipping..")
            return
        }
        else
        {
            // console.log("userData state useffect fired");
            const idsToFetch = findNewSteamIds(userData, userGameData);
            // console.log("I should fetch - " + JSON.stringify(idsToFetch));
            idsToFetch.map(id =>
            {
                //@ts-ignore
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
                            // console.log("Successfully recx gamedata for " + id.personaname);
                            // console.log(newPlayerGameList);

                            setUserGameData(prevData => [...prevData, newPlayerGameList]);
                            setLoadingUser(false);;
                        },
                        (error) =>
                        {
                            setLoadingUser(false);
                            setError("Failed to find gamedata for user " + id.personaname)
                            // console.log(error);
                            Toast.error("Failed to find gamedata for user " + id.personaname)
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
    async function fetchPlayer(): Promise<void>
    {
        setLoadingUser(true);
        // console.log("FETCHPLAYER RUN")
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
                    Toast.error("Failed to find user")
                }
            )
    }

    // When the userGameData changes (fetch completes), go through the list to general the combined games list
    // This includes adding the userid to each gameobject so we know who owns what
    useEffect(() =>
    {
        // console.log("userGameData state was updated! - Length is " + userGameData.length)
        if (userGameData.length == 0)
        {
            return;
        }
        setLoadingGames(true);
        // Set the activegameData state to an array of all the games, 
        // setActiveGameData(userGameData[0].games)
        generateActiveGameDataList()
        setLoadingGames(false);
        setFirstLoadComplete(true);
    }, [userGameData])

    function generateActiveGameDataList(): void
    {
        setLoadingGames(true);

        let agd = activeGameData?.slice();
        userGameData.map((userGameDataSingle) =>
        {
            const user = userGameDataSingle.steamid;
            // console.log("Trying to update the activeGameData list with " + user)

            //@ts-ignore
            if (agd.findIndex((singlegame) => singlegame.users?.includes(user)) !== -1)
            {
                // console.log("user already found! - " + user)
                return;
            }
            if (hiddenUserIds.findIndex((steamid) => steamid == user) !== -1)
            {
                // console.log("user is hidden - " + user)
                return;
            }
            userGameDataSingle.games?.map((game) =>
            {
                // console.log("Crunching the list...")
                // if (agd.findIndex)
                // console.log(game)
                let gameObj = game;
                let gameIndex = agd.findIndex((singlegame) => singlegame.appid == game.appid);
                if (gameIndex == -1)
                {
                    //@ts-ignore
                    gameObj.users = [user];
                    agd.push(gameObj)
                }
                else
                {
                    //@ts-ignore
                    agd[gameIndex].users = [...agd[gameIndex].users, user];
                }
                /** for each game
                 * if game.appid exists in the activegamedata array's list of objects
                 */

            })
        })

        setActiveGameData(agd)
        setLoadingGames(false);
    }

    function deleteUser(steamid: string): void
    {
        let newActiveGameData = activeGameData.filter(agd => false)
        let newUserGameData = userGameData.filter(ugd => ugd.steamid !== steamid);
        let newUserData = userData.filter(user => user.steamid !== steamid);
        setUserData(newUserData);
        setActiveGameData([]);
        setUserGameData([]);
    }

    function toggleHideUser(steamid: string): void
    {
        // console.log("Hide user attempted - " + steamid)
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
    }

    useEffect(() =>
    {
        generateActiveGameDataList();
    }, [hiddenUserIds])


    return (
        <div className=" bg-neutral-900 text-neutral-300 w-screen">

            <div className="flex justify-between items-center px-4 md:px-10 h-16 bg-sky-950">
                <Logo />

                <div className="w-2/3 sm:w-1/2 lg:w-1/3">

                    <SearchBar
                        loading={loadingUser}
                        value={search}
                        onChange={(text: string) => setSearch(text)}
                        onEnter={fetchPlayer}
                    />
                </div>
            </div>

            <main className="flex min-h-[calc(100vh-4rem)] flex-col">
                <div id="maincontent" className="pr-0 w-full md:pr-20 relative">

                    <div className="h-auto w-auto overflow-clip">
                        {activeGameData.length == 0 && userData.length > 0 && hiddenUserIds.length !== userData.length ?
                            //? LOADING STATE
                            <div className="flex justify-center items-center w-full pt-10 absolute">
                                <LoadingRipple />
                            </div>
                            : null
                        }
                        {firstLoadComplete && hiddenUserIds.length == userData.length ?
                            //? ALL USERS FILTERED OUT DESKTOP
                            <div className="hidden md:flex justify-center items-center p-6 text-center">
                                <p className="w">Hey, it looks like you filtered out all the users. Search for more users, or reenable the existing ones.</p>
                            </div>
                            : null
                        }
                        <div className="grid grid-cols-1 m-2 gap-2  h-[calc(100vh-12rem)] overflow-auto pr-2
                        md:grid-cols-2 xl:grid-cols-3 md:mr-0 md:h-auto md:overflow-auto md:pr-0">
                            {firstLoadComplete && hiddenUserIds.length == userData.length ?
                                //? ALL USERS FILTERED OUT MOBILE
                                <div className="md:hidden flex justify-center items-center p-6 text-center">
                                    <p className="w">Hey, it looks like you filtered out all the users. Search for more users, or reenable the existing ones.</p>
                                </div>
                                : null
                            }
                            {activeGameData
                                .sort((a, b) => a.name.localeCompare(b.name))
                                //@ts-ignore
                                .sort((a, b) => b.users.length - a.users.length)
                                .map(game =>
                                {
                                    const userArr: apiPlayerIdSingle[] = [];
                                    //@ts-ignore
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

                        {userData.length == 0 ?
                            //? TUTORIAL
                            <div className="w-full h-[80vh] absolute top-4 flex items-center justify-center">
                                <div id="innerHelp" className="w-4/5 h-full rounded-md flex justify-center items-center flex-col">
                                    <p className="text-2xl font-bold pt-6 pb-2">How to use</p>
                                    <img src={"/img/example.png"} className="rounded hidden md:block"></img>
                                    <img src={"/img/examplemob.png"} className="rounded block md:hidden"></img>
                                    <div className="pt-2 flex flex-col items-center">
                                        <p className="text-md text-center">No idea on steam accounts?</p>
                                        <div className="flex gap-4">
                                            <button className="p-2 bg-sky-800 hover:bg-sky-600 mt-2 rounded-md transition duration-300"
                                                onClick={() => { setUserData([{ "steamid": "76561197979277218", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Dillywilly", "profileurl": "https://steamcommunity.com/id/dillybert/", "avatar": "https://avatars.akamai.steamstatic.com/6d0f132d23035f2ba326bd26db856453b5c44947.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/6d0f132d23035f2ba326bd26db856453b5c44947_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/6d0f132d23035f2ba326bd26db856453b5c44947_full.jpg", "avatarhash": "6d0f132d23035f2ba326bd26db856453b5c44947", "lastlogoff": 1678467857, "personastate": 0, "realname": "Dil", "primaryclanid": "103582791429537453", "timecreated": 1132339729, "personastateflags": 0, "loccountrycode": "GB" }]) }}>
                                                Load 1 user
                                            </button>
                                            <button className="p-2 bg-yellow-800 hover:bg-yellow-600 mt-2 rounded-md transition duration-300"
                                                onClick={() => { setUserData([{ "steamid": "76561197973020184", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Emro", "profileurl": "https://steamcommunity.com/profiles/76561197973020184/", "avatar": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8.jpg", "avatarmedium": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8_medium.jpg", "avatarfull": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8_full.jpg", "avatarhash": "f0d70e593f578580b0ea13267642286b3924d7c8", "lastlogoff": 1687985643, "personastate": 0, "realname": "Matt", "primaryclanid": "103582791436953013", "timecreated": 1105297680, "personastateflags": 0, "loccountrycode": "GB" }, { "steamid": "76561198133732503", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Undead-Adz", "profileurl": "https://steamcommunity.com/profiles/76561198133732503/", "avatar": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315.jpg", "avatarmedium": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315_medium.jpg", "avatarfull": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315_full.jpg", "avatarhash": "960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315", "lastlogoff": 1687473123, "personastate": 0, "realname": "Adnan", "primaryclanid": "103582791429521408", "timecreated": 1397859647, "personastateflags": 0, "loccountrycode": "GB" }, { "steamid": "76561197998702710", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Orient", "profileurl": "https://steamcommunity.com/id/MetalOrient/", "avatar": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9_full.jpg", "avatarhash": "3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9", "lastlogoff": 1682072032, "personastate": 0, "realname": "Nah Bro", "primaryclanid": "103582791435633447", "timecreated": 1211093335, "personastateflags": 0 }]) }}>
                                                Load 3 users
                                            </button>
                                            <button className="p-2 bg-red-800 hover:bg-red-600 mt-2 rounded-md transition duration-300"
                                                onClick={() => { setUserData([{ "steamid": "76561197973020184", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Emro", "profileurl": "https://steamcommunity.com/profiles/76561197973020184/", "avatar": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8.jpg", "avatarmedium": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8_medium.jpg", "avatarfull": "https://avatars.steamstatic.com/f0d70e593f578580b0ea13267642286b3924d7c8_full.jpg", "avatarhash": "f0d70e593f578580b0ea13267642286b3924d7c8", "lastlogoff": 1687985643, "personastate": 0, "realname": "Matt", "primaryclanid": "103582791436953013", "timecreated": 1105297680, "personastateflags": 0, "loccountrycode": "GB" }, { "steamid": "76561198133732503", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Undead-Adz", "profileurl": "https://steamcommunity.com/profiles/76561198133732503/", "avatar": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315.jpg", "avatarmedium": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315_medium.jpg", "avatarfull": "https://avatars.steamstatic.com/960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315_full.jpg", "avatarhash": "960e7e5b8a3ab63ee8e0232e1e9f109f5d11e315", "lastlogoff": 1687473123, "personastate": 0, "realname": "Adnan", "primaryclanid": "103582791429521408", "timecreated": 1397859647, "personastateflags": 0, "loccountrycode": "GB" }, { "steamid": "76561197998702710", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Orient", "profileurl": "https://steamcommunity.com/id/MetalOrient/", "avatar": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9_full.jpg", "avatarhash": "3d2fd909cc3de7f1ab64094c6d47f8ece587ebc9", "lastlogoff": 1682072032, "personastate": 0, "realname": "Nah Bro", "primaryclanid": "103582791435633447", "timecreated": 1211093335, "personastateflags": 0 }, { "steamid": "76561197984872411", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Doctor Diablos", "profileurl": "https://steamcommunity.com/id/L33tfella_H/", "avatar": "https://avatars.akamai.steamstatic.com/62024040c6fa21c5b186305af9ddb760687ce77f.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/62024040c6fa21c5b186305af9ddb760687ce77f_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/62024040c6fa21c5b186305af9ddb760687ce77f_full.jpg", "avatarhash": "62024040c6fa21c5b186305af9ddb760687ce77f", "lastlogoff": 1682066212, "personastate": 0, "realname": "Henrik Ilmari Ilisson", "primaryclanid": "103582791429537453", "timecreated": 1158145852, "personastateflags": 0, "loccountrycode": "EE", "locstatecode": "01", "loccityid": 14727 }, { "steamid": "76561197968130805", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Anony1c4", "profileurl": "https://steamcommunity.com/id/anonymous1c4/", "avatar": "https://avatars.akamai.steamstatic.com/904e48abbb56d6e41085f64272d276010d2073aa.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/904e48abbb56d6e41085f64272d276010d2073aa_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/904e48abbb56d6e41085f64272d276010d2073aa_full.jpg", "avatarhash": "904e48abbb56d6e41085f64272d276010d2073aa", "lastlogoff": 1680204695, "personastate": 4, "primaryclanid": "103582791429537453", "timecreated": 1092088240, "personastateflags": 0 }, { "steamid": "76561197964454963", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Meng", "profileurl": "https://steamcommunity.com/id/Meng/", "avatar": "https://avatars.akamai.steamstatic.com/e73af38188472f27599698b15cf4eebc0a4d4be1.jpg", "avatarmedium": "https://avatars.akamai.steamstatic.com/e73af38188472f27599698b15cf4eebc0a4d4be1_medium.jpg", "avatarfull": "https://avatars.akamai.steamstatic.com/e73af38188472f27599698b15cf4eebc0a4d4be1_full.jpg", "avatarhash": "e73af38188472f27599698b15cf4eebc0a4d4be1", "lastlogoff": 1680471513, "personastate": 1, "realname": "Steven Meng", "primaryclanid": "103582791429672826", "timecreated": 1076695363, "personastateflags": 0, "loccountrycode": "GB", "locstatecode": "F2" }]) }}>
                                                Load 6 users
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>

                <div id="avatararea" className={`flex items-center gap-3 mt-2 md:hidden overflow-auto px-4 ${userData.length > 4 ? "justify-between" : " justify-center"}`}
                //This is the avatar container for SMALL DEVICES
                >
                    {userData.map((id, index) =>
                    {
                        return (
                            <AvatarMobile
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

                <div id="avatararea" className="fixed right-0 flex-col items-end gap-2 mt-2 hidden md:flex "
                //Avatar area for >MD devices
                >
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

            <PlayerModal
                visible={userModal?.steamid !== undefined}
                onClose={() => { setUserModal(undefined) }}
                data={userModal}
                games={userGameData}
            />

        </div>
    )
}