import React from 'react';

import { Link, useParams } from "react-router-dom";

import "./ArtistDetail.css";

const AlbumsCarrousel = ({artist,albums}) => {
	const {id} = useParams();
	
 	console.log(albums[0]);

	 const carrouselLeft= () =>{
		
	
	  }
	
	  const carrouselRight= () =>{
		
		
		
	
	  }
	   
	return (
		<div className='coni'>
		
		
		 artist  <h2>{artist.name && artist.name}</h2>
		<h4>Genres</h4>
		{artist.genres && artist.genres.map((genre,id)=><p key={id}>{genre}</p>)} 
		 <h5>Followers {artist.followers && artist.followers}</h5>  

	<div className="con">

	<div className='album_subcontainer'>
		{/* {albums[0].name && <h3 >{albums[0].name}</h3>} */}
		{/* <div className="top5_carrousel">
			 <div className='album_carrouselInner' 
			style={{backgroundImage:`url(${albums[0].url})`}}>
				<div className="left" onClick={carrouselLeft}>
					<ArrowBackIosIcon onClick={carrouselLeft}
					/>
				</div>
				<div className="center"></div>
				<div className="right" onClick={carrouselRight}>
				<ArrowForwardIosIcon onClick={carrouselRight}/>
				
				</div>
				
				
				 </div> 
				
				

		</div> */}
		</div>
	
		  {
			albums.map((album) =>
  
			  <div key={album.id} >
				<div className='pepe'>
				<h3 >{album.name}</h3>
				<img src={album.url} alt="" width={400} height={400} />
				<button ><Link className="link" to={"/AlbumDetail/"+id+'-'+album.id} state={{artist}}>Ver Detalle</Link></button>
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

export default AlbumsCarrousel