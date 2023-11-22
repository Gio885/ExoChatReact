import axios from "axios";
import { LISTA_MESSAGGI_PER_CHAT } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTAMESSAGGIPERCHAT
export function findAllMessageForChat(chat, setListaMessaggiDellaChat){
    return axios.post(LISTA_MESSAGGI_PER_CHAT(hostName), chat).then((response)=> {
        setListaMessaggiDellaChat(response.data)       
    }).catch(error => {
        console.error('Errore:', error);               
      });
}