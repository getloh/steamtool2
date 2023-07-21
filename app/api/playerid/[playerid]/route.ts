import { apiPlayerData } from '@/types/apiResponses';
import { NextResponse } from 'next/server';
import { apiVanityLookup } from '@/types/apiResponses';


// This route finds the player basic information via the ID number
export async function GET(req: Request, { params }: any)
{
  //Get the playerid from the params
  let playerid = params.playerid;
  let data: apiPlayerData = {};

  /**Search for Vanity URL if the input is not a number */
  if (isNaN(playerid)){
    await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${playerid}`).then(response =>
    {
      if (response.ok)
      {
        return response.json()
      }
      throw new Error('Request failed!');                         // Error logging
    }, networkError =>
    {
      console.log("The request failed - "+ networkError.message);
    }).then((jsonResponse : apiVanityLookup) =>
    {
      if (jsonResponse.response?.success == 1)             //? Got a proper response
      {                    
        playerid = jsonResponse.response.steamid      //Set playerid as the response from resolveVanityID
      }
      else { 
        console.log("Unable to find steam vanity ID")     //? Got a response but the array was empty, invalid ID
       }
    });
  }

  /**API call to find ID */
  await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.API_KEY}&steamids=${playerid}`).then(response =>
  {
    if (response.ok)
    {
      return response.json()
    }
    throw new Error('Request failed!');                         // Error logging
  }, networkError =>
  {
    console.log("The request failed - "+ networkError.message);
  }).then((jsonResponse : apiPlayerData) =>
  {
    if (jsonResponse.response?.players?.length !== 0)             //? Got a proper response
    {                    
      data = jsonResponse;                                      //Set the data object to the response so we can return it
    }
    else { 
      console.log("Got a response but the array was empty")     //? Got a response but the array was empty, invalid ID
     }
  });

  if (data.response && data.response.players !== undefined){
    // console.log(data.response.players[0])
    return NextResponse.json(data?.response?.players[0])         // Returns data if found, else 404 status code
  }
  else {
    return new Response("",{
      status: 404
    })
  }
}
