import axios from "axios";
import { LISTA_CHAT_UTENTE_ID, LISTA_MESSAGGI_PER_CHAT } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTACHATUTENTE
export function findAllChatForUtente(utente, setListaChat){
    return axios.post(LISTA_CHAT_UTENTE_ID(hostName), utente).then((response)=> {
        setListaChat(response.data)
    }).catch(error => {
        console.error('Errore:', error);
               
      });
}

//LISTAMESSAGGIPERCHAT
export function findAllMessageForChat(chat, setListaMessaggiDellaChat){
    return axios.post(LISTA_MESSAGGI_PER_CHAT(hostName), chat).then((response)=> {
        setListaMessaggiDellaChat(response.data)
    }).catch(error => {
        console.error('Errore:', error);
               
      });
}