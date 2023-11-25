import React from 'react'
import '../custom/SideBar.css'
import { AREA_PERSONALE, LISTA_CHAT_UTENTE, REGISTER_PAGE, RUBRICA } from '../utility/Route'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux';
import { resetUtente } from '../store/slice/utenteSlice';
import { logout } from '../utility/sideBarUtils';
import { resetChat } from '../store/slice/chatSlice';
function SideBar() {


  const history = useHistory('');
  const utente = useSelector((state) => state.utente)
  const dispatch = useDispatch('')

  return (<>
    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='sidebar'>
          <img src={`data:image/png;base64,${utente.fotoConvertita}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <br /> <br />
          {/* LISTA MESSAGGI */}
          <button style={{ backgroundColor: "transparent", border: '0px' }} onClick={() => { history.push(LISTA_CHAT_UTENTE) }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505' }}></i></button>
          <br />
          {/* RUBRICA */}
          <button style={{ backgroundColor: "transparent", border: '0px' }} onClick={() => { history.push(RUBRICA) }}><i className="fa-solid fa-address-book fa-2x" style={{ color: "#0d0d0d" }}></i></button>
          <br />
          {/* PROFILO PERSONALE */}
          <button style={{ backgroundColor: "transparent", border: '0px' }} onClick={() => { history.push(AREA_PERSONALE) }}><i className="fa-solid fa-user fa-2x" style={{ color: "#0d0d0d" }}></i></button>
          <br />
          {/* LOGOUT */}
          <button style={{ backgroundColor: "transparent", border: '0px' }} onClick={() => { logout(resetUtente, resetChat, history, dispatch) }}><i className="fa-solid fa-right-from-bracket fa-2x" style={{ color: "#0d0d0d" }}></i></button>


        </div>
      </>
    ) : (
      <>

      </>)}

  </>




  )
}

export default SideBar