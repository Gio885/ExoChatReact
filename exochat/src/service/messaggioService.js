import axios from "axios";
import { INSERT_CHAT, LISTA_MESSAGGI_UTENTE_ID_PER_CHAT, SEND_MESSAGE } from "../utility/EndPoint";



const hostName = window.location.hostname;

//LISTAMESSAGGIUTENTE
export function findChatForUtente(utente, setListaChat) {
    setTimeout(() => {
    return axios.post(LISTA_MESSAGGI_UTENTE_ID_PER_CHAT(hostName), utente).then((response) => {
        
            setListaChat(response.data.data);
            console.log(response.data) 
       
        
           
    }).catch(error => {
        console.error('Errore:', error);
    });
}, 1000);
}
//INSERT CHAT
export function insertChatAndSendMessage(chat, setChat, dispatch,  inviaMessaggioSequenziale, contenuto,setAggiornamento, aggiornamento, setContenutoMessaggio ) {
    setTimeout(()=> {
        return axios.post(INSERT_CHAT(hostName), chat).then((response) => {
            dispatch(setChat(response.data))
            inviaMessaggioSequenziale(contenuto, chat, response.data , setAggiornamento, aggiornamento, setContenutoMessaggio)
        }).catch(error => {
            console.error('Errore caricamento chat: ', error);
        })
    }, 10000)
    
}

//SENDMESSAGE
export  function sendMessage(messaggio) {
    console.log(messaggio)
    return  axios.post(SEND_MESSAGE(hostName), messaggio).then((response) => {
             
    }).catch(error => {
        console.error('Errore:', error);
    });
}

