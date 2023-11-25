import axios from "axios";
import { INSERT_CHAT, LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";



const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export function findChatForUtente(utente, setListaChat, listaChat) {
    return axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente).then((response) => {
        setListaChat(response.data.data)       

    }).catch(error => {
        console.error('Errore:', error);
    });
}
//INSERT CHAT
export function insertChat(chat, dispatch, setChatAppoggio) {
    return axios.post(INSERT_CHAT(hostName), chat).then((response) => {
        setChatAppoggio(response.data)
    }).catch(error => {
        console.error('Errore caricamento chat: ', error);
    })
}

//SENDMESSAGE
export  function sendMessage(messaggio) {
    console.log(messaggio)
    return  axios.post(SEND_MESSAGE(hostName), messaggio).then((response) => {
             
    }).catch(error => {
        console.error('Errore:', error);
    });
}

