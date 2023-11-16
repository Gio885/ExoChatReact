
//LOGINUTENTE
export const LOGIN_UTENTE = (hostName) => 'http://'+ hostName + ':8080/ExoChatWeb/rest/utenteRest/loginUtente';
//REGISTERUTENTE
export const REGISTER_UTENTE = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/utenteRest/insertUtente';
//LISTACHATFORUTENTE
export const  LISTA_CHAT_UTENTE_ID = (hostName) =>  'http://' + hostName + ':8080/ExoChatWeb/rest/chatRest/listaChatUtente';