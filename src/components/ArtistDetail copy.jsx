
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { AddTop5Redux, changeStatus } from '../redux/top5Sclice';

import "./ArtistDetail.css";
import Songs from './Songs';
import StatusSongs from './StatusSongs';
const ArtistDetail = () => {

	
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [albums, setAlbums] = useState([]);
	const {id} = useParams();
	const [token, setToken] = useState('');
	const [artist,setArtist]=useState([]);
	const [view,setView]=useState('albums');
	const [currAlbum,setCurrAlbum]=useState({});
	const [currAlbumPoss, setCurrAlbumPoss]=useState(0);
	const [arrayCiruculos,setArrayCiruculos]=useState([]);
	const top5 = useSelector((state) => state.top5.top5); 
	const currArtist = useSelector((state) => state.top5.currentArtist); 
	const dispatch = useDispatch();
	useEffect(() => {
		getToken();
		
		setArtist(currArtist);
		

		return () => {
			dispatch(changeStatus(0))
		  }
	  }, []);

	  useEffect(() => {
	
		
		searchSongs();	
	  }, [currAlbumPoss]);

	   useEffect(() => {
		search();
		searchSongs();	
		
	  }, [token]);
	  
	  
	  
	  
	   
	
	  

	 
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
	
	const search = async () => {

		const searchParameters = {
		  method: 'GET',
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token,
		  }
		}
		
	
		  
		 const albumss = await fetch('https://api.spotify.com/v1/artists/' + id + "/albums" + '?include_groups=album&market=US&limit=50', searchParameters)
		  .then(res => res.json())
		  .then(data => {
			
			setAlbums(data.items.map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url  })))
			return data.items.map((artist) => ({ id: artist.id, name: artist.name, url:  artist.images[0].url  }));
		}); 
		
		setCurrAlbum(albumss[currAlbumPoss])
		const arr=[]
		for(let i=0;i<albumss.length;i++){
			arr.push(i);
		}
		setArrayCiruculos(arr);
	  }
	  
	  const carrouselLeft= () =>{
		let curr=currAlbumPoss;
		if(currAlbumPoss!==0){
			curr=curr-1;
		}if(currAlbumPoss===0){
			curr=albums.length-1;
		}
		setCurrAlbumPoss(curr)
		setCurrAlbum(albums[curr]) 
	  }
	
	  const carrouselRight= () =>{
		let curr=currAlbumPoss;
		if(currAlbumPoss!==albums.length-1){
			curr=curr+1;			
		}if(currAlbumPoss===albums.length-1){
			curr=0;
		}
		setCurrAlbumPoss(curr)
		setCurrAlbum(albums[curr]) 
	
	  }

	  const handleCirculo = (i) =>{
		setCurrAlbumPoss(i)
		setCurrAlbum(albums[i]) 

		
	  }
	   

	   const searchSongs = async () => {
	
		const searchParameters = {
		  method: 'GET',
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token,
		  }
		}
		
		 

		console.log(currAlbum.id);
		 const songs=await fetch('https://api.spotify.com/v1/albums/' + currAlbum.id + '/tracks', searchParameters);

		 const a=await songs.json();
		 currAlbum.songs =await a.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: currAlbum.name, albumId: currAlbum.id } }));
		 setCurrAlbum(currAlbum);
		
		 /*fetch('https://api.spotify.com/v1/albums/' + currAlbum.id + '/tracks', searchParameters)
		 .then((respose)=>respose.json())
		 .then((data)=>{
			currAlbum.songs =data.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: currAlbum.name, albumId: currAlbum.id } }));
			setCurrAlbum(currAlbum);

		});*/
		 
		

	
	  } 

	  
	  const handleTop5 = (song)=>{

		const songi={
			id:song.id,
			name:song.name
		}

		dispatch(AddTop5Redux(songi));
       // navigate('/Artist/'+artist.id);
	  }

	console.log(currAlbum);
  return (

	<>
	
	
	
	<div  className='coni'> 
	<div className="albums_statuscon">
	<StatusSongs/>
	</div>
	<button onClick={()=>setView('albums')}>Albums</button>
	<button onClick={()=>setView('songs')}>Songs</button>
	
	  <h3 >{currAlbum.name}</h3> 
	</div>
	{top5.map(i=>
			<div className="asd" key={i.id}>{i.name}</div>
	   )}
	{ 
	
	view === "albums" ?
		<>
		
		<div className='albums_subcontainer'>
	
		 <div className="albums_carrousel">
			 <div className='albums_carrouselInner' 
				style={{backgroundImage:`url(${currAlbum.url})`}}>
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
		{arrayCiruculos.map(i=>
			<div key={i}>
			{i===currAlbumPoss ? 
				
			<Brightness1Icon style={{color:"rgb(26, 23, 23, 0.6)"}} />
			:	<Brightness1Icon onClick={()=>handleCirculo(i)} style={{color:"rgb(26, 23, 23, 0.2)",cursor:"pointer"}} />}	
			</div>
		)
		
		}
	

		</div>
		
		<button onClick={()=>searchSongs()}>Songs</button>
		{currAlbum.songs ? currAlbum.songs.map((song) =>
					<div key={song.id} className="songs">
					  <p>{song.name}</p>
					  <button onClick={()=> handleTop5(song)}><Link className="link" to={"/Artist/"+artist.id} state={{artist}}>+</Link></button>
					  
  
  
					</div>
				  ) : <>loading</>}
				</div>
		
		
		
		
		
		
		
		
		</>
		 
		: <Songs artist={artist}/ > }
		</>
  )
}

export default ArtistDetail