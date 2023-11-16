import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../custom/ListaChat.css'
import { findAllMessageForUtenteForChat } from '../service/messaggioService'
import { formattaData } from '../utility/Utils'

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
        <h1 style={{color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CHAT</b></h1>
          <div className='searchBar'>
            <input
              type='text'
              placeholder='Cerca per nome...'
            />
            <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i class="fa-solid fa-magnifying-glass fa-2x"></i></button>

          </div>
          <table className='tableListaChat'>
            <thead>

              {listaMessaggiPerChat && listaMessaggiPerChat.map((messaggio) => (
                <tr key={messaggio.chat.idChat}>
                  <th>

                    <div className="containerChat" >
                      <span className='spanChat'><b>{messaggio.destinatario.username}</b></span>
                      <span className='spanChat'>{messaggio.contenutoMessaggio}</span>
                      <span className='spanChat'>{formattaData(messaggio.dataOra)} </span>
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