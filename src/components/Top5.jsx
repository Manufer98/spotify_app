import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Top5.css";
const Home = () => {
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [token, setToken] = useState('');
	const [albums, setAlbums] = useState([]);
	const [songs, setSongs] = useState([]);
	const [artists, setArtists] = useState([]);
	const [search, setSearch] = useState('');
	const [searchArtist, setSearchArtist] = useState('');
	const[artistID,setArtistID]=useState('');
	const userEmail = useSelector((state) => state.user.email); 
	const top5 = useSelector((state) => state.top5.top5); 
	//const top5 = ["holi", 'chau'];
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
	  
  
	  const searchParameters = {
		method: 'GET',
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": "Bearer " + token,
		}
	  }
	  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + search + "&type=artist" +"&limit=5", searchParameters)
		.then(res => res.json())
		.then(data => {
			console.log(data); 
			setArtistID(data.artists.items[0].id); 
			return data.artists.items[0].id; })
  
		
	   const albumss = await fetch('https://api.spotify.com/v1/artists/' + artistID + "/albums" + '?include_groups=album&market=US&limit=50', searchParameters)
		.then(res => res.json())
		.then(data => {
		  setAlbums(data.items.map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url  })))
		}); 
  
  
	}
	
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
  
  const serchArtist = async ()=>{
	
	const searchParameters = {
		method: 'GET',
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": "Bearer " + token,
		}
	  }
	  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchArtist + "&type=artist"+"&limit=10", searchParameters)
		.then(res => res.json())
		.then(data => {
			 setArtists(data.artists.items.filter((artist)=>artist.images.length>0).map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url , genres:artist.genres,followers:artist.followers.total })));
			
			})
  
	  
  

	
	
  }
  
  
  
  
  

	return (
	  <div>
		
		<div className='container'>
		{/* <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
		<button onClick={serch}>search</button> */}
		<input placeholder='choose your artist to make your top 5' type="text" value={searchArtist} onChange={e => setSearchArtist(e.target.value)} />
		<button onClick={serchArtist}>Artistas</button>
		
		{/* <button onClick={songi}>songs</button> */}
		
		</div>
		{userEmail}
		{top5.map(i=>
			<div className="asd" key={i.id}>{i.name}</div>
	   )}
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
		
		<div className="albums">
		  {
			artists.map((artist) =>
  
			  <div key={artist.id} >
				<div className='pepe'>
				<h3 >{artist.name}</h3>
				<img  src={artist.url} alt="" width={400} height={400} />
				<button /* onClick={()=>console.log(artist)} */><Link className="link" to={"/Artist/"+artist.id} state={{artist}}>Discografia</Link></button>
				</div>	
				
			  </div>
  
  
			)}
		</div>
  
	  </div>
	);
  }
export default Home