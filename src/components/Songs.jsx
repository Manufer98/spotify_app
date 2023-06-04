import React, { useEffect, useState } from 'react';

const Songs = () => {
	const [token, setToken] = useState('');
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [searchSong, setSearchSong] = useState('');
	const [songs,setSongs]=useState([]);
	useEffect(() => {
		getToken();
	  }, [])


	

	const getToken = async () => {
  
		const authParameters = {
		  method: 'POST',
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  body: 'grant_type=client_credentials&client_id=' + ClientId + '&client_secret=' + ClientSecret
		}
	
		fetch('https://accounts.spotify.com/api/token', authParameters)
		  .then(res => res.json())
		  .then(data => setToken(data.access_token))
	
	
	  }

	const serchArtist = async ()=>{
	
		const searchParameters = {
			method: 'GET',
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": "Bearer " + token,
			}
		  }
		  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchSong + "&type=track"+"&limit=10", searchParameters)
			.then(res => res.json())
			.then(data => {
				 console.log(data)
				 setSongs(data.tracks.items);
				//setArtists(data.artists.items.filter((artist)=>artist.images.length>0).map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url , genres:artist.genres,followers:artist.followers.total })));
				
				})
	  
		  
	  
	
		
		
	  }
  return (

	<div className='songs_container'>
		<input placeholder='choose your song' type="text" value={searchSong} onChange={e => setSearchSong(e.target.value)} />
		<button onClick={()=>serchArtist()}>search</button>
		<div className="songs_map">
		{songs.map(song=><>{song.name}</>)}
		</div>

	</div>
  )
}

export default Songs