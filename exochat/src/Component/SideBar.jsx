import React from 'react'
import '../custom/SideBar.css'
import { REGISTER_PAGE } from '../utility/Route'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux';
function SideBar() {


    const history = useHistory('');
    const utente = useSelector((state) => state.utente)

  return ( <>
    {utente.idUtente && Object.keys(utente).length > 0 ? (
      <>
        <div className='sidebar'>
        {/* LISTA MESSAGGI */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-message fa-2x" style={{color: '#050505'}}></i></button>
        <br />
         {/* LISTA VIDEOCHIAMATE */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-phone fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* PROFILO PERSONALE */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-user fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* RUBRICA */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-address-book fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
        <div className='iconsBottom'>
         {/* IMPOSTAZIONI */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-gear fa-2x" style={{color: "#0d0d0d"}}></i></button>
        <br />
         {/* LOGOUT */}
        <button style={{backgroundColor: "transparent", border: '0px'}} onClick={()=> {history.push(REGISTER_PAGE)}}><i className="fa-solid fa-right-from-bracket fa-2x" style={{color: "#0d0d0d"}}></i></button>
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