import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../custom/ListaChat.css'
import { findChatForUtente } from '../service/messaggioService'
import { formattaData } from '../utility/Utils'
import { resetChat, setChat, setDestinatario } from '../store/slice/chatSlice';

function ListaChat() {
  const utente = useSelector((state) => state.utente);
  const [listaChat, setListaChat] = useState([]);
  const dispatch = useDispatch('');

  useEffect(() => {
    
    if (utente.idUtente) {
      findChatForUtente(utente, setListaChat, listaChat);      
    }
  });


  function handleChatPage(messaggio) {
    const chat = {
      idChat: messaggio.idChat,
      tipoChatId: messaggio.tipoChatId
    }
    if(messaggio.destinatario !== undefined){
      dispatch(setDestinatario((messaggio.destinatario.idUtente === utente.idUtente) ? messaggio.mittente : messaggio.destinatario))
    } else {
      dispatch(setDestinatario(messaggio.gruppo))
    }
    
    
    dispatch(setChat(chat));
  }

  return (
    <>
      {utente.idUtente && Object.keys(utente).length > 0 ? (
        <>
          <div className='containerTableLista'>
            <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CHAT</b></h1>
            <div className='searchBar'>
              <input
                type='text'
                placeholder='Cerca per nome...'
              />
              <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i className="fa-solid fa-magnifying-glass fa-2x"></i></button>
            </div>
            <table className='tableListaChat'>
              <thead>
                {listaChat && listaChat.map((messaggio) => (
                  <tr key={messaggio.idChat} onClick={() => { handleChatPage(messaggio) }}>
                    <th>
                      <div className="containerChat">
                        <img
                          src={(messaggio.tipoChatId === 1) ? (messaggio.destinatario.username !== utente.username)
                            ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                            : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                            : `data:image/png;base64,${messaggio.gruppo.fotoConvertita}`}
                          style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px 0 0 -290px' }}
                        />
                        <span
                          style={{
                            textAlign: 'left',
                            color: 'black',
                            display: 'flex',
                            marginTop: '-50px',
                            marginLeft: '60px',
                            fontSize: '20px',
                          }}
                        >

                          <b>
                            {
                              // Se è una chat individuale
                              messaggio.tipoChatId === 1
                                ? (
                                  // Se il destinatario è l'utente corrente, mostra il nome del mittente, altrimenti mostra il nome del destinatario
                                  (messaggio.destinatario.idUtente === utente.idUtente)
                                    ? messaggio.mittente.username
                                    : messaggio.destinatario.username
                                )
                                // Se è una chat di gruppo, mostra il nome del gruppo
                                : messaggio.gruppo.username
                            }
                          </b>
                        </span>
                        <span
                          style={{
                            color: 'black',
                            textAlign: 'left',
                            justifyContent: 'left',
                            display: 'flex',
                            marginLeft: '60px',
                            fontWeight: 'normal',
                          }}
                        >
                          {messaggio.contenutoMessaggio}
                        </span>
                        <br />
                        <span
                          style={{
                            textAlign: 'right',
                            justifyContent: 'right',
                            marginLeft: '160px',
                            marginTop: '-15px',
                            marginBottom: '15px',
                            fontSize: '12px',
                            color: 'gray',
                            display: 'block',
                          }}
                        >
                          {formattaData(messaggio.dataOra)}
                        </span>
                      </div>
                    </th>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ListaChat;
