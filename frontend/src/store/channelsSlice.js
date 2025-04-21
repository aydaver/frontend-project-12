import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
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
            console.log(state);
            console.log(action);
            
            state.channels.push({
                id: uniqueId(),
                name: action.payload.name,
                isActive: false,
            });
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchChannels.pending, (state) => {
            state.status = 'loading';
            state.error = null;
            console.log(state.status)
        });

        builder.addCase(fetchChannels.fulfilled, (state, action) => {
            state.status = 'permission accepted';
            state.channels = action.payload.map((channel) => ({...channel, key: uniqueId()}));
            console.log(state.status);
        });

        builder.addCase(fetchChannels.rejected, (state) => {
            state.status = 'permission denied';
            console.log(state.status);
        });
    }
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
