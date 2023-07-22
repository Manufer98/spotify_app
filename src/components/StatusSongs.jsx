import Brightness1Icon from '@mui/icons-material/Brightness1';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StatusSongs = () => {
	//const currImg=0;
	const dispatch = useDispatch();
	const status = useSelector((state) => state.top5.status); 
	//console.log(status);
  return (
	<div className='status_container'>
		{[0,1,2].map(i=>
			<div key={i}>
			{i===status ? 
				
			<Brightness1Icon style={{color:"rgba(6, 222, 57, 0.6)"}} />
			:	<Brightness1Icon style={{color:"rgba(6, 222, 57, 0.2)"}} />}	
			</div>
		)
		
		}
	</div>
  )
}

export default StatusSongs