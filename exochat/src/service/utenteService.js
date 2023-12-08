import axios from "axios";
import { INSERT_GROUP, INSERT_UTENTI_GRUPPO, LISTA_CONTATTI, LISTA_CONTATTI_PER_GRUPPO, LISTA_GRUPPI_CHAT_NON_INIZIATA, LOGIN_UTENTE, REGISTER_UTENTE, UPDATE_UTENTE } from "../utility/EndPoint";
import { LISTA_CHAT_UTENTE, LOGIN_PAGE, RUBRICA } from "../utility/Route";

const hostName = window.location.hostname;

//LOGIN
export async function loginUtente(utente, dispatch, setMessaggio, setUtente, history) {
  console.log(hostName+" ----------------------------------------------------")
  try {
    const response = await axios.post(LOGIN_UTENTE(hostName), utente);
    dispatch(setUtente(response.data));
    history.push("/webSocket");
  } catch (error) {
    console.log(hostName+" ----------------------------------------------------")
    dispatch(setMessaggio({ data: error.response.data }));
    console.log(error);
    console.error('Errore durante il login:', error);
  }
}
//REGISTER
export async function registerUtente(utente) {
  try {
    const response = await axios.post(REGISTER_UTENTE(hostName), utente);
    return response;
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
  }
}

//LISTA CONTATTI CON CUI NON SI HA UNA CHAT
export async function findAllUtente(utente, setContatti) {
  try {
    const response = await axios.post(LISTA_CONTATTI(hostName), utente);
    setContatti(response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Errore nel caricamento della lista contatti: ', error);
  }
}
//LISTA GRUPPI CON CUI NON SI HA UNA CHAT MA IL GRUPPO E STATO CREATO
export async function findAllGruppi(utente,setGruppi){
  try {
    const response = await axios.post(LISTA_GRUPPI_CHAT_NON_INIZIATA(hostName), utente);
    setGruppi(response.data);
  } catch (error) {
    console.error('Errore nel caricamento della lista gruppi: ', error);
  }
}

//LISTA CONTATTI PER GRUPPO
export async function findAllContattiPerGruppo(setUtenti) {
  try {
    const response = await axios.get(LISTA_CONTATTI_PER_GRUPPO(hostName));
    setUtenti(response.data);
  } catch (error) {
    console.error('Errore nel caricamento della lista contatti: ', error);
  }
}

//CREATEGRUPPO
export async function createGruppo(gruppo, history, utentiSelezionati, utente) {
  try {
    const response_gruppo = await axios.post(INSERT_GROUP(hostName), gruppo);
    const gruppoId = response_gruppo.data.idUtente;
    let utentiDaInserire = utentiSelezionati.map((utenteId) => ({
      gruppoId: gruppoId,
      utenteId: utenteId,
    }));
    utentiDaInserire = [
      ...utentiDaInserire,
      { gruppoId: gruppoId, utenteId: utente.idUtente }
    ];
    try {
      const response_partecipanti = await axios.post(INSERT_UTENTI_GRUPPO(hostName), utentiDaInserire);
    } catch (error_partecipanti) {
      console.error('Errore nel caricamento della lista contatti dei partecipanti: ', error_partecipanti);
    }
    history.push(RUBRICA);
  } catch (error_gruppo) {
    console.error('Errore nel caricamento della lista contatti: ', error_gruppo);
  }
}

//UPDATEUTENTE
export async function updateUtente(modifiche, setUtente, dispatch, history) {
  try {
    const response = await axios.post(UPDATE_UTENTE(hostName), modifiche);
    dispatch(setUtente(response.data));
    history.push("/webSocket");
  } catch (error) {
    console.error('Errore nel caricamento della lista contatti: ', error);
  }

}
