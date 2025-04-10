import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotificationAdmin = createAsyncThunk(
    'notificationAdmin/fetchNotificationAdmin',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        if (state.notificationAdmin.loading) {
            return state.notificationAdmin.data;
        }
        try {
            dispatch(setLoading(true));
            const response = await axios.get('/api/admin/notifications');
            return response.data.data;
        } catch (e) {
            return state.notificationAdmin.data;
        } finally {
            dispatch(setLoading(false));
        }
    },
);
export const markNotificationAdmin = createAsyncThunk(
    'notificationAdmin/markNotificationAdmin',
    async (arg, { getState, dispatch }) => {
        const state = getState();
        if (state.notificationAdmin.markLoading) {
            return state.notificationAdmin.markLoading;
        }
        try {
            dispatch(setMarkLoading(true));
            const notRead = state.notificationAdmin.data
                .filter((data) => !data.is_read)
                .map((data) => data.id);
            if (notRead.length <= 0) {
                return state.notificationAdmin.data;
            }
            const notReadSet = new Set(notRead);
            await axios.post('/api/admin/mark-notifications', {
                notificationIds: notRead,
            });
            const data = [...state.notificationAdmin.data];
            data.forEach((obj, index) => {
                if (notReadSet.has(obj.id)) {
                    data[index] = { ...obj, is_read: true };
                }
            });
            return data;
        } catch (e) {
            return state.notificationAdmin.data;
        } finally {
            dispatch(setMarkLoading(false));
        }
    },
);
export const notificationAdminSlice = createSlice({
    name: 'notificationAdmin',
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
        builder.addCase(fetchNotificationAdmin.fulfilled, (state, action) => {
            state.data = action.payload;

            const found = state.data.find((data) => !data.is_read);
            if (found) {
                state.hasNotRead = true;
            } else {
                state.hasNotRead = false;
            }
        });
        builder.addCase(markNotificationAdmin.fulfilled, (state, action) => {
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
    notificationAdminSlice.actions;
export default notificationAdminSlice.reducer;
