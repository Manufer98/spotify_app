import { createSlice } from '@reduxjs/toolkit';


const AddTop5Action = ({ top5 }, payload) => {

	top5.push(payload);
}

export const top5Slice = createSlice({
	name: "top5",
	initialState: {
		top5: []
	},
	reducers: {
		AddTop5Redux: (state, action) => {
			AddTop5Action(state, action.payload)
		}
	}
})

export const { AddTop5Redux } = top5Slice.actions;

export default top5Slice.reducer;