import { createSlice } from '@reduxjs/toolkit';

const initialChat = {
  destinatario: '',  
  tipoChatId: ''
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
    setTipoChatId: (state, action) => {
      return { ...state, tipoChatId: action.payload };  
    },
    resetChat: () => initialChat,  
  },
});

export const { 
  setChat, 
  setDestinatario, 
  setTipoChatId,
  resetChat } = chatSlice.actions;

export default chatSlice.reducer;
