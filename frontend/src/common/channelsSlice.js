/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statement */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(

  'channels/fetchChannels',
  async () => {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
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
        createdBy: action.payload.createdBy,
      });
    },
    removeChannel(state, action) {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
    },
    renameChannel(state, action) {
      state.channels = state.channels.map((channel) => (
        channel.id === action.payload.id ? { ...channel, name: action.payload.name } : channel));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchChannels.pending, (state) => {
      state.status = 'loading channels';
      state.error = null;
    });

    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.status = 'channels loaded';
      state.channels = action.payload.map((channel) => ({ ...channel, key: channel.id }));
    });

    builder.addCase(fetchChannels.rejected, (state) => {
      state.status = 'permission denied';
    });
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
