import { createSlice } from '@reduxjs/toolkit';

export const forgetPassword = createSlice({
    name: 'forgetPassword',
    initialState: {
        hash: null,
        otp: null,
    },
    reducers: {
        setForgetPassword: (state, action) => {
            state.hash = action.payload.hash;
            state.otp = action.payload.otp;
        },
    },
});

export const { setForgetPassword } = forgetPassword.actions;
export default forgetPassword.reducer;
