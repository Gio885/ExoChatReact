import axios from "axios";
import { LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export function findAllMessageForUtenteForChat(utente, setListaMessaggiPerChat){
    return axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente).then((response)=> {
        setListaMessaggiPerChat(response.data)
        console.log(response.data)
    }).catch(error => {
        console.error('Errore:', error);
               
      });
}


//SENDMESSAGE
export function sendMessage(messaggio){
    console.log(messaggio)
    return axios.post(SEND_MESSAGE(hostName), messaggio).then((response) => {
        console.log(response.data)
    }).catch(error => {
        console.error('Errore:', error);
               
      });
}