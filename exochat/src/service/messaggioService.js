import axios from "axios";
import { INSERT_CHAT, LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";



const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export async function findChatForUtente(utente, setListaChat) {

    try {
        const response = await axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente);
        setListaChat(response.data.data);
    } catch (error) {
        console.error('Errore:', error);
    }

}
//INSERT CHAT
export async function insertChatAndSendMessage(chat, setChat, dispatch, inviaMessaggioSequenziale, contenuto, setAggiornamento, aggiornamento, setContenutoMessaggio) {

    try {
        const response = await axios.post(INSERT_CHAT(hostName), chat);
        dispatch(setChat(response.data));
        inviaMessaggioSequenziale(contenuto, chat, response.data, setAggiornamento, aggiornamento, setContenutoMessaggio);
    } catch (error) {
        console.error('Errore caricamento chat: ', error);
    }


}

//SENDMESSAGE
export async function sendMessage(messaggio) {
    try {
        const response = await axios.post(SEND_MESSAGE(hostName), messaggio);
    } catch (error) {
        console.error('Errore:', error);
    }
}

