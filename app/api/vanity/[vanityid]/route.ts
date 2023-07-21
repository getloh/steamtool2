import { apiPlayerData, apiVanityLookup } from '@/types/apiResponses';
import { NextResponse } from 'next/server';
import { apiPlayerIdSingle } from '@/types/apiResponses';


// This route finds the player basic information via the ID number
export async function GET(req: Request, { params }: any)
{
  //Get the playerid from the params
  const vanityid = params.vanityid;
  let data: apiVanityLookup = {response: {success: 42}};

  await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${vanityid}`).then(response =>
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
      data = jsonResponse;                                      //Set the data object to the response so we can return it
    }
    else { 
      console.log("Unable to find steam vanity ID")     //? Got a response but the array was empty, invalid ID
     }
  });

  if (data?.response.success == 1){
    const playerdata = await fetch(`../playerid/${data?.response.steamid}`)
    // .then(res => res.json())
    // .then(
    //     (result: apiPlayerIdSingle) =>
    //     {
    //         console.log(result);
    //         return result
    //     },
    //     (error) =>
    //     {
    //         console.log("VanityError = " + error)
    //     }
    // )
    return NextResponse.json(playerdata)         // Returns data if found, else 404 status code
    // console.log(data.response.steamid)
  }
  else {
    return new Response("",{
      status: 404
    })
  }
}

