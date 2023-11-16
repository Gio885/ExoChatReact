import axios from "axios";
import { LISTA_CHAT_UTENTE_ID } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTACHATUTENTE
export function findAllChatForUtente(utente, setListaChat){
    return axios.post(LISTA_CHAT_UTENTE_ID(hostName), utente).then((response)=> {
        setListaChat(response.data)
        console.log(response)
    }).catch(error => {
        console.error('Errore durante il login:', error);
               
      });
}