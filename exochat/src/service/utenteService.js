import axios from "axios";
import { INSERT_GROUP, INSERT_UTENTI_GRUPPO, LISTA_CONTATTI, LISTA_CONTATTI_PER_GRUPPO, LISTA_GRUPPI_CHAT_NON_INIZIATA, LOGIN_UTENTE, REGISTER_UTENTE, UPDATE_UTENTE } from "../utility/EndPoint";
import { LISTA_CHAT_UTENTE, LOGIN_PAGE, RUBRICA } from "../utility/Route";

const hostName = window.location.hostname;

//LOGIN
export function loginUtente(utente, dispatch, setMessaggio, setUtente, history) {
  return axios.post(LOGIN_UTENTE(hostName), utente).then((response) => {
    dispatch(setUtente(response.data))
    history.push(LISTA_CHAT_UTENTE)
  }).catch(error => {
    dispatch(setMessaggio({ data: error.response.data }))
    console.log(error)
    console.error('Errore durante il login:', error);

  });
}
//REGISTER
export function registerUtente(utente, history) {
  return axios.post(REGISTER_UTENTE(hostName), utente).then((response) => {
    history.push(LOGIN_PAGE)
  }).catch(error => {
    console.error('Errore durante la registrazione:', error);

  });
}

//LISTA CONTATTI CON CUI NON SI HA UNA CHAT
export function findAllUtente(utente, setContatti) {
  return axios.post(LISTA_CONTATTI(hostName), utente).then((response) => {
    setContatti(response.data)
  }).catch(error => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  })
}
//LISTA GRUPPI CON CUI NON SI HA UNA CHAT MA IL GRUPPO E STATO CREATO
export function findAllGruppi(utente,setGruppi){
  return axios.post(LISTA_GRUPPI_CHAT_NON_INIZIATA(hostName),utente).then((response) => {
    setGruppi(response.data)
  }).catch(error =>{
    console.error('Errore nel caricamento della lista gruppi: ', error);
  })
}

//LISTA CONTATTI PER GRUPPO
export function findAllContattiPerGruppo(setUtenti) {
  return axios.get(LISTA_CONTATTI_PER_GRUPPO(hostName)).then((response) => {
    setUtenti(response.data)
  }).catch(error => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  })
}

//CREATEGRUPPO
export function createGruppo(gruppo, history, utentiSelezionati, utente) {
  return axios.post(INSERT_GROUP(hostName), gruppo).then((response) => {
    const gruppoId = response.data.idUtente;
    let utentiDaInserire = utentiSelezionati.map((utenteId) => ({
      gruppoId: gruppoId,
      utenteId: utenteId,
    }));
    console.log('prima stampa')
    console.log(utentiDaInserire)
    utentiDaInserire = [
      ...utentiDaInserire,
      { gruppoId: gruppoId, utenteId: utente.idUtente }
    ];
    return axios.post(INSERT_UTENTI_GRUPPO(hostName), utentiDaInserire)
      .then((response) => {
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
export function updateUtente(modifiche, setUtente, dispatch, history) {
  return axios.post(UPDATE_UTENTE(hostName), modifiche).then((response) => {
    dispatch(setUtente(response.data))
    history.push(LISTA_CHAT_UTENTE)
  }).catch((error) => {
    console.error('Errore nel caricamento della lista contatti: ', error);
  });

}
