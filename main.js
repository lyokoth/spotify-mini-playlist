// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCcSJ2jMQ9Jty79WP5KHqVnCXXQItz5-Ojf82ZFskjKIjkRA8P50kbNU0DAOoYMHUbjZKAlIhf5hlNbyUS8zCpWvy0il2MNWq_zCrMGqs2Izkql4OiI9NFui4iCCyKOAji8Cy_MuhrG-Rv6fYQdcGon1jG5jkemfsQxDg2wV4-KUdlf1h0smReerrS92LutGSB9epT-gI_bEe5RFTiUQKMPD8MbdTfeKhFW6ane1sMmPb_Dqyia-kxor4Sv_-Qe_bTpzyItvgHiWe2pq-Wes9WvscZj6Vo6KLzAqoKTf7sXo4Z_0myLMizws_fKCHXTBR-pSLzRogaAQE2uLf4j1HSkCUBf_APAhKeg4TLnari0F1k';
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

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);