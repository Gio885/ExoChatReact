import axios from "axios";
import { INSERT_GROUP, INSERT_UTENTI_GRUPPO, LISTA_CONTATTI, LISTA_CONTATTI_PER_GRUPPO, LOGIN_UTENTE, REGISTER_UTENTE, UPDATE_UTENTE } from "../utility/EndPoint";
import { LISTA_CHAT_UTENTE, LOGIN_PAGE, RUBRICA } from "../utility/Route";

const hostName = window.location.hostname;

//LOGIN
export function loginUtente(utente, dispatch, setUtente, history) {
  return axios.post(LOGIN_UTENTE(hostName), utente).then((response) => {
    dispatch(setUtente(response.data))
    history.push(LISTA_CHAT_UTENTE)
    console.log(response.data)
  }).catch(error => {
    console.error('Errore durante il login:', error);

  });
}
//REGISTER
export function registerUtente(utente, history) {
  return axios.post(REGISTER_UTENTE(hostName), utente).then((response) => {
    history.push(LOGIN_PAGE)
    console.log(response.data)
  }).catch(error => {
    console.error('Errore durante la registrazione:', error);

  });
}

//LISTA CONTATTI
export function findAllUtente(utente, setContatti) {
  return axios.post(LISTA_CONTATTI(hostName), utente).then((response) => {
    setContatti(response.data)
    console.log(response.data)
  }).catch(error => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  })
}

//LISTA CONTATTI PER GRUPPO
export function findAllContattiPerGruppo(setUtenti) {
  return axios.get(LISTA_CONTATTI_PER_GRUPPO(hostName)).then((response) => {
    setUtenti(response.data)
    console.log(response.data)
  }).catch(error => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  })
}

//CREATEGRUPPO
export function createGruppo(gruppo, history, utentiSelezionati, utente) {
  return axios.post(INSERT_GROUP(hostName), gruppo).then((response) => {
    const gruppoId = response.data.idUtente;
    console.log(response.data)
    console.log(gruppoId)
    const utentiDaInserire = utentiSelezionati.map((utenteId) => ({
      gruppoId: gruppoId,
      utenteId: utenteId,
    }));

   
    console.log(utentiDaInserire)

    return axios.post(INSERT_UTENTI_GRUPPO(hostName), utentiDaInserire)
      .then((response) => {
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Errore nel caricamento della lista contatti: ', error);
      });
  }).then(() => {

    history.push(RUBRICA);

  }).catch((error) => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  });
}

//UPDATEUTENTE
export function updateUtente(utente, setUtente, dispatch, history) {
  return axios.post(UPDATE_UTENTE(hostName), utente).then((response) => {
    dispatch(setUtente(response.data))
    history.push(LISTA_CHAT_UTENTE)
  }).catch((error) => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  });

}
