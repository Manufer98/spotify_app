import { createSlice } from '@reduxjs/toolkit';


const AddTop5Action = ({ top5 }, payload) => {
	if (top5.length < 5) {
		top5.push(payload);
		localStorage.setItem("top5", JSON.stringify(top5));
	}

}

const ReorderTop5Action = ({ top5 }, { desI, srcI }) => {
	if (desI) {
		top5.splice(desI, 0, top5.splice(srcI, 1)[0]);
		localStorage.setItem("top5", JSON.stringify(top5));
	}

}

export const top5Slice = createSlice({
	name: "top5",
	initialState: {
		top5: JSON.parse(localStorage.getItem("top5")) ?? [],
		currentArtist: '',
		status: 0
	},
	reducers: {
		AddTop5Redux: (state, action) => {
			AddTop5Action(state, action.payload)
		},
		ReorderTop5Redux: (state, action) => {
			ReorderTop5Action(state, action.payload)
		},
		currArtist: (state, action) => {
			state.currentArtist = action.payload;
		},
		changeStatus: (state, action) => {
			state.status = action.payload;
		}

	}
})

export const { AddTop5Redux, ReorderTop5Redux, currArtist, changeStatus } = top5Slice.actions;

export default top5Slice.reducer;