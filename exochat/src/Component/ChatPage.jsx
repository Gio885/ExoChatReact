import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { findAllMessageForChat } from '../service/chatService';
import { formattaData } from '../utility/Utils';
import '../custom/ChatPage.css';
import { sendMessage } from '../service/messaggioService';

function ChatPage({ destinatarioChat, setDestinatarioChat }) {
  const [listaMessaggiDellaChat, setListaMessaggiDellaChat] = useState([]);
  const chat = useSelector((state) => state.chat);
  const utente = useSelector((state) => state.utente);
  const [destinatario, setDestinatario] = useState('');
  const [contenutoMessaggio, setContenutoMessaggio] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {

    if (destinatarioChat && destinatarioChat !== undefined) {
      setDestinatario(destinatarioChat);
      setDestinatarioChat(null)
      console.log('sono qui dentro')
    }
  }, [destinatarioChat]);

  useEffect(() => {
    if (!destinatarioChat || destinatarioChat === undefined) {
      findAllMessageForChat(chat, setListaMessaggiDellaChat)
    }
    console.log('useEffect chatpage')

  }, [chat, listaMessaggiDellaChat])


  useEffect(() => {

    if (listaMessaggiDellaChat) {
      const messaggio = listaMessaggiDellaChat[listaMessaggiDellaChat.length - 1];

      if (
        messaggio &&
        ((messaggio.destinatario.username !== utente.username &&
          messaggio.destinatario.idUtente !== destinatario.idUtente) ||
          (messaggio.mittente.username !== utente.username &&
            messaggio.mittente.idUtente !== destinatario.idUtente))
      ) {
        setDestinatario(
          messaggio.destinatario.username !== utente.username
            ? messaggio.destinatario
            : messaggio.mittente
        );
      }
    }

  }, [listaMessaggiDellaChat, utente, destinatario]);

  function inviaMessaggio(contenuto) {
    const messaggio = {
      mittenteId: utente.idUtente,
      dataOra: new Date(),
      contenutoMessaggio: contenuto,
      chatId: chat.idChat,
      destinatarioId: destinatario.idUtente,
    };

    sendMessage(messaggio);
    setContenutoMessaggio('');
  }

  return (
    <>
      {chat.idChat && Object.keys(chat).length > 0 ? (
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
                      {destinatario.username}{' '}
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
            ) : destinatario && destinatario !== undefined ? (<>
              <div className='containerMessaggio'>
                <div className='profiloContatto'>
                  <img
                    src={
                      `data:image/png;base64,${destinatario.fotoConvertita}`
                    }
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                    {' '}
                    {destinatario.username}{' '}
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