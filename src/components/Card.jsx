

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React, { useEffect, useState } from 'react';


import "./ArtistDetail.css";
const Card = ({onClick}) => {
	const [token, setToken] = useState('');
	const ClientId = '186edb51b04148d99e7c55ed02ebc0fa';
	const ClientSecret = '24db6b43a228490f81bdada8879ec536';
	const [currAlbum,setCurrAlbum]=useState({id: '6jbtHi5R0jMXoliU2OS0lo', name: 'MOTOMAMI', url: 'https://i.scdn.co/image/ab67616d0000b2730c179967a265de0fc76382fe'});
	const [songs,setSongs]=useState([]);
	const [currAlbumPoss,setCurrAlbumPoss]=useState(0);

	useEffect(() => {
		getToken();
		

		
	  }, []);

	  useEffect(() => {
		
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
	  
	const searchSongs = async () => {
	
		const searchParameters = {
		  method: 'GET',
		  headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token,
		  }
		}
		
		 

		
		 const songs=await fetch('https://api.spotify.com/v1/albums/' + '6jbtHi5R0jMXoliU2OS0lo' + '/tracks', searchParameters);

		 const a=await songs.json();
			const  songss =await a.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: currAlbum.name, albumId: currAlbum.id } }));
		 //console.log(songss);
		 setSongs(songss);
			//setCurrAlbum(currAlbum);
		
	
	
	  } 

	  console.log(songs)


  return (
	<div className='card_container' >
		<div className="card_front">
		<div className='albums_subcontainer'>
		<div className="albums_carrousel">
			 <div className='albums_carrouselInner' 
				style={{backgroundImage:`url(${currAlbum.url})`}}>
					<div className="left" >
					<ArrowBackIosIcon
					/>
				</div>
				<div className="center"></div>
				<div className="right">
				<ArrowForwardIosIcon/>
				
				</div>
				
				
				 </div> 
				
				

			</div> 
			<div className="top5_circulos">
		{[0,1,2,3].map(i=>
			<div key={i}>
			{i===currAlbumPoss ? 
				
			<Brightness1Icon style={{color:"rgb(26, 23, 23, 0.6)"}} />
			:	<Brightness1Icon onClick={()=>handleCirculo(i)} style={{color:"rgb(26, 23, 23, 0.2)",cursor:"pointer"}} />}	
			</div>
		)
		
		}
	

		</div>
		<button onClick={onClick}>View Songs</button>
		</div>
		
		</div>
		
		<div className="card_back">
			<div className="card_back_container">
				<div className="card_back_title">
				<h5>Songs {currAlbum.name}</h5>
				</div>
			{songs && songs.map(song=><div key={song.id} className="card_songs">
					 	 <p>{song.name}</p>
					  <button onClick={()=>console.log(song)}>+</button>
					  
  
  
					</div>) }
					<div className='card_back_back'>
					<button  onClick={onClick}>Back to albums</button>
					</div>
					
			</div>
			<div>
			
			
			</div>

		</div>
		
		
		
		
	</div>
  )
}

export default Card