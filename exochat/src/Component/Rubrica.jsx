import React, { useEffect, useState } from 'react'
import '../custom/Rubrica.css'
import { findAllGruppi, findAllUtente } from '../service/utenteService';
import { useDispatch, useSelector } from 'react-redux';
import { resetChat, setDestinatario, setGruppo, setIdChat, setMittente, setTipoChatId } from '../store/slice/chatSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CREA_GRUPPO, LISTA_CHAT_UTENTE, VIDEO_CHAT, VIDEO_CHAT_PAGE } from '../utility/Route';
import CreateGruppo from './CreateGruppo';


function Rubrica() {

  const [contatti, setContatti] = useState();
  const [gruppi, setGruppi] = useState();
  const utente = useSelector((state) => state.utente)
  const dispatch = useDispatch('')
  const [utenteRicercato, setUtenteRicercato] = useState('')
  const history = useHistory('')
  const [mostraGruppo, setMostraGruppo] = useState(false);
  const [aggiornamento,setAggiornamento] = useState(false);
  


  useEffect(() => {
         //PASSARE L'UTENTE IN MANIERA TALE DA VISUALIZZARE SOLO I CONTATTI CON CUI NON SI HA UNA CHAT
    findAllUtente(utente, setContatti)
    //PASSARE L'UTENTE IN MANIERA TALE DA VISUALIZZARE I GRUPPI IN CUI NON CE ALCUN MESSAGGIO
    findAllGruppi(utente, setGruppi)
    console.log("contatti", contatti)
    console.log("gruppi", gruppi)
   
 

    return ()=>{
      console.log("smontaggio")
    }

  }, [])

  useEffect(() => {

    //TIMEOUT PERCHE SE IL GRUPPO NON TORNA IN TEMPO NON AGGIORNA METTERE LO SPIN
    setTimeout(() => {
         //PASSARE L'UTENTE IN MANIERA TALE DA VISUALIZZARE SOLO I CONTATTI CON CUI NON SI HA UNA CHAT
    findAllUtente(utente, setContatti)
    //PASSARE L'UTENTE IN MANIERA TALE DA VISUALIZZARE I GRUPPI IN CUI NON CE ALCUN MESSAGGIO
    findAllGruppi(utente, setGruppi)
    console.log("contatti", contatti)
    console.log("gruppi", gruppi)
    }, 3000);

  }, [mostraGruppo])






  function iniziaChat(contatto) {
    dispatch(resetChat())
    dispatch(setMittente(utente))
    if (contatto.amministratoreGruppo) {
      dispatch(setTipoChatId(2))
      dispatch(setGruppo(contatto))
    } else {
      dispatch(setTipoChatId(1))
      dispatch(setDestinatario(contatto))
    }
    setAggiornamento(!aggiornamento)
    dispatch(setIdChat(null))
    history.push("/webSocket")
  }

  const mostraCreaGruppo = ()=>{
    setAggiornamento(!aggiornamento)
    setMostraGruppo(true)
  }

  return (<>

{mostraGruppo && <CreateGruppo setMostraGruppo={setMostraGruppo} />}

    <div style={{ backgroundColor: "#075E54", position: "fixed", bottom: "0px", top: "0px", width: "400px", marginLeft: "92px" }}>
      <h2 style={{ color: 'white', fontFamily: 'Fonseca, sans-serif', margin: '0 0 0 0', marginTop: '21px', marginLeft: '20px', marginBottom: '0px' }}><b>Rubrica</b></h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          style={{ width: "300px",marginTop:"10px" }}
          type='text'
          placeholder='Cerca per nome...'
          onChange={(e) => { setUtenteRicercato(e.target.value) }}
        />
      </div>

      <div style={{display:"flex",flexDirection:"row",backgroundColor:"transparent",height:"50px",justifyContent:"center"}}>
      <button onClick={() => {mostraCreaGruppo()}} style={{ backgroundColor: "transparent", border: '0px',position:"relative",top:"-20px",left:"-60px" }}><i class="fa-solid fa-circle-plus fa-2x" style={{color:"#25D366",cursor:"pointer"}}
      onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
      onMouseOut={(e) => { e.currentTarget.style.color = '#25D366' }}
      ></i></button>
      <h3 style={{ color: 'white', fontFamily: 'Fonseca, sans-serif', margin: '0 0 0 0',position:"relative",top:"13px"}}><b>Lista contatti</b></h3>
      </div>
      
      <div style={{ backgroundColor: "transparent", height: "750px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
      <div className='scrollNone' style={{   backgroundColor: (contatti && contatti.length > 1) || (gruppi && gruppi.length > 0) ? "white" : "transparent", padding: "15px", height: "auto", width: "340px", borderRadius: "20px", overflowY: "auto", scrollbarWidth: "none",display:"flex", flexDirection: "column", alignItems: "center" }}>
        {contatti && contatti.filter(utenteRicercato !== ''
            ? (contatti) => contatti.username.includes(utenteRicercato)
            : (contatti) => contatti.idUtente !== utente.idUtente).map((contatto) => (
            <div key={contatto.idUtente} style={{ width: "320px", minHeight: "70px",maxHeight:"70px", marginTop: "15px", backgroundColor: "#25D366", color: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "static", display: "flex", flexDirection: "column" }}>
                <img style={{ position: "relative", left: "-50px", top: "30px", width: '40px', height: '40px', borderRadius: '50%' }} src={`data:image/png;base64,${contatto.fotoConvertita}`} />
                <span style={{ position: "relative", top: "-15px", fontWeight: "bold", fontSize: "20px", width: "200px", textAlign: "center", backgroundColor: "transparent", color: "black" }}>{contatto.username}</span>
                <span style={{ position: "relative", top: "-10px", fontWeight: "bold", fontSize: "20px", width: "200px", textAlign: "center", backgroundColor: "transparent", color: "black" }}>{contatto.info}</span>
                <span style={{ display: 'block', textAlign: 'right', marginLeft: '60px', marginTop: '-50px' }}>
                  <button onClick={() => { iniziaChat(contatto) }} style={{ position: "relative", left: "50px", top: "-25px", backgroundColor: "transparent", border: '0px' }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505',cursor:"pointer" }}
                   onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
                   onMouseOut={(e) => { e.currentTarget.style.color = 'black' }}
                  ></i></button>
                </span>
              </div>
            </div>
          ))}
          {gruppi && gruppi.filter(utenteRicercato !== ''
            ? (gruppi) => gruppi.username.includes(utenteRicercato)
            : (gruppi) => gruppi.idUtente !== utente.idUtente).map((gruppo) => (
            <div key={gruppo.idUtente} style={{ width: "320px", minHeight: "70px",maxHeight:"70px", marginTop: "15px", backgroundColor: "#25D366", color: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ position: "static", display: "flex", flexDirection: "column" }}>
                <img style={{ position: "relative", left: "-50px", top: "30px", width: '40px', height: '40px', borderRadius: '50%' }} src={`data:image/png;base64,${gruppo.fotoConvertita}`} />
                <span style={{ position: "relative", top: "-15px", fontWeight: "bold", fontSize: "20px", width: "200px", textAlign: "center", backgroundColor: "transparent", color: "black" }}>{gruppo.username}</span>
                <span style={{ position: "relative", top: "-10px", fontWeight: "bold", fontSize: "20px", width: "200px", textAlign: "center", backgroundColor: "transparent", color: "black" }}>{gruppo.info}</span>
                <span style={{ display: 'block', textAlign: 'right', marginLeft: '60px', marginTop: '-50px' }}>
                  <button onClick={() => { iniziaChat(gruppo) }} style={{ position: "relative", left: "50px", top: "-25px", backgroundColor: "transparent", border: '0px' }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505',cursor:"pointer" }}
                   onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
                   onMouseOut={(e) => { e.currentTarget.style.color = 'black' }}
                  ></i></button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    

    {/* 

    <div className='containerRubricaPage'>
      <h1 style={{ color: 'white', fontFamily: 'Fonseca, sans-serif', alignItems: 'center', textAlign: 'left', margin: '0 0 0 0', marginTop: '21px', marginLeft: '20px', marginBottom: '0px' }}><b>RUBRICA</b></h1>
      <div className='searchBar'>
        <input
          type='text'
          placeholder='Cerca per nome...'
          onChange={(e) => { setUtenteRicercato(e.target.value) }}
        />
        <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i class="fa-solid fa-magnifying-glass fa-2x"></i></button>
      </div>
      <br />
      <div onClick={() => { history.push(CREA_GRUPPO) }} style={{ marginTop: '-20px', marginBottom: '15px', backgroundColor: 'white', borderRadius: '15px', height: '40px', width: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', left: '14%' }}>
        <h3 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif' }}><i class="fa-solid fa-user-group"></i><b style={{ marginLeft: '10px' }}>NUOVO GRUPPO</b></h3>
      </div>
      <h3 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', alignItems: 'center', textAlign: 'left', margin: '0 0 0 0', marginTop: '21px', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CONTATTI</b></h3>
      <table className='tableListaContatto'>
        <thead>

          {contatti && contatti.filter(utenteRicercato !== ''
            ? (contatti) => contatti.username.includes(utenteRicercato)
            : (contatti) => contatti.idUtente !== utente.idUtente).map((contatto) => (
              <tr key={contatto.idUtente} >
                <th>
                  <div className="containerContatto" >
                    <span className='spanContatto'>  <img src={`data:image/png;base64,${contatto.fotoConvertita}`} style={{ position: 'absolute', left: '0px', marginTop: '5px', marginLeft: '5px', width: '50px', height: '50px', borderRadius: '50%' }} />     </span>
                    <span className='spanContatto' style={{ display: 'flex', textAlign: 'left', marginLeft: '60px', marginTop: '10px' }} >{contatto.username}</span>
                    <span className='spanContatto' style={{ display: 'flex', textAlign: 'left', marginLeft: '60px' }}>{contatto.info} </span>
                    <span style={{ display: 'block', textAlign: 'right', marginLeft: '60px', marginTop: '-50px' }}>
                      <button onClick={() => { iniziaChat(contatto) }} style={{ backgroundColor: "transparent", border: '0px' }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505' }}></i></button>
                    </span>

                  </div>
                </th>
              </tr>
            ))}

        </thead>
      </table>
      <h3 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', alignItems: 'center', textAlign: 'left', margin: '0 0 0 0', marginTop: '21px', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO GRUPPI</b></h3>
      <table className='tableListaContatto'>
        <thead>
          {gruppi && gruppi.map((gruppo) => (
            <tr key={gruppo.idUtente} >
              <th>
                <div className="containerContatto" >
                  <span className='spanContatto'>  <img src={`data:image/png;base64,${gruppo.fotoConvertita}`} style={{ position: 'absolute', left: '0px', marginTop: '5px', marginLeft: '5px', width: '50px', height: '50px', borderRadius: '50%' }} />     </span>
                  <span className='spanContatto' style={{ display: 'block', textAlign: 'left', marginLeft: '60px', marginTop: '10px' }} >{gruppo.username}</span>
                  <span className='spanContatto' style={{ display: 'block', textAlign: 'left', marginLeft: '60px' }}>{gruppo.info} </span>
                  <span style={{ display: 'block', textAlign: 'right', marginLeft: '60px', marginTop: '-50px' }}>
                    <button onClick={() => { iniziaChat(gruppo) }} style={{ backgroundColor: "transparent", border: '0px' }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505' }}></i></button>
                  </span>

                </div>
              </th>
            </tr>
          ))}
        </thead>
      </table>
    </div>
*/}
  </>
  )

}

export default Rubrica