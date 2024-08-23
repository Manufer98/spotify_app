/* eslint-disable prettier/prettier */
import { createSlice, current } from "@reduxjs/toolkit";

const AddTop5Action = ({ top5 }, payload) => {
	if (top5.length < 5) {
		top5.push(payload);
		localStorage.setItem("top5", JSON.stringify(top5));
	}
};

const MinusTop5Action = ({ top5 }, payload) => {
	const index = top5.findIndex(i => i.id === payload.id);

	if (index !== -1) {
		top5.splice(index, 1);
		localStorage.setItem("top5", JSON.stringify(top5));

	}

};

const clearTop5Action = ({ top5 }) => {
	while (top5.length > 0) {
		top5.pop();
	}
	localStorage.removeItem("top5");
};

const ReorderTop5Action = ({ top5 }, { desI, srcI }) => {


	top5.splice(desI, 0, top5.splice(srcI, 1)[0]);
	localStorage.setItem("top5", JSON.stringify(top5));




};

const AddTop5sAction = ({ top5, top5s }, { id, url, name }) => {

	const exists = top5s.some((top5) => top5.id === id);

	if (!exists) {

		const artist = {
			id,
			url,
			name,
			top5: current(top5),

		}
		top5s.push(artist);
		localStorage.setItem("top5s", JSON.stringify(top5s));
		console.log(current(top5s));
	}


};

const CurrArtistAction = (state, { currArtist }) => {

	//console.log('holi', currArtist)
	state.currentArtist = currArtist;
	console.log(state.currentArtist, currArtist)

	localStorage.setItem("currentArtist", JSON.stringify(currArtist));

}

const DeleteTop5Action = (state, payload) => {
	const id = payload;

	const a = state.top5s.filter(i => i.id !== id);
	localStorage.setItem("top5s", JSON.stringify(a));
	state.top5s = a;
	console.log(payload, a)


}



export const top5Slice = createSlice({
	name: "top5",
	initialState: {
		top5: JSON.parse(localStorage.getItem("top5")) ?? [],
		currentArtist: JSON.parse(localStorage.getItem("currentArtist")) ?? {},
		status: 0,
		top5s: JSON.parse(localStorage.getItem("top5s")) ?? [],
	},
	reducers: {
		AddTop5Redux: (state, action) => {
			AddTop5Action(state, action.payload);
		},
		MinusTop5Redux: (state, action) => {
			MinusTop5Action(state, action.payload);
		},
		ReorderTop5Redux: (state, action) => {
			ReorderTop5Action(state, action.payload);
		},
		currArtistRedux: (state, action) => {
			CurrArtistAction(state, action.payload);
		},
		changeStatus: (state, action) => {
			state.status = action.payload;
		},
		clearTop5Redux: (state, action) => {
			clearTop5Action(state, action.payload);
		},
		AddTop5sRedux: (state, action) => {
			AddTop5sAction(state, action.payload);
		},
		DeleteTop5Redux: (state, action) => {
			DeleteTop5Action(state, action.payload);
		},
	},
});

export const {
	AddTop5Redux,
	ReorderTop5Redux,
	changeStatus,
	clearTop5Redux,
	AddTop5sRedux,
	MinusTop5Redux,
	currArtistRedux,
	DeleteTop5Redux
} = top5Slice.actions;

export default top5Slice.reducer;
