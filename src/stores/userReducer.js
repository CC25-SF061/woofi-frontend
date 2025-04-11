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
        if (state.user.isFetching) {
            return { data: state.user.data, isFetched: false };
        }
        dispatch(setIsFetching(true));
        if (!state.user.id && localStorage.getItem('token')) {
            try {
                dispatch(showLoading(keyLoading));
                const response = (await axios.get('/api/user/profile')).data;

                return { data: response.data, isFetched: true };
            } catch (e) {
                return { data: state.user.data, isFetched: true };
            } finally {
                // dispatch(setIsFetched(true));

                dispatch(hideLoading(keyLoading));
                dispatch(setIsFetching(false));
            }
        }
        dispatch(setIsFetched(true));

        return { data: state.user.data, isFetched: true };
    },
);
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetched: false,
        isFetching: false,
        data: {
            profileImage: null,
            username: null,
            name: null,
            email: null,
            id: null,
            isVerified: null,
            isAdmin: null,
            isNewUser: null,
        },
    },
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setIsFetched: (state, action) => {
            state.isFetched = action.payload;
        },
        setData: (state, action) => {
            state.data = {
                username: action?.payload?.username,
                email: action?.payload?.email,
                name: action?.payload?.name,
                profileImage: action?.payload?.profileImage,
                isVerified: action?.payload?.isVerified,
                id: action?.payload?.id,
                isAdmin: action?.payload?.isAdmin,
                isNewUser: action?.payload?.isNewUser,
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
        setIsNewUser: (state, action) => {
            state.data.isNewUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.isFetched = action.payload.isFetched;
        });
    },
});

export const {
    setData,
    setIsFetched,
    setPartialData,
    setName,
    setUsername,
    setIsFetching,
    setEmail,
    setImage,
    setIsNewUser,
} = userSlice.actions;
export default userSlice.reducer;
