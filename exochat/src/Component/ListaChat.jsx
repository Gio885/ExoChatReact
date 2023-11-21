import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../custom/ListaChat.css'
import { useHistory } from 'react-router-dom';
import { findAllMessageForUtenteForChat } from '../service/messaggioService'
import { formattaData } from '../utility/Utils'
import { setChat } from '../store/slice/chatSlice';

function ListaChat() {

  const utente = useSelector((state) => state.utente)
  const [listaMessaggiPerChat, setListaMessaggiPerChat] = useState([])
  const [destinatario, setDestinatario] = useState('')
  const history = useHistory('')
  const dispatch = useDispatch('')


  useEffect(() => {

    findAllMessageForUtenteForChat(utente, setListaMessaggiPerChat)
    if(listaMessaggiPerChat){
      listaMessaggiPerChat.map((messaggio) => {
        (messaggio.destinatario.username !== utente.username) ? setDestinatario(messaggio.destinatario): setDestinatario(messaggio.mittente) 
        return;
      })
    }
    
  }, [])

  function handleChatPage(chat) {
    dispatch(setChat(chat))
  }




  return (<>

    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='containerTableLista'>
          <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CHAT</b></h1>
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
                <tr key={messaggio.chat.idChat} onClick={() => handleChatPage(messaggio.chat)}>
                  <th>

                    <div className="containerChat">
                      <img
                        src={(messaggio.destinatario.username !== utente.username)
                          ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                          : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                        }
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
                        <b>{destinatario.username}</b>
                      </span>
                      <span

                        style={{
                          color:'black',
                          textAlign:'left',
                          justifyContent:'left',
                          display:'flex',
                          marginLeft: '60px',
                          fontWeight:'normal'

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
                          marginTop:'-15px',
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
      <>

      </>)}

  </>
  )
}

export default ListaChat