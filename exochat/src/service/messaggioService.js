import axios from "axios";
import { LISTA_MESSAGGI_UTENTE_ID_PER_CHAT } from "../utility/EndPoint";

const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export function findAllMessageForUtenteForChat(utente, setListaMessaggiPerChat){
    return axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente).then((response)=> {
        setListaMessaggiPerChat(response.data)
        console.log(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error);
               
      });
}