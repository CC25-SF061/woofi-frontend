import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotificationUser = createAsyncThunk(
    'notificationUser/fetchNotificationUser',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        if (state.notificationUser.loading) {
            return state.notificationUser.data;
        }
        try {
            dispatch(setLoading(true));
            const response = await axios.get('/api/user/profile/notifications');
            return response.data.data;
        } catch (e) {
            return state.notificationUser.data;
        } finally {
            dispatch(setLoading(false));
        }
    },
);
export const markNotificationUser = createAsyncThunk(
    'notificationUser/markNotificationUser',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        if (state.notificationUser.markLoading) {
            return state.notificationUser.markLoading;
        }
        try {
            dispatch(setMarkLoading(true));
            const notRead = state.notificationUser.data
                .filter((data) => !data.is_read)
                .map((data) => data.id);
            if (notRead.length <= 0) {
                return state.notificationUser.data;
            }
            const notReadSet = new Set(notRead);
            await axios.patch('/api/user/profile/mark-notification', {
                notificationIds: notRead,
            });
            const data = [...state.notificationUser.data];
            data.forEach((obj, index) => {
                if (notReadSet.has(obj.id)) {
                    data[index] = { ...obj, is_read: true };
                }
            });
            return data;
        } catch (e) {
            return state.notificationUser.data;
        } finally {
            dispatch(setMarkLoading(false));
        }
    },
);
export const notificationUserSlice = createSlice({
    name: 'notificationUser',
    initialState: {
        data: [],
        loading: false,
        markLoading: false,
        hasNotRead: true,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMarkLoading: (state, action) => {
            state.markLoading = action.payload;
        },
        checkHasNotRead: (state, action) => {
            const found = state.data.find((data) => !data.is_read);
            if (found) {
                state.hasNotRead = true;
            } else {
                state.hasNotRead = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotificationUser.fulfilled, (state, action) => {
            state.data = action.payload;

            const found = state.data.find((data) => !data.is_read);
            if (found) {
                state.hasNotRead = true;
            } else {
                state.hasNotRead = false;
            }
        });
        builder.addCase(markNotificationUser.fulfilled, (state, action) => {
            state.data = action.payload;

            const found = state.data.find((data) => !data.is_read);
            if (found) {
                state.hasNotRead = true;
            } else {
                state.hasNotRead = false;
            }
        });
    },
});

const { setLoading, setMarkLoading, checkHasNotRead } =
    notificationUserSlice.actions;
export default notificationUserSlice.reducer;
