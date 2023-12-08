import { createSlice } from '@reduxjs/toolkit';

const initialChat = {
  destinatario: '', 
  mittente:'', 
  tipoChatId: '',
  idChat:'',
  gruppo:''
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChat,
  reducers: {
    setChat: (state, action) => {
      return { ...state, ...action.payload };  
    },
    setMittente: (state,action)=>{
      return {...state,mittente:action.payload}
    },
    setDestinatario: (state, action) => {
      return { ...state, destinatario: action.payload };  
    },
    setTipoChatId: (state, action) => {
      return { ...state, tipoChatId: action.payload };  
    },
    setIdChat: (state,action)=>{
      return{...state,idChat:action.payload};
    },
    setGruppo: (state,action) => {
      return {...state,gruppo: action.payload}
    },
    resetChat: () => initialChat,  
  },
});

export const { 
  setChat, 
  setMittente,
  setDestinatario, 
  setTipoChatId,
  setIdChat,
  setGruppo,
  resetChat } = chatSlice.actions;

export default chatSlice.reducer;
