import { createSlice } from '@reduxjs/toolkit';

export const loading = createSlice({
    name: 'loading',
    initialState: {
        loading: [],
    },
    reducers: {
        showLoading: (state, action) => {
            state.loading.push(action.payload);
        },
        hideLoading: (state, action) => {
            const idx = state.loading.findIndex(
                (name) => name === action.payload
            );
            if (idx === -1) {
                return;
            }
            state.loading.splice(idx, 1);
        },
    },
});

export const { showLoading, hideLoading } = loading.actions;
export default loading.reducer;
