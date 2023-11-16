import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

type LoginSuccess = null | {
	success: boolean;
	jwt: string;
};
type LoginError = null | {
	message: string;
	path: string[];
};
type LoginResponse = [LoginSuccess, LoginError];

type Credentials = {
	email: string;
	password: string;
};

export const loginUser = createAsyncThunk(
	'login',
	async (credentials: Credentials, thunkAPI) => {
		try {
			const response = await axios.post(`${baseUrl}/login`, credentials);

			return response.data as LoginResponse;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error?.response?.data) {
				return thunkAPI.rejectWithValue(
					error?.response.data
				) as unknown as LoginResponse;
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);
