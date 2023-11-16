import axios from "axios";
import { LOGIN_UTENTE, REGISTER_UTENTE } from "../utility/EndPoint";
import { LISTA_CHAT_UTENTE } from "../utility/Route";

const hostName = window.location.hostname;

//LOGIN
export function loginUtente(utente, dispatch, setUtente, history){
    return axios.post(LOGIN_UTENTE(hostName), utente).then((response)=> {
        dispatch(setUtente(response.data))
        history.push(LISTA_CHAT_UTENTE)
        console.log(response.data)
        console.log(hostName)
    }).catch(error => {
        console.error('Errore durante il login:', error);
               
      });
}
//REGISTER
export function registerUtente(utente){
    return axios.post(REGISTER_UTENTE, utente).then((response)=> {
        console.log(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error);
               
      });
}