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
          <button style={{ backgroundColor: "transparent", border: '0px',marginTop:"10px" }} onClick={() => { history.push("/webSocket") }}><i className="fa-solid fa-message fa-2x" style={{ color: '#25D366' ,display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"50%",cursor: 'pointer'}}
           onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0f756a' }}
           onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
           ></i></button>
          <br />
          {/* RUBRICA */}
          <button style={{ backgroundColor: "transparent", border: '0px' ,marginTop:"10px"}} onClick={() => { history.push(RUBRICA) }}><i className="fa-solid fa-address-book fa-2x" style={{ color: "#25D366" ,display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"50%",cursor: 'pointer'}}
           onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0f756a' }}
           onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          ></i></button>
          <br />
          {/* PROFILO PERSONALE */}
          <button style={{ backgroundColor: "transparent", border: '0px',marginTop:"10px" }} onClick={() => { history.push(AREA_PERSONALE) }}><i className="fa-solid fa-user fa-2x" style={{ color: "#25D366",display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"50%",cursor: 'pointer' }}
           onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0f756a' }}
           onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          ></i></button>
          <br />
          {/* LOGOUT */}
          <button style={{ backgroundColor: "transparent", border: '0px',marginTop:"10px" }} onClick={() => { logout(resetUtente, resetChat, history, dispatch) }}><i className="fa-solid fa-right-from-bracket fa-2x" style={{ color: "#25D366",display:"flex",justifyContent:"center",alignItems:"center",width:"40px",height:"40px",borderRadius:"50%",cursor: 'pointer' }}
           onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0f756a' }}
           onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          ></i></button>


        </div>
      </>
    ) : (
      <>

      </>)}

  </>




  )
}

export default SideBar