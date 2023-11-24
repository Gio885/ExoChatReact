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
    
    if(utente.idUtente && chat.idChat){
      findAllMessageForChat(chat, setListaMessaggiDellaChat);
      // console.log(chat)
      // console.log('primo useEffect')
    } 
  });

  useEffect(() => {    
    if (listaMessaggiDellaChat && Object.keys(listaMessaggiDellaChat).length > 0) {
      const messaggio = listaMessaggiDellaChat[listaMessaggiDellaChat.length - 1];
     
      if ( messaggio && !messaggio.gruppo && ((messaggio.destinatario.username !== utente.username) || (messaggio.mittente.username !== utente.username))) {
        setDestinatario(
          messaggio.destinatario.username !== utente.username
            ? messaggio.destinatario
            : messaggio.mittente
        );
      } else if(messaggio.gruppo) {
          setDestinatario(messaggio.gruppo.username)
      }
    }

  });

  function inviaMessaggio(contenuto) {

    if(contenuto && contenuto !== '' && contenuto !== undefined){   
      let tipo = (chat.destinatario.amministratore ? 2 : 1)
      dispatch(setTipoChatId(tipo))      
      
      insertChat(chat, dispatch, setChat, chat.destinatario); 
      const chatPerBack = {
        idChat: chat.idChat,
        tipoChatId : chat.tipoChatId
      }
      const messaggio = {
        mittente: utente,
        dataOra: new Date(),
        contenutoMessaggio: contenuto,
        chat: chatPerBack,
        destinatario: chat.destinatario,
      };      
      console.log(messaggio)
      sendMessage(messaggio);
      setContenutoMessaggio('');
      
    } else {
      return;
    }
    
  }
  

  return (
    <>
      {chat.destinatario && Object.keys(chat.destinatario).length > 0 ? (
        <>
          <div ref={chatContainerRef} className='containerChatPage'>
            {listaMessaggiDellaChat ? (
              listaMessaggiDellaChat.map((messaggio) => (
                <div key={messaggio.idMessaggio} className='containerMessaggio'>
                  <div className='profiloContatto'>
                    <img
                      src={
                        messaggio.destinatario.username !== utente.username
                          ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                          : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                      }
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                    <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                      {' '}
                      {chat.destinatario.username}{' '}
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
              ))
            ) : chat.destinatario && chat.destinatario !== undefined ? (<>
              <div className='containerMessaggio'>
                <div className='profiloContatto'>
                  <img
                    src={
                      `data:image/png;base64,${chat.destinatario.fotoConvertita}`
                    }
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                    {' '}
                    {chat.destinatario.username}{' '}
                  </span>
                </div>

              </div></>) : <></>}
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