import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showLoading, hideLoading } from './loadingReducer.js';
import { nanoid } from 'nanoid';
// import store from './store.js';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        const keyLoading = nanoid();
        if (!state.user.data.id && localStorage.getItem('token')) {
            // console.log('test', localStorage.getItem('token'));
            try {
                dispatch(showLoading(keyLoading));
                const response = (await axios.get('/api/user/profile')).data;
                return response.data;
            } catch (e) {
                return state.user.data;
            } finally {
                dispatch(hideLoading(keyLoading));
            }
        }
        return state.user.data;
    },
);
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            profileImage: null,
            username: null,
            name: null,
            email: null,
            id: null,
            isVerified: null,
        },
    },
    reducers: {
        setData: (state, action) => {
            state.data = {
                username: action?.payload?.username,
                email: action?.payload?.email,
                name: action?.payload?.name,
                profileImage: action?.payload?.profileImage,
                isVerified: action?.payload?.isVerified,
                id: action?.payload?.id,
            };
        },
        setName: (state, action) => {
            state.data.name = action.payload;
        },
        setUsername: (state, action) => {
            state.data.username = action.payload;
        },
        setEmail: (state, action) => {
            state.data.email = action.payload;
        },
        setImage: (state, action) => {
            state.data.profileImage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export const {
    setData,
    setPartialData,
    setName,
    setUsername,
    setEmail,
    setImage,
} = userSlice.actions;
export default userSlice.reducer;
