import { createSlice } from '@reduxjs/toolkit';

export const forgetPassword = createSlice({
    name: 'forgetPassword',
    initialState: {
        hash: null,
        otp: null,
        email: null,
    },
    reducers: {
        setForgetPassword: (state, action) => {
            state.hash = action.payload.hash;
            state.otp = action.payload.otp;
        },
        setForgetEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { setForgetPassword, setForgetEmail } = forgetPassword.actions;
export default forgetPassword.reducer;
