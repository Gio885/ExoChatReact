import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { findAllMessageForChat } from '../service/chatService'
import { formattaData } from '../utility/Utils'
import '../custom/ChatPage.css'

function ChatPage() {

  const [listaMessaggiDellaChat, setListaMessaggiDellaChat] = useState([])
  const chat = useSelector((state) => state.chat)

  useEffect(() => {

    findAllMessageForChat(chat, setListaMessaggiDellaChat)

  }, [chat])

  return (<>

    {chat.idChat && Object.keys(chat).length > 0 ? (<>
      <div className='containerChatPage'>
        {listaMessaggiDellaChat && listaMessaggiDellaChat.map((messaggio) => (

          <div
            key={messaggio.idMessaggio}
            className={
              messaggio.mittente.idUtente === chat.utente.idUtente
                ? 'messaggio-mittente'
                : 'messaggio-destinatario'
            }
          >

            {messaggio.contenutoMessaggio}
            {formattaData(messaggio.dataOra)}
          </div>

        ))}</div>
    </>) : (<>
    </>)}

  </>)
}

export default ChatPage