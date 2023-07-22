
import React from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ReorderTop5Redux, changeStatus } from '../redux/top5Sclice';
import StatusSongs from './StatusSongs';


const OrderSongs = () => {
const currArtist = useSelector((state) => state.top5.currentArtist); 
const dispatch = useDispatch();
const top5 = useSelector((state) => state.top5.top5); 


//console.log(top5);

  return (
	<div className='order_container'>
		<StatusSongs/>
		<h3>Order your top</h3>
		<button> <Link className="link"  onClick={()=> dispatch(changeStatus(1))}  to={"/Artist/"+currArtist.id} >Back</Link> </button>
		<button onClick={()=> localStorage.clear("top5")}>      Save </button>
		
		<DragDropContext
	
		onDragEnd={(param) => {
			/* console.log(param) */
          const srcI = param.source.index;
          const desI = param.destination?.index;
		  //console.log(srcI,desI)
          if (desI) {
			dispatch(ReorderTop5Redux({desI,srcI})); 
			//top5.splice(srcI, 0, top5.splice(desI, 1)[0]);
			/* const arrayOfNumbers = [1, 2, 3, 4];
			const reOrder=[...top5]
			reOrder.splice(srcI, 0, reOrder.splice(desI, 1)[0]) */
			
			//console.log(reOrder,top5);
			
           
          }
        }}
		
		>
			<div>

		<Droppable droppableId='droppable-1'>
			 {(provided, _) => (
			<div ref={provided.innerRef}{...provided.droppableProps}>
			{top5.map((item,i)=>
			<Draggable 
			key={item.id}
			draggableId={"draggable-" + item.id}
			index={i}
			>
			  {(provided, snapshot) => (
					<div 
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={{
						...provided.draggableProps.style,
						boxShadow: snapshot.isDragging
						  ? "0 0 .4rem #666"
						  : "none",
					  }}
					 >
						
						
						
						<span {...provided.dragHandleProps}>{i+1} - {item.name}</span>
					</div>

				)}
				
			</Draggable>
			)}
			{provided.placeholder}
			</div>
		)}
	    </Droppable>
		</div>
	   </DragDropContext>
	  
	</div>
  )
}

export default OrderSongs