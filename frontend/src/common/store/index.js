import { configureStore } from '@reduxjs/toolkit'
import getChannelsReducer from '../channelsSlice'
import messagesReducer from '../messagesSlice'

export default configureStore({
  reducer: {
    channels: getChannelsReducer,
    messages: messagesReducer,
  },
})
