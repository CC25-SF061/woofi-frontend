import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (arg, { getState }) => {
        const state = getState();
        if (!state.user.data.name) {
            const response = (await axios.get('/api/user/profile')).data;
            return response.data;
        }

        return state.user.data;
    }
);
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            name: null,
            email: null,
            id: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default userSlice.reducer;
