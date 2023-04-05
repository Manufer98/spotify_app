import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
const Home = () => {
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [token, setToken] = useState('');
	const [albums, setAlbums] = useState([]);
	const [songs, setSongs] = useState([]);
	const [search, setSearch] = useState('');
	const[artistID,setArtistID]=useState('');

	useEffect(() => {
	  getToken();
	}, [albums])
  
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
	  //console.log(search);
  
	  const searchParameters = {
		method: 'GET',
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": "Bearer " + token,
		}
	  }
	  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + search + "&type=artist", searchParameters)
		.then(res => res.json())
		.then(data => {console.log(data); setArtistID(data.artists.items[0].id); return data.artists.items[0].id; })
  
	  const albumss = await fetch('https://api.spotify.com/v1/artists/' + artistID + "/albums" + '?include_groups=album&market=US&limit=50', searchParameters)
		.then(res => res.json())
		.then(data => {
		  setAlbums(data.items.map((album) => ({ id: album.id, name: album.name, url: album.images[0].url })))
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
	/* function removeDuplicates(originalArray:Albums, prop:string) {
	  var newArray = [];
	  var lookupObject  = {};
  
	  for(var i in originalArray) {
		 lookupObject[originalArray[i][prop]] = originalArray[i];
	  }
  
	  for(i in lookupObject) {
		  newArray.push(lookupObject[i]);
	  }
	   return newArray;
  } */
	const songi = async () => {
  
	  const searchParameters = {
		method: 'GET',
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": "Bearer " + token,
		}
	  }
  
	  albums.forEach(async album => {
		const songs = await fetch('https://api.spotify.com/v1/albums/' + album.id + '/tracks', searchParameters)
		  .then(res => res.json())
		  .then(data => {
			// const songss = data.items.map((song: Song) => ({ name: song.name, id: song.id }));
			const newState = albums.map(obj => {
			  // 👇️ if id equals 2, update country property
			  album.songs = data.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: album.name, albumId: album.id } }));
			  // 👇️ otherwise return the object as is
			  return obj;
			});
  
			setAlbums(newState);
  
  
  
		  });
  
	  })
	  console.log(albums);
	  /*  console.log(Object.values(
		 albums.filter((v: Albums, i: Number, s: Albums[]) => s.findIndex((v2: Albums) => ['name'].every((k: string) => v2[k] === v[k])) === i))); */
	}
  
  
  
  
  
  
  
	//console.log(songs.map(song => song.id));
	return (
	  <div>
		
		<div className='container'>
		<input type="text" value={search} onChange={e => setSearch(e.target.value)} />
		<button onClick={serch}>search</button>
		<button onClick={songi}>songs</button>
		<button onClick={songi}>link</button>
		</div>
		<div className="albums">
		  {
			albums.map((album) =>
  
			  <div key={album.id} >
				<div className='pepe'>
				<h3 >{album.name}</h3>
				<img onClick={songi} src={album.url} alt="" width={400} height={400} />
				<button ><Link className="link" to={"/AlbumDetail/"+artistID+'-'+album.id}>Ver Detalle</Link></button>
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
	);
  }
export default Home