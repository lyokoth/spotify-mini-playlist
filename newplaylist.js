// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQC3i-2zXagUzRtX471MJrgUOoPnavrzMlpASlHiagT8d5xbDxBi4UDeHIknnRSY1t8mB13hbT1kUfP84NO2MHexwELHlcPKxTMG_JD6hI7kYx3eKi-M-EZqEzdccPkZSbPdWT-BQo2aXuxRmE3QoxwlugN9yHcQM_fHU6HyPUKVB8EWn4Mj2J6915g5IVTmcXMSnh95EMenBUaaOoKkceH88FupUH_EBtIZnbmFyivUs9ruPVl2CxtRqXg0d7QOJ2ZN7jgdHBex2WFHb5OM0C6_opjUteByDzC4P8Oz7rLVdjl6R2PcbKwAIPeI2qiy0OEoqMFuEPhNitA9mTD_9Q9JE-AiT9eC2SOE3y7FK7oQRPw';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:5E08iMbe66Ua08hGX277YA','spotify:track:74vkbM1b31E1jTOEzczON8','spotify:track:3UMKYg0JuiVlB1C5SwloiL','spotify:track:1b0aU4bnvJAVqGa2ZlUQJk','spotify:track:5eIXf2mq7xMZ6m5b37tLKr','spotify:track:3eQEUcSoU3CCQBFa8NOq5X','spotify:track:3H3SC19V0jwFhyM7iQfKnF','spotify:track:33TZpA9LIACqcuE3fdaIGT','spotify:track:2DT2ReAYNXNoqWy65sDej1','spotify:track:28cr3cwtpkevwdeVjqKoST'
];
const user_id = '21avdtxygavnpmwvjdymer53a';

async function createPlaylist(tracksUri){
  return await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  }).then(playlist => {
    fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
    return playlist;
  })
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
