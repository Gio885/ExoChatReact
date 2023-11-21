import axios from "axios";
import { INSERT_CHAT, LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export function findChatForUtente(utente, setListaMessaggiPerChat) {
    return axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente).then((response) => {
        setListaMessaggiPerChat(response.data)
     
    }).catch(error => {
        console.error('Errore:', error);

    });
}


//SENDMESSAGE
export function sendMessage(messaggio) {
    console.log(messaggio)
    return axios.post(SEND_MESSAGE(hostName), messaggio).then((response) => {
        console.log(response.data)
    }).catch(error => {
        console.error('Errore:', error);

    });
}

//INSERT CHAT
export function insertChat(chat, dispatch, setChat) {
    return axios.post(INSERT_CHAT(hostName), chat).then((response) => {
        dispatch(setChat(response.data))
    }).catch(error => {
        console.error('Errore caricamento chat: ', error);
    })
}