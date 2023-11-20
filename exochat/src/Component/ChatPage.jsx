import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { findAllMessageForChat } from '../service/chatService'
import { formattaData } from '../utility/Utils'
import '../custom/ChatPage.css'
import { sendMessage } from '../service/messaggioService'

function ChatPage() {

  const [listaMessaggiDellaChat, setListaMessaggiDellaChat] = useState([])
  const chat = useSelector((state) => state.chat)
  const utente = useSelector((state) => state.utente)
  const [messaggioDaInviare, setMessaggioDaInviare] = useState('')

  useEffect(() => {

    findAllMessageForChat(chat, setListaMessaggiDellaChat)

  }, [chat, setListaMessaggiDellaChat])


  return (<>

    {chat.idChat && Object.keys(chat).length > 0 ? (<>
      <div className='containerChatPage'>

        {listaMessaggiDellaChat && listaMessaggiDellaChat.map((messaggio) => (
          <div key={messaggio.idMessaggio} className='containerMessaggio'>
            <div className='profiloContatto'>

              <img
                src={(messaggio.destinatario.username !== utente.username)
                  ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                  : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                }
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />

              <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>{(messaggio.destinatario.username !== utente.username) ? messaggio.destinatario.username : messaggio.mittente.username}</span>
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
              <span style={{
                textAlign: 'right',
                justifyContent: 'right',
                marginLeft: '110px',
                fontSize: '12px',
                color: 'gray',
              }}>{formattaData(messaggio.dataOra)}</span>


            </div>
          </div>
        ))}

        <div className='pannelloChat'>
          <input
            type='text'
            placeholder='Scrivi un messaggio'
            onChange={(e) => setMessaggioDaInviare(e.target.value)}
          />
          <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }} onClick={(e) => { sendMessage(messaggioDaInviare) }}><i class="fa-solid fa-paper-plane fa-2x"></i></button>

        </div>

      </div>
    </>) : (<>
    </>)}

  </>)
}

export default ChatPage