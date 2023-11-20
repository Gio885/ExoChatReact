import { createSlice } from '@reduxjs/toolkit'

const initialChat = {}

export const chatSlice = createSlice({

  name: 'chat',
  initialState: initialChat,
  reducers: {
    setChat: (state, action) => {
        return state = action.payload;
    },
    resetChat: (state, action) => {
        return (state = initialChat);
    }
  }
});

export const {
    setChat,
    resetChat
} = chatSlice.actions

export default chatSlice.reducer