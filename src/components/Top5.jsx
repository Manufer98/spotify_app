import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { changeStatus, currArtist } from '../redux/top5Sclice';

import StatusSongs from './StatusSongs';
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
	const [artistID,setArtistID]=useState('');
	const userEmail = useSelector((state) => state.user.email); 
	const top5 = useSelector((state) => state.top5.top5); 
	const dispatch = useDispatch();
	const [currImg, setCurrImg]=useState(0);
	
	const [currArtistt,setCurrArtistt]=useState(artists[currImg])
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
			//console.log(data); 
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
	  //console.log(albums);
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
	  const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchArtist + "&type=artist"+"&limit=5", searchParameters)
		.then(res => res.json())
		.then(data => {
			 setArtists(data.artists.items.filter((artist)=>artist.images.length>0).map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url , genres:artist.genres,followers:artist.followers.total })));
			
			})
  
	  
  

	
	
  }

  const carrouselLeft= () =>{
	if(currImg!==0){
		setCurrImg(currImg-1)
		//setCurrArtistt(artists[currImg])
	}if(currImg===0){
		setCurrImg(3)
		//setCurrArtistt(artists[currImg])
	}
	

  }

  const carrouselRight= () =>{
	if(currImg!==3){
		
	setCurrImg(currImg+1)
	//console.log(currImg)
	//setCurrArtistt(artists[currImg])
	}if(currImg===3){
		setCurrImg(0)
	//setCurrArtistt(artists[currImg])
	}
	

  }
  
  
  
  
  
  
  

	return (
	  <div>
		
		<div className='top5_container'>
		<StatusSongs/>
		<h4>Choose your Artist</h4>
		<div className="top5_sep">
		<input placeholder='choose your artist' type="text" value={searchArtist} onChange={e => setSearchArtist(e.target.value)} />
		<button onClick={serchArtist}>Search</button>
		</div>
		
		
		</div>
		{userEmail}
		{top5.map(i=>
			<div className="top5_asd" key={i.id}>{i.name}</div>
	   )}
	   { artists.length>0 ? 
	   <div className='top5_subcontainer'>
		<h3 >{artists[currImg].name}</h3>
		<div className="top5_carrousel">
			 <div className='top5_carrouselInner' 
			style={{backgroundImage:`url(${artists[currImg].url})`}}>
				<div className="left" onClick={carrouselLeft}>
					<ArrowBackIosIcon onClick={carrouselLeft}
					/>
				</div>
				<div className="center"></div>
				<div className="right" onClick={carrouselRight}>
				<ArrowForwardIosIcon onClick={carrouselRight}/>
				
				</div>
				
				
				 </div> 
				
				

		</div>

		<div className="top5_circulos">
		{[0,1,2,3].map(i=>
			<div key={i}>
			{i===currImg ? 
				
			<Brightness1Icon style={{color:"rgb(26, 23, 23, 0.6)"}} />
			:	<Brightness1Icon style={{color:"rgb(26, 23, 23, 0.2)"}} />}	
			</div>
		)
		
		}
		

		</div>
		<button className="top5_link" onClick={()=>{  dispatch(currArtist(artists[currImg]));dispatch(changeStatus(1)) }} ><Link  to={"/Artist/"+artists[currImg].id}   >Discografia</Link></button>
			
		</div>:<div>Busca el artista</div> }
		
		{/* <div className="top5_albums">
		  {
			artists.map((artist) =>
  
			  <div key={artist.id} >
				<div className='top5_pepe'>
				<h3 >{artist.name}</h3>
				<img  src={artist.url} alt="" width={400} height={400} />
				<button onClick={()=>  dispatch(currArtist(artist))} ><Link className="top5_link" to={"/Artist/"+artist.id} state={{artist}}>Discografia</Link></button>
				</div>	
				
			  </div>
  
  
			)}
		</div> */}
  
	  </div>
	);
  }
export default Home