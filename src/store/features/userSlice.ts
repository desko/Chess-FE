import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../services/servicesUser';

type UserState = {
	token: string | null;
	loggedIn?: boolean;
	status: 'idle' | 'loading' | 'success' | 'failed';
	loginErrors: null | {
		message: string;
		path: string[];
	};
};

const initialState: UserState = {
	token: localStorage.getItem('acc_token') || null,
	status: localStorage.getItem('acc_token') ? 'success' : 'idle',
	loggedIn: !!localStorage.getItem('acc_token') || false,
	loginErrors: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('acc_token');
			state.token = null;
			state.loggedIn = false;
		},
		clearErrors: (state) => {
			state.loginErrors = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.status = 'loading';
			state.loginErrors = null;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload && action?.payload[0]?.jwt) {
				state.status = 'success';
				localStorage.setItem('acc_token', action?.payload[0].jwt);
				state.token = action.payload[0].jwt;
				state.loggedIn = true;
				state.loginErrors = null;
			}
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.status = 'failed';
			localStorage.removeItem('acc_token');
			state.token = null;
			state.loggedIn = false;
			if (Array.isArray(action.payload)) {
				state.loginErrors = action?.payload[1];
			}
		});
	},
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
