import { createSlice } from '@reduxjs/toolkit';

const initialChat = {
  destinatario: '',  
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChat,
  reducers: {
    setChat: (state, action) => {
      return { ...state, ...action.payload };  
    },
    setDestinatario: (state, action) => {
      return { ...state, destinatario: action.payload };  
    },
    resetChat: () => initialChat,  
  },
});

export const { 
  setChat, 
  setDestinatario, 
  resetChat } = chatSlice.actions;

export default chatSlice.reducer;
