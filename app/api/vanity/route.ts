


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
