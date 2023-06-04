
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import "./ArtistDetail.css";

const ArtistDetailDiscography = () => {

	
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [albums, setAlbums] = useState([]);
	const {id} = useParams();
	const [token, setToken] = useState('');
	const [artist,setArtist]=useState([]);
	let { state } = useLocation();
	
	useEffect(() => {
		getToken();
		console.log(state.artist)
		setArtist(state.artist);
		
		
	  }, [])
	   useEffect(() => {

		serch();
		

		
	  }, [token]) 

	  /* const  getData = async ()=>{
		const searchParameters = {
			method: 'GET',
			headers: {
			  "Content-Type": "application/json",
			  "Authorization": "Bearer " + token,
			}
		  }
		  
	  
		   const albumss=await fetch('https://api.spotify.com/v1/artists/' + id , searchParameters)
		   const s=await albumss.json()
		   setArtist(s);


	  } */

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
	
	const serch = async () => {
	  
  
		const searchParameters = {
		  method: 'GET',
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token,
		  }
		}
		/* const artistID = await fetch('https://api.spotify.com/v1/search?q=' + search + "&type=artist" +"&limit=5", searchParameters)
		  .then(res => res.json())
		  .then(data => {console.log(data); setArtistID(data.artists.items[0].id); return data.artists.items[0].id; }) */
	
		  
		 const albumss = await fetch('https://api.spotify.com/v1/artists/' + id + "/albums" + '?include_groups=album&market=US&limit=50', searchParameters)
		  .then(res => res.json())
		  .then(data => {
			//console.log(data);
			setAlbums(data.items.map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url  })))
		  }); 
  
		  
	
	
		/*  albums.forEach(async album => {
		   const songs = await fetch('https://api.spotify.com/v1/albums/' + album.id + '/tracks', searchParameters)
			 .then(res => res.json())
			 .then(data => {
			   // const songss = data.items.map((song: Song) => ({ name: song.name, id: song.id }));
			   const newState = albums.map(obj => {
				 // 👇️ if id equals 2, update country property
				 album.songs = data.items.map((song: Song) => ({ name: song.name, id: song.id }));
				 // 👇️ otherwise return the object as is
				 return obj;
			   });
	 
			   setAlbums(newState);
	 
	 
	 
			 });
	 
		 }) */
	
	
	
	
	
	
	
	
	  }

	
  return (
	<div className='coni'>
		 artist  <h2>{artist.name && artist.name}</h2>
		<h4>Genres</h4>
		{artist.genres && artist.genres.map((genre,id)=><p key={id}>{genre}</p>)} 
		 <h5>Followers {artist.followers && artist.followers}</h5>  

	<div className="con">
	
		  {
			albums.map((album) =>
  
			  <div key={album.id} >
				<div className='pepe'>
				<h3 >{album.name}</h3>
				<img src={album.url} alt="" width={400} height={400} />
				<button ><Link className="link" to={"/AlbumDetail/"+id+'-'+album.id}>Ver Detalle</Link></button>
				</div>	
				<div className="">
				  {album.songs && album.songs.map((song) =>
					<div key={song.id} className="songs">
					  <p>{song.name}</p>
					  <button onClick={() => console.log(song)}>+</button>
  
  
					</div>
				  )}
				</div>
			  </div>
  
  
			)}
		</div>
		</div>
  )
}

export default ArtistDetailDiscography