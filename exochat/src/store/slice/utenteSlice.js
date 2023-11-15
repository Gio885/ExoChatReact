import { createSlice } from "@reduxjs/toolkit";

const initialUser = {}

export const utenteSlice = createSlice({
    name: 'utente',
    initialState: initialUser,
    reducers: {
        setUtente: (state, action) => {
            return state = action.payload
        },        
        resetUtente: (state, action) => {
            return (state = initialUser)
        }
    }
})

export const {
    setUtente, 
    resetUtente
} = utenteSlice.actions

export default utenteSlice.reducer