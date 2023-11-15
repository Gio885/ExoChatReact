import { configureStore } from "@reduxjs/toolkit";
import utenteSlice from "./slice/utenteSlice";
import messaggioSlice from "./slice/messaggioSlice";


export const store = configureStore({
    reducer: {
        utente: utenteSlice,
        messaggio: messaggioSlice
        }
})