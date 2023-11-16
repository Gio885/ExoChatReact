import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { findAllChatForUtente } from '../service/chatService'

function ListaChat() {

  const utente = useSelector((state) => state.utente)
  const [listaChat, setListaChat] = useState([])

  useEffect(() => {

    findAllChatForUtente(utente, setListaChat)

  }, [])


  return (<>

    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='containerTableLista'>
          <table>
            <tr>
              <thead>
              <th>
                fatgntn
              </th>
              </thead>            
              
            </tr>
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