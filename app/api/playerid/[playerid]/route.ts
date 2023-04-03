import { apiPlayerData } from '@/types/apiResponses';
import { NextResponse } from 'next/server';


// This route finds the player basic information via the ID number
export async function GET(req, { params }: any)
{
  //Get the playerid from the params
  const playerid = params.playerid;
  let data: apiPlayerData = {};

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

  if (data.response){
    console.log(data.response.players[0])
    return NextResponse.json(data.response.players[0])         // Returns data if found, else 404 status code
  }
  else {
    return new Response("",{
      status: 404
    })
  }
}

// export function getVanityId() {         // Grabs steamID from a vanityID
//   // const query = store.getState().ui.input;
//   // console.log(`trigger vanity fetch - query is ${query}`)
//   fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apikey}&vanityurl=${query}`).then(response => {
//       if(response.ok){                            // Response OK
//           console.log(response);
//           return response.json()
//       };
//       throw new Error('Request failed!');         // Error logging
//   }, networkError => {
//       console.log(networkError.message);
//   }).then(jsonResponse => {                       // Success
//       store.dispatch(setStatus("Returned-vanity"));
//       console.log(jsonResponse);
//       if(jsonResponse.response.success === 1){        // Changes the input state to the vanity's steamID, then calls getuserdata()
//           store.dispatch(setInput(jsonResponse.response.steamid));
//           this.getUserData();
//       }
//       else{store.dispatch(setError("SteamID or VanityURL not recognized"))}
//   });
// }

// export function getGameData(){          // Grabs gamedata array based on steamID's in state
//   let users = store.getState().api.steamId;   // Grab the steamIDs and store in 'users'
//   let gameDataArray = store.getState().api.apiGameData;
//   store.dispatch(setStatus("Fetching-gamedata"))

//   for (let i = 0; i < users.length; i++){     // Iterate over users array           
//       console.log(`Get Game Data for ${users[i]}`);
      
//       if (gameDataArray.findIndex(object => object.steamid === users[i]) === -1){
//           fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apikey}&steamid=${users[i]}&format=json&include_appinfo=true&include_played_free_games=true
//           `).then(response => {
//           if(response.ok){                            // Response OK
//               console.log(response);
//               return response.json()
//           };
//           throw new Error('Request failed!');         // Error logging
//           }, networkError => {
//               console.log(networkError.message);
//           }).then(jsonResponse => {                       //* Success
//               jsonResponse.response.steamid = users[i];
//               store.dispatch(setApiGameData(jsonResponse.response));

//               if (jsonResponse.response.game_count > 0){
//               store.dispatch(setStatus("Fetched-gamedata"))
//               store.dispatch(setError(""))
//               }
//               else {store.dispatch(setError("No data received, profile may be private"))}
//           });
//       }   // end of if statement to find if data already exists
//       else {console.log(`game data for user ${users[i]} has already been loaded`);
//       store.dispatch(setStatus("Fetched-gamedataalreadypresent"))        }
//   }   // end of for loop
  

  

// }   // End of getGameData()