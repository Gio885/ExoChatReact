
//LOGINUTENTE
export const LOGIN_UTENTE = (hostName) => 'http://'+ hostName + ':8080/ExoChatWeb/rest/utenteRest/loginUtente';
//REGISTERUTENTE
export const REGISTER_UTENTE = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/utenteRest/insertUtente';
//LISTAMESSAGGIUTENTE
export const LISTA_MESSAGGI_UTENTE_ID_PER_CHAT = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/messaggioRest/listaUltimiMessaggiPerChat'
//LISTAMESSAGGIPERCHAT
export const LISTA_MESSAGGI_PER_CHAT = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/messaggioRest/listaMessaggiPerChat'
//SENDMESSAGE
export const SEND_MESSAGE = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/messaggioRest/insertMessage'
//LISTA CONTATTI
export const LISTA_CONTATTI = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/utenteRest/findAllChatNonIniziate'
//LISTA GRUPPI
export const LISTA_GRUPPI_CHAT_NON_INIZIATA = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/gruppoRest/findAllChatGruppoNonIniziate'
//LISTACONTATTIGRUPPO
export const LISTA_CONTATTI_PER_GRUPPO = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/utenteRest/findAllUtente'
//INSERT CHAT
export const INSERT_CHAT = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/chatRest/insertChat'
//INSERTGRUPPO
export const INSERT_GROUP = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/gruppoRest/insertGruppo'
//INSERTLISTAUTENTIGRUPPO
export const INSERT_UTENTI_GRUPPO = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/gruppoUtenteRest/insertUtentiGruppo'
//FINDALLVIDEOCHAT
export const FIND_ALL_VIDEO_CHAT = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/chiamataRest/findAllChiamate'
//UPDATEUTENTE
export const UPDATE_UTENTE = (hostName) => 'http://' + hostName + ':8080/ExoChatWeb/rest/utenteRest/updateUtente'