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
      <table>
        <thead>
          {listaMessaggiPerChat.filter(messaggio => messaggio.chat.idChat ).map((messaggio) => (
            <tr key={messaggio.chat.idChat}>
              <th>
              <div style={{backgroundColor:"white",width:"500px",height:"50px",borderRadius:"15px",whiteSpace: "nowrap",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{color:"black",marginRight:"20px",textAlign:"left"}}><b>{messaggio.destinatario.username}</b></span>
                <span style={{color:"black",marginRight:"20px"}}>{messaggio.contenutoMessaggio}</span>
                <span style={{color:"black"}}>{messaggio.dataOra}</span>
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