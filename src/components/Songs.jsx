import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AddTop5Redux } from '../redux/top5Sclice';

const Songs = ({artist}) => {
	const [token, setToken] = useState('');
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [searchSong, setSearchSong] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const top5 = useSelector((state) => state.top5.top5); 
	const [songs,setSongs]=useState([]);
	useEffect(() => {
		getToken();
		console.log(artist);
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
	  const handleSelected = (name) =>{
		 
		
		if(top5.some(i=>i.name===name)){
			return "songs_selected"
		}else{
			return "songs";
		}

		
	  }

	const serchArtist = async ()=>{
	
		const searchParameters = {
			method: 'GET',
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": "Bearer " + token,
			}
		  }
		  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchSong + "&type=track"+"&limit=5", searchParameters)
			.then(res => res.json())
			.then(data => {
				const array=data.tracks.items.filter((song)=>song.artists[0].id===artist.id).map((song)=>({id:song.id,name:song.name}));
				const ids = array.map(({ name }) => name);
				const filtered = array.filter(({ name }, index) => !ids.includes(name, index + 1));
				console.log(array)
				setSongs(filtered)

				//setSongs(data.tracks.items.filter((song)=>song.artists[0].id===artist.id).map((song)=>({id:song.id,name:song.name})));
				//setArtists(data.artists.items.filter((artist)=>artist.images.length>0).map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url , genres:artist.genres,followers:artist.followers.total })));
				
			})
	  
		  
	  

	  }
	  const handleTop5 = (song)=>{

		const songi={
			id:song.id,
			name:song.name
		}

		dispatch(AddTop5Redux(songi));
        //navigate('/');
	  }
  return (

	<div className='songs_container'>
		<input placeholder='choose your song' type="text" value={searchSong} onChange={e => setSearchSong(e.target.value)} />
		<button onClick={()=>serchArtist()}>search</button>
		<div className="songs_map">
		{songs.map(song=>
		
		<div className={handleSelected(song.name)} key={song.id}>
			{song.name}
		<button onClick={()=> handleTop5(song)}>+</button></div>)}
		
		</div>

	</div>
  )
}

export default Songs