import React, { useState } from 'react';
import { CSSTransition } from "react-transition-group";
import Card from './Card';

const FlippableCard = () => {

	const [showFront,setShowFront]=useState(true);

  return (
	<div className='flippable_container'>
		<CSSTransition
			in={showFront}
			timeout={300}
			classNames='flip'
		>
		<Card onClick={()=>{
			setShowFront((v)=>!v);
			

		}}/>
		</CSSTransition>
		

	</div>
  )
}

export default FlippableCard