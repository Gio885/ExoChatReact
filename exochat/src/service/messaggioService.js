import axios from "axios";
import { INSERT_CHAT, LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";
import { setDestinatario } from "../store/slice/chatSlice";

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
export function sendMessage(messaggio, setAggiornamentoForzato) {
    console.log(messaggio)
    return axios.post(SEND_MESSAGE(hostName), messaggio).then((response) => {
        setAggiornamentoForzato((prev) => (!prev))
       
    }).catch(error => {
        console.error('Errore:', error);

    });
}

//INSERT CHAT
export function insertChat(chat, dispatch, setChat, contatto) {
    return axios.post(INSERT_CHAT(hostName), chat).then((response) => {
        dispatch(setChat(response.data))
        dispatch(setDestinatario(contatto))
      
    }).catch(error => {
        console.error('Errore caricamento chat: ', error);
    })
}