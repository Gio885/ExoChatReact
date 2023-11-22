import { createSlice } from '@reduxjs/toolkit';

const initialChat = {
  destinatario: '',  // Aggiungi una chiave per destinatario nel tuo stato iniziale
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChat,
  reducers: {
    setChat: (state, action) => {
      return { ...state, ...action.payload };  // Restituisci un nuovo oggetto di stato con i nuovi valori
    },
    setDestinatario: (state, action) => {
      return { ...state, destinatario: action.payload };  // Aggiorna solo la proprietà destinatario
    },
    resetChat: () => initialChat,  // Resetta lo stato al valore iniziale
  },
});

export const { setChat, setDestinatario, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
