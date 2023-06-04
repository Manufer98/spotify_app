import React from 'react';

import { Link, useLocation, useParams } from "react-router-dom";

import "./ArtistDetail.css";

const AlbumsCarrousel = ({artist,albums}) => {
	const {id} = useParams();
	let { state } = useLocation();
 console.log(artist,albums) 
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

export default AlbumsCarrousel