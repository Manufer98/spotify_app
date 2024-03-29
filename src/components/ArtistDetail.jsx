
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AddTop5Redux, changeStatus } from '../redux/top5Sclice';
import "./ArtistDetail.css";
import Songs from './Songs';
import StatusSongs from './StatusSongs';
const ArtistDetail = () => {

	const [showFront,setShowFront]=useState(true);
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
	const [selected,setSelected]=("card_songs");

	useEffect(() => {
		getToken();
		
		setArtist(currArtist);


		

		/* return () => {
			dispatch(changeStatus(0))
		} */
	  }, []);

	  useEffect(() => {
	
		const root = document.documentElement;
		root?.style.setProperty("--margin-songs",currAlbum.songs ? (currAlbum.songs.length*80)+'px' : "0px");
		//console.log(currAlbum.songs.length);
	/* 	console.log((currAlbum.songs.length*80)+'px'); */
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
		
		 

		
		 const songs=await fetch('https://api.spotify.com/v1/albums/' + currAlbum.id + '/tracks', searchParameters);

		 const a=await songs.json();
		 currAlbum.songs =await a.items.map((song) => ({ name: song.name, id: song.id, album: { albumName: currAlbum.name, albumId: currAlbum.id } }));
		 setCurrAlbum(currAlbum);
		
		 
		 
		

	
	  } 

	  const handleSelected = (name) =>{
		 
		
		if(top5.some(i=>i.name===name)){
			return "card_songs_selected"
		}else{
			return "card_songs";
		}

		console.log(name,top5)
		;
	  }

	  
	  const handleTop5 = (song)=>{
		
		const songi={
			id:song.id,
			name:song.name
		}

		dispatch(AddTop5Redux(songi));
       // navigate('/Artist/'+artist.id);
	  }

	//console.log(currAlbum);


  return (

	<>
	
	
	
	<div  className='coni'> 
	<div className="albums_statuscon">
	<StatusSongs/>
	</div>
	<button onClick={()=>setView('albums')}>Albums</button>
	<button onClick={()=>setView('songs')}>Songs</button>
	
	  
	  <button> <Link onClick={()=> top5.length===5 && dispatch(changeStatus(2))} className="link" to={top5.length===5?"/OrderSongs":''} >Next</Link> </button>
	</div>
	{/* {top5.map(i=>
			<div className="asd" key={i.id}>{i.name}</div>
	   )} */}
	{ 
	
	view === "albums" ?
		<>
		<h3 >{currAlbum.name}</h3> 
		<div className='albums_subcontainer'>
		<div className='flippable_container'>
		<CSSTransition
			in={showFront}
			timeout={300}
			classNames='flip'
		>
		{/* <Card onClick={()=>{
			setShowFront((v)=>!v);
			

		}}/> */}
		<div className='card_container' >
		<div className="card_front">
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
		<button onClick={()=>{
			
			setShowFront((v)=>!v);
			const formula=(currAlbum.songs.length*80)+'px';
			const root = document.documentElement;
			root?.style.setProperty("--margin-songs",currAlbum.songs ? formula  : "0px");
			//console.log(currAlbum.songs.length)

		}}>View Songs</button>
		</div>
		
		</div>
		
		<div className="card_back">
			<div className="card_back_container">
				<div className="card_back_title">
				<h5>Songs {currAlbum.name}</h5>
				</div>
			{currAlbum.songs && currAlbum.songs.map(song=>
			
			<div key={song.id} className={handleSelected(song.name)}>

					 	<p className='name'>{song.name}</p>
						
					  <button className='plus' onClick={()=> handleTop5(song)}>+</button>
					  <button className='minus' onClick={()=> handleTop5(song)}>-</button>
					  
  
  
					</div>) }
					<div className='card_back_back'>
					<button  onClick={()=>{
			setShowFront((v)=>!v);
			

		}}>Back to albums</button>
					</div>
					
			</div>
			<div>
			
			
			</div>

		</div>
		
		
		
		
	</div>

		</CSSTransition>
		</div>
		
	
	</div>

	
	
		{/* <div className='albums_subcontainer'>
	
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
				</div> */}
		
		
		
		
		
		
		
		
		</>
		 
		: <Songs artist={artist}/ > }
		</>
  )
}

export default ArtistDetail