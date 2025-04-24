import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(

    'messages/fetchMessages',
    async () => {
       const response = await axios.get('/api/v1/messages', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }).then((response) => {
        return response.data;
    })
    return response;
    },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
  
          builder.addCase(fetchMessages.pending, (state) => {
              state.status = 'loading messages';
              state.error = null;
              console.log(state.status)
          });
  
          builder.addCase(fetchMessages.fulfilled, (state, action) => {
              state.status = 'permission accepted for messages';
              state.messages = action.payload.map((message) => ({...message, key: message.id}));
              console.log(state.status);
          });
  
          builder.addCase(fetchMessages.rejected, (state) => {
              state.status = 'permission denied';
              console.log(state.status);
          });
      }
});

export const { addMessage, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
