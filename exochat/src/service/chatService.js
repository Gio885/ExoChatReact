import axios from "axios";
import { LISTA_MESSAGGI_PER_CHAT } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTAMESSAGGIPERCHAT
export async function findAllMessageForChat(chat, setListaMessaggiDellaChat) {
    try {
        const response = await axios.post(LISTA_MESSAGGI_PER_CHAT(hostName), chat);
        setListaMessaggiDellaChat(response.data);
    } catch (error) {
        console.error('Errore:', error);
    }
}