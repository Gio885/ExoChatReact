import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAllMessageForChat } from '../service/chatService';
import { formattaData } from '../utility/Utils';
import '../custom/ChatPage.css';
import { insertChat, sendMessage } from '../service/messaggioService';
import { setChat, setTipoChatId, setDestinatario } from '../store/slice/chatSlice';

function ChatPage() {
  const [listaMessaggiDellaChat, setListaMessaggiDellaChat] = useState([]);
  const chat = useSelector((state) => state.chat);
  const utente = useSelector((state) => state.utente);
  const [contenutoMessaggio, setContenutoMessaggio] = useState('');
  const [chatAppoggio, setChatAppoggio] = useState()
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch()


  useEffect(() => {

    if (utente.idUtente && chat.idChat) {

      findAllMessageForChat(chat, setListaMessaggiDellaChat);
    } else {
      setListaMessaggiDellaChat([])
    }
    
  });

  function inviaMessaggio(contenuto) {

    if (contenuto && contenuto !== '' && contenuto !== undefined) {
      if (!chat.idChat) {
        insertChat(chat, dispatch, setChatAppoggio)
        dispatch(setChat(chatAppoggio))        
      }
      if (chatAppoggio.idChat) {
        inviaMessaggioSequenziale(contenuto, chatAppoggio)
      }

    } else {
      return;
    }

  }

  function inviaMessaggioSequenziale(contenuto, chatAppoggio) {
    if (chat.destinatario.amministratoreGruppo) {

      const gruppoDaInviare = {
        amministratore: chat.destinatario.amministratoreGrupppo,
        nomeGruppo: chat.destinatario.username,
        infoGruppo: chat.destinatario.info,
        idGruppo: chat.destinatario.idUtente,
        foto: chat.destinatario.fotoConvertita
      }
      const messaggio = {
        mittente: utente,
        dataOra: new Date(),
        contenutoMessaggio: contenuto,
        chat: chatAppoggio,
        gruppo: gruppoDaInviare
      };
      sendMessage(messaggio);
      setContenutoMessaggio('');
    } else if (!chat.destinatario.amministratoreGruppo) {

      const messaggio = {
        mittente: utente,
        dataOra: new Date(),
        contenutoMessaggio: contenuto,
        chat: chatAppoggio,
        destinatario: chat.destinatario
      };
      sendMessage(messaggio);
      setContenutoMessaggio('');

    }

  }


  return (
    <>
      {chat.destinatario && Object.keys(chat.destinatario).length > 0 ? (
        <>
          <div ref={chatContainerRef} className='containerChatPage'>
            {(listaMessaggiDellaChat && chat.destinatario.amministratoreGruppo === undefined && Object.keys(listaMessaggiDellaChat).length > 0) && (
              listaMessaggiDellaChat.map((messaggio) => (
                <div key={messaggio.idMessaggio} className='containerMessaggio'>
                  <div className='profiloContatto'>
                    <img
                      src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.destinatario.username + 'popop'}{' '}
                    </span>
                  </div>
                  <div className={messaggio.mittente.idUtente === utente.idUtente ? 'messaggio-mittente' : 'messaggio-destinatario'} >
                    <span>{messaggio.contenutoMessaggio}</span>
                    <br />
                    <span
                      style={{
                        textAlign: 'right',
                        justifyContent: 'right',
                        display: 'flex',
                        marginLeft: '60px',
                        fontSize: '12px',
                        color: 'gray',
                      }}
                    >
                      {formattaData(messaggio.dataOra)}
                    </span>
                  </div>
                </div>
              ))
            )}

            {(listaMessaggiDellaChat && chat.destinatario.amministratoreGruppo !== undefined && Object.keys(listaMessaggiDellaChat).length > 0) && (
              listaMessaggiDellaChat.map((messaggio) => (
                <div key={messaggio.idMessaggio} className='containerMessaggio'>
                  <div className='profiloContatto'>
                    <img
                      src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.destinatario.username + 'popop'}{' '}
                    </span>
                  </div>
                  <div className={messaggio.mittente.idUtente === utente.idUtente ? 'messaggio-mittente' : 'messaggio-destinatario'} >
                    <span>{messaggio.contenutoMessaggio}</span>
                    <br />
                    <span
                      style={{
                        textAlign: 'right',
                        justifyContent: 'right',
                        marginLeft: '110px',
                        fontSize: '12px',
                        color: 'gray',
                      }}
                    >
                      {formattaData(messaggio.dataOra)}
                    </span>
                  </div>
                </div>
              ))
            )}




            {(chat.destinatario && chat.destinatario !== undefined && Object.keys(listaMessaggiDellaChat).length === 0) && (<>
              <div className='containerMessaggio'>
                <div className='profiloContatto'>
                  <img
                    src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />

                  <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                    {' '}
                    {chat.destinatario.username + 'ioioi'}{' '}

                  </span>






                </div>








              </div></>)}


            {/* {(listaMessaggiDellaChat && chat.destinatario.ammistratoreGruppo) && <>
              {listaMessaggiDellaChat.map((messaggio) => (
                <div key={messaggio.idMessaggio} className='containerMessaggio'>
                  <div className='profiloContatto'>
                    <img
                      src={

                        `data:image/png;base64,${messaggio.gruppo.fotoConvertita}`

                      }
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.gruppo.username + 'hjbhbi'}{' '}
                      {console.log('terzo')}
                    </span>
                  </div>
                  <div
                    className={
                      messaggio.mittente.idUtente === utente.idUtente
                        ? 'messaggio-mittente'
                        : 'messaggio-destinatario'
                    }
                  >
                    <span>{messaggio.contenutoMessaggio}</span>
                    <br />
                    <span
                      style={{
                        textAlign: 'right',
                        justifyContent: 'right',
                        marginLeft: '110px',
                        fontSize: '12px',
                        color: 'gray',
                      }}
                    >
                      {formattaData(messaggio.dataOra)}
                    </span>
                  </div>
                </div>
              ))}
            </>} */}
            <div className='pannelloChat'>
              <input
                type='text'
                placeholder='Scrivi un messaggio'
                value={contenutoMessaggio}
                onChange={(e) => setContenutoMessaggio(e.target.value)}
              />
              <button
                style={{ backgroundColor: 'transparent', border: '0px', marginBottom: '27px' }}
                onClick={() => {
                  inviaMessaggio(contenutoMessaggio)
                }}
              >
                <i class='fa-solid fa-paper-plane fa-2x'></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
}

export default ChatPage;