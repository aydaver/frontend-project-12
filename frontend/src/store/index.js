import { configureStore } from '@reduxjs/toolkit';
import getChannelsReducer from './channelsSlice';

export default configureStore({
    reducer: {
        channels: getChannelsReducer,
    }
});