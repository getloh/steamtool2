
//https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${playerid}
export type apiPlayerIdSingle = {
    steamid?: string,
    communityvisibilitystate?: number,
    profilestate?: number,
    personaname?: string,
    commentpermission?: number,
    profileurl?: string,
    avatar?: string,
    avatarmedium?: string,
    avatarfull?: string,
    avatarhash?: string,
    lastlogoff?: number,
    personastate?: number,
    realname?: string,
    primaryclanid?: string,
    timecreated?: number,
    personastateflags?: number,
    gameextrainfo?: string,
    gameid?: string,
    loccountrycode?: string,
    locstatecode?: string,
    loccityid?: string;
}

export type apiPlayerData = {
    response?: {
        players?: apiPlayerIdSingle[]
    }
}

export type apiGameData = {
    appid: number,
    name: string,
    playtime_forever: number,
    img_icon_url: string,
    playtime_windows_forever: number,
    playtime_mac_forever: number,
    playtime_linux_forever: number,
    rtime_last_played: number,
    content_descriptorids: number[],
    users?: string[]

}

export type apiGamesList = {
    response: apiGamesListResponse
}

export type apiGamesListResponse = {
    game_count: number,
    games: apiGameData[],
    steamid?: number;
}

export type apiVanityLookup = {
    response: {
        success: 1 | 42,
        message?: "No match",
        steamid?: string,
    }
}