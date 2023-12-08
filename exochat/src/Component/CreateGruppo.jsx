import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createGruppo, findAllContattiPerGruppo, findAllUtente } from '../service/utenteService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../custom/CreateGruppo.css'

function CreateGruppo( {setMostraGruppo} ) {
  const utente = useSelector((state) => state.utente);
  const history = useHistory();
  const [utenti, setUtenti] = useState([]);
  const [gruppo, setGruppo] = useState({
    username: '',
    amministratoreGruppo: utente,
    fotoConvertita: null,
    info: ''
  });

  const [alertNomeGruppo, setAlertNomeGruppo] = useState('')
  const [alertInfoGruppo, setAlertInfoGruppo] = useState('')
  const [alertUtentiGruppo, setAlertUtentiGruppo] = useState('')
  const [utentiSelezionati, setUtentiSelezionati] = useState([]);

  useEffect(() => {
    findAllContattiPerGruppo(setUtenti);
  }, []);


  function convertToBase64(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result.split(',')[1];
      callback(base64String);
    };

    reader.readAsDataURL(file);
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      convertToBase64(selectedFile, (base64String) => {
        setGruppo((prevGruppo) => ({
          ...prevGruppo,
          fotoConvertita: base64String,
        }));
      });
    }
  };


  function creaUnGruppo() {

    let checkNomeGruppo = false
    let checkInfoGruppo = false
    let checkUtentiGruppo = false

    console.log('sono dentro creaUngruppo')
    console.log(gruppo)
    if (!gruppo.username || gruppo.username === '') {
      setAlertNomeGruppo('Inserisci un nome gruppo')
      checkNomeGruppo = false
      console.log('sono dentro L IF')
    } else {
      console.log('sono dentro ELSE')
      checkNomeGruppo = true
      setAlertNomeGruppo('')
    }
    if (!gruppo.info || gruppo.info === '') {
      setAlertInfoGruppo('Inserisci un info gruppo')
      checkInfoGruppo = false
    } else {
      checkInfoGruppo = true
      setAlertInfoGruppo('')
    }
    if (utentiSelezionati.length === 0) {
      setAlertUtentiGruppo('Seleziona almeno un utente per creare il gruppo')
      checkUtentiGruppo = false
    } else {
      checkUtentiGruppo = true
      setAlertUtentiGruppo('')
    }
    if (checkInfoGruppo && checkNomeGruppo && checkUtentiGruppo) {
      console.log(utentiSelezionati)
      createGruppo(gruppo, history, utentiSelezionati, utente);
      setMostraGruppo(false)
    } else {

    }
  }

  return (

    <>

      <div style={{ position: "relative", top: "30px", width: "650px", left: "650px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#075E54", border: "3px solid white", height: "900px", borderRadius: "20px" }}>
        <div  style={{ position: "relative",display:"flex",flexDirection:"column", backgroundColor: "transparent", borderRadius: "20px", width: "600px", height: "850px" }}>
          <h2 style={{ color: 'white', fontFamily: 'Fonseca, sans-serif', textAlign: 'center', marginLeft: '20px', marginBottom: '10px' }}><b>NUOVO GRUPPO</b></h2>
          <label style={{ color: ' white', fontFamily: 'sans-serif',position:"relative" }}>
            <b>Nome Gruppo:</b>
            <input
              type='text'
              placeholder='Inserisci nome Gruppo'
              style={{ textAlign: 'center',width:"300px",marginLeft:"50px",marginTop:"15px" }}
              value={gruppo.nomeGruppo}
              onChange={(e) => setGruppo((prevGruppo) => ({ ...prevGruppo, username: e.target.value }))}
            />
          </label>
          {(alertNomeGruppo && <div style={{ color: 'red' }}> {alertNomeGruppo} </div>)}
          <br />
          <br />
          <label style={{ color: ' white', fontFamily: 'sans-serif' ,position:"relative",left:"8px"}}>
            <b>Info Gruppo:</b>
            <input
              type='email'
              placeholder='Inserisci le info Gruppo'
              style={{ textAlign: 'center',width:"300px",marginLeft:"50px" }}
              value={gruppo.infoGruppo}
              onChange={(e) => setGruppo((prevGruppo) => ({ ...prevGruppo, info: e.target.value }))}
            />
          </label>
          {(alertInfoGruppo && <div style={{ color: 'red' }}> {alertInfoGruppo} </div>)}
          <label style={{ color: ' white', fontFamily: 'sans-serif',position:"relative",left:"-5px",marginTop:"10px" }}>
          <b>Foto Gruppo:</b>
          <input
            type='file'
            style={{ textAlign: 'center',width:"300px",marginLeft:"50px",marginTop:"15px" }}
            onChange={handleFileChange}
          />
        </label>
        <label style={{ color: 'white', fontFamily: 'sans-serif',marginTop:"25px" }}>
          <b>Utenti nel Gruppo:</b>
          <div  style={{ position: "relative",display:"flex",flexDirection:"column", backgroundColor: "transparent",marginTop:"10px", borderRadius: "20px", width: "550px", height: "420px",position:"relative",left:"25px",alignItems:"center" }}>
          <div className='scrollNone' style={{ backgroundColor: "white", height: "2000px", width: "340px",marginBottom:"20px", borderRadius: "20px", overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {utenti
              .filter((utenteLista) => utenteLista.idUtente !== utente.idUtente)
              .map((utenteLista) => (
                <div key={utenteLista.idUtente} style={{display:"flex",justifyContent:"center"}}>
                    <label>
                    <input
                    style={{position:"relative",top:"25px",left:"10px",width:"20px",height:"30px"}}
                      type='checkbox'
                      checked={utentiSelezionati.includes(utenteLista.idUtente)}
                      onChange={() => {
                        const updatedUtentiSelezionati = utentiSelezionati.includes(utenteLista.idUtente)
                          ? utentiSelezionati.filter((id) => id !== utenteLista.idUtente)
                          : [...utentiSelezionati, utenteLista.idUtente];

                        setUtentiSelezionati(updatedUtentiSelezionati);
                      }}
                    />
                    <div style={{backgroundColor:"#25D366",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",width:"250px",borderRadius:"10px"}}>
                    {utenteLista.username}
                    </div>
                  </label>
                </div>
              ))}    
          </div>
          </div>
        </label>
        {(alertUtentiGruppo && <div style={{ color: 'red' }}> {alertUtentiGruppo} </div>)}
        <div>
          <button className='buttonForRegisterPage' type='button' onClick={() => creaUnGruppo()}>
            Crea Gruppo
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

export default CreateGruppo;
