import axios from "axios";
import { LOGIN_UTENTE, REGISTER_UTENTE } from "../utility/EndPoint";


//LOGIN
export function loginUtente(utente){
    return axios.post(LOGIN_UTENTE, utente).then((response)=> {
        console.log(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error.response.data);
               
      });
}
//REGISTER
export function registerUtente(utente){
    return axios.post(REGISTER_UTENTE, utente).then((response)=> {
        console.log(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error.response.data);
               
      });
}