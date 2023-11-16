import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../custom/ListaChat.css'
import { findAllMessageForUtenteForChat } from '../service/messaggioService'

function ListaChat() {

  const utente = useSelector((state) => state.utente)
  const [listaMessaggiPerChat, setListaMessaggiPerChat] = useState([])



  useEffect(() => {

    findAllMessageForUtenteForChat(utente, setListaMessaggiPerChat)


  }, [])


  return (<>

    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='containerTableLista'>
          <table className='tableListaChat'>
            <thead>
              {listaMessaggiPerChat.map((messaggio) => (
                <tr key={messaggio.chat.idChat}>
                  <th>

                    <div className="containerChat" >
                      <span className='spanChat'><b>{messaggio.destinatario.username}</b></span>
                      <span className='spanChat'>{messaggio.contenutoMessaggio}</span>
                      <span className='spanChat'>{messaggio.dataOra}</span>
                    </div>
                  </th>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </>
    ) : (
      <>

      </>)}

  </>
  )
}

export default ListaChat