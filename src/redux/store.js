import { configureStore } from '@reduxjs/toolkit';
import top5Reducer from "./top5Sclice";
import userReducer from "./userSlice";
export default configureStore({
	reducer: {
		user: userReducer,
		top5: top5Reducer,

	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),

})