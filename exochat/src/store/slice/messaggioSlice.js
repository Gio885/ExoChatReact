import { createSlice } from '@reduxjs/toolkit'

const initialMessage = {
    data: ''
}

 export const messaggioSlice = createSlice({
  name: 'messaggio',
  initialState : initialMessage,
  reducers: {
    setMessaggio: (state, action) => {
        return state = action.payload;
    },

    resetMessaggio: (state, action) => {
        return (state = initialMessage);
    }
  }
});

export const {
    setMessaggio,
    resetMessaggio
} = messaggioSlice.actions

export default messaggioSlice.reducer