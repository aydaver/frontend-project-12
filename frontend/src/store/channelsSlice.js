import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(

    'channels/fetchChannels',
    async () => {
       const response = await axios.get('/api/v1/channels', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => {
        return response.data;
    })
    return response;
    },
);

const channelsSlice = createSlice({

    name: 'channels',

    initialState: {
        channels: [],
    },

    reducers: { 
        addChannel(state, action) {
            state.channels.push({
                id: action.payload.id,
                name: action.payload.name,
                removable: true,
            });
        },
        removeChannel(state, action) {
            state.channels = state.channels.filter((channel) => channel.id !== action.payload.id)
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchChannels.pending, (state) => {
            state.status = 'loading channels';
            state.error = null;
        });

        builder.addCase(fetchChannels.fulfilled, (state, action) => {
            state.status = 'channels loaded';
            state.channels = action.payload.map((channel) => ({...channel, key: channel.id}));
        });

        builder.addCase(fetchChannels.rejected, (state) => {
            state.status = 'permission denied';
        });
    }
});

export const { addChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
