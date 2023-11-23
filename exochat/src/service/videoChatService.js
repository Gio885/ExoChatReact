import { FIND_ALL_VIDEO_CHAT } from "../utility/EndPoint";

const hostName = window.location.hostname;

//FINDALLVIDEOCHAT
export function findAllVideoChat(utente, setListaVideoChat){
    return axios.post(FIND_ALL_VIDEO_CHAT(hostName), utente).then((response) => {
        setListaVideoChat(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error);               
      });
}