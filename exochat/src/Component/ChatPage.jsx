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
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch()


  useEffect(() => {

    if (utente.idUtente && chat.idChat) {
      findAllMessageForChat(chat, setListaMessaggiDellaChat);
      //console.log(listaMessaggiDellaChat)
      // console.log(chat)
      // console.log('primo useEffect')
    }
  });

  useEffect(() => {
    if (listaMessaggiDellaChat && Object.keys(listaMessaggiDellaChat).length > 0) {
      const messaggio = listaMessaggiDellaChat[listaMessaggiDellaChat.length - 1];

      if (messaggio && !messaggio.gruppo && ((messaggio.destinatario.username !== utente.username) || (messaggio.mittente.username !== utente.username))) {
        setDestinatario(
          messaggio.destinatario.username !== utente.username
            ? messaggio.destinatario
            : messaggio.mittente
        );
      } else if (messaggio.gruppo) {
        setDestinatario(messaggio.gruppo.username)
      }
    }

  });

  function inviaMessaggio(contenuto) {

    if (contenuto && contenuto !== '' && contenuto !== undefined) {
      let tipo = (chat.destinatario.amministratoreGruppo ? 2 : 1)
      dispatch(setTipoChatId(tipo))
      if(!chat.idChat){
        insertChat(chat, dispatch, setChat, chat.destinatario)
      }
      ;
      const chatPerBack = {
        idChat: chat.idChat,
        tipoChatId: chat.tipoChatId
      }
      if (chat.destinatario.amministratoreGruppo) {
        console.log('dentro primo if')
        
        const gruppoDaInviare = {
          amministratore : chat.destinatario.amministratoreGrupppo,
          nomeGruppo : chat.destinatario.username,
          infoGruppo: chat.destinatario.info,
          idGruppo : chat.destinatario.idUtente,
          foto : chat.destinatario.fotoConvertita
        }
        const messaggio = {
          mittente: utente,
          dataOra: new Date(),
          contenutoMessaggio: contenuto,
          chat: chatPerBack,
          gruppo: gruppoDaInviare
        };
        console.log(messaggio)
        sendMessage(messaggio);
        setContenutoMessaggio('');
      } else if (!chat.destinatario.amministratoreGruppo) {
        console.log('secondo if')
        const messaggio = {
          mittente: utente,
          dataOra: new Date(),
          contenutoMessaggio: contenuto,
          chat: chatPerBack,
          destinatario: chat.destinatario
        };
        console.log(messaggio)
        sendMessage(messaggio);
        setContenutoMessaggio('');

      }

    } else {
      return;
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
                    {console.log(listaMessaggiDellaChat)}
                    {console.log('primissimo')}
                    <img
                      src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.destinatario.username + 'popop'}{' '}
                      {console.log('primo')}
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

{(listaMessaggiDellaChat && chat.destinatario.amministratoreGruppo !== undefined && Object.keys(listaMessaggiDellaChat).length > 0) && (
              listaMessaggiDellaChat.map((messaggio) => (
                <div key={messaggio.idMessaggio} className='containerMessaggio'>
                  <div className='profiloContatto'>
                    {console.log(listaMessaggiDellaChat)}
                    {console.log('primissimo')}
                    <img
                      src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.destinatario.username + 'popop'}{' '}
                      {console.log('primo')}
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




            {/* {(chat.destinatario && chat.destinatario !== undefined) && (<>
              <div className='containerMessaggio'>
                <div className='profiloContatto'>
                  <img
                    src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />

                  <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                    {' '}
                    {chat.destinatario.username + 'ioioi'}{' '}
                    {console.log('secondo')}
                  </span>

                  {listaMessaggiDellaChat && chat.destinatario.ammistratoreGruppo ? <>

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
                  </> :

                    <></>}
                </div>



              </div></>)}


            {(listaMessaggiDellaChat && chat.destinatario.ammistratoreGruppo) && <>
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
                  inviaMessaggio(contenutoMessaggio);
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