import { apiGamesList } from '@/types/apiResponses';
import { NextResponse } from 'next/server';


// This route finds the game list info via the ID number
export async function GET(req: Request, { params }: any)
{
  //Get the playerid from the params
  const playerid = params.playerid;
  let data:any = {};

  await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.API_KEY}&steamid=${playerid}&format=json&include_appinfo=true&include_played_free_games=true`).then(response =>
  {
    if (response.ok)
    {
      return response.json()
    }
    throw new Error('Request failed!');                         // Error logging
  }, networkError =>
  {
    console.log("The request failed - "+ networkError.message);
  }).then((jsonResponse : apiGamesList) =>
  {
    // console.log(jsonResponse)
    //@ts-ignore
    if (jsonResponse.response?.length !== 0)             //? Got a proper response
    {                    
      data = jsonResponse;                                      //Set the data object to the response so we can return it
    }
    else { 
      console.log("Got a response but the array was empty")     //? Got a response but the array was empty, invalid ID
     }
  });

  if (data?.response){
    // console.log(data.response)
    return NextResponse.json(data.response)         // Returns data if found, else 404 status code
  }
  else {
    return new Response("",{
      status: 404
    })
  }
}
