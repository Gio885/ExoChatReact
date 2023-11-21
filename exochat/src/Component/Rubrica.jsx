import React, { useEffect, useState } from 'react'
import '../custom/Rubrica.css'
import { findAllUtente } from '../service/utenteService';
import { useDispatch, useSelector } from 'react-redux';
import { insertChat } from '../service/messaggioService';
import { setChat } from '../store/slice/chatSlice';


function Rubrica() {

  const[contatti,setContatti] = useState();
  const utente = useSelector ((state) => state.utente)
  const dispatch = useDispatch('')

  useEffect( ()=>{

    //PASSARE L'UTENTE IN MANIERA TALE DA VISUALIZZARE SOLO I CONTATTI CON CUI NON SI HA UNA CHAT
    findAllUtente(setContatti)

  })


  function iniziaChat(contatto){
    const chat = {
      tipoChatId:1
    }
    insertChat(chat,dispatch,setChat,contatto);
  }


  return ( <>

      <div className='containerRubricaPage'>
      <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif',alignItems:'center', textAlign: 'left',margin:'0 0 0 0',marginTop:'21px',marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CONTATTI</b></h1>
      <div className='searchBar'>
            <input
              type='text'
              placeholder='Cerca per nome...'
            />
            <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i class="fa-solid fa-magnifying-glass fa-2x"></i></button>
      </div>
      <div style={{marginTop:'-20px',marginBottom:'15px',backgroundColor:'white',borderRadius:'15px',height:'40px',width:'250px',display:'flex',justifyContent:'center',alignItems:'center',position:'relative',left:'14%'}}>
      <h3 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif'}}><i class="fa-solid fa-user-group"></i><b style={{marginLeft:'10px'}}>NUOVO GRUPPO</b></h3>
      </div>
      <table className='tableListaContatto'>
            <thead>

              {contatti && contatti.map((contatto) => (
                <tr key={contatto.idUtente} onClick={()=>iniziaChat(contatto)} >
                  <th>
                    <div className="containerContatto" >
                      <span className='spanContatto'>  <img src = {`data:image/png;base64,${contatto.fotoConvertita}`} style={{ position:'absolute',left:'0px',marginTop:'5px',marginLeft:'5px',width: '50px', height: '50px', borderRadius: '50%' }}/>     </span>
                      <span className='spanContatto'style={{ display: 'block',textAlign:'left',marginLeft:'60px',marginTop:'10px' }} >{contatto.username}</span>
                      <span className='spanContatto' style={{ display: 'block',textAlign:'left',marginLeft:'60px' }}>{contatto.info} </span>
                    </div>
                  </th>
                </tr>

              ))}

            </thead>
          </table>
      </div>
  
  </>
  )
}

export default Rubrica