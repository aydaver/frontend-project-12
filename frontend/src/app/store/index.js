import { configureStore } from '@reduxjs/toolkit';
import getChannelsReducer from '../../features/Chat/model/channelsSlice';
import messagesReducer from '../../features/Chat/model/messagesSlice';


export default configureStore({
    reducer: {
        channels: getChannelsReducer,
        messages: messagesReducer,
    },
});