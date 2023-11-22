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

  return ( <>
    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='sidebar'>
        {/* LISTA MESSAGGI */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(LISTA_CHAT_UTENTE)}}><i className="fa-solid fa-message fa-2x" style={{color: '#050505'}}></i></button>
        <br />
         {/* LISTA VIDEOCHIAMATE */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-video fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* PROFILO PERSONALE */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(AREA_PERSONALE)}}><i className="fa-solid fa-user fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* RUBRICA */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(RUBRICA)}}><i className="fa-solid fa-address-book fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
        <div className='iconsBottom'>
         {/* IMPOSTAZIONI */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-gear fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* LOGOUT */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {logout(resetUtente, resetChat, history, dispatch)}}><i className="fa-solid fa-right-from-bracket fa-2x" style={{color: "#0d0d0d"}}></i></button>
        </div>

    </div>
      </>
    ) : (
      <>

      </>)}

  </>
   
  
  
  
  )
}

export default SideBar