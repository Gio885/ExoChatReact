const hostName = window.location.hostname;

//FINDALLVIDEOCHAT
export function findAllVideoChat(utente, setListaVideoChat){
    return axios.post(FIND_ALL_VIDEO_CHAT(hostNamet), utente).then((response) => {
        setListaVideoChat(response.data)
    }).catch(error => {
        console.error('Errore durante il login:', error);               
      });
}