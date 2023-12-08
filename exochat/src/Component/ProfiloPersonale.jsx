import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUtente } from '../store/slice/utenteSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateUtente } from '../service/utenteService';



function ProfiloPersonale() {

  const validUsername = /^[a-zA-Z0-9_]{3,20}$/;
  const validEmail = /^[A-Za-z0-9._%+-]{4,}@([A-Za-z0-9-]{4,}\.)+[A-Za-z]{2,}$/;
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/;
  const utente = useSelector((state) => state.utente);
  const [modifica, setModifica] = useState(false);
  const [modifiche, setModifiche] = useState({
    idUtente: utente.idUtente,
    username: utente.username,
    email: utente.email,
    password: utente.password,
    fotoConvertita: utente.fotoConvertita,
    info: utente.info,
  });
  const [alertMessage, setAlertMessage] = useState('')
  const [alertUsername, setAlertUsername] = useState('')
  const [alertEmail, setAlertEmail] = useState('')
  const [alertPassword, setAlertPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const file = new File([modifiche.fotoConvertita], 'fileName', { type: 'image/jpeg' });

  function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result.split(',')[1];
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }


  function abilitaModifica() {
    setModifica(true);
  };

  function gestisciModifiche(campo, valore) {
    setModifiche((prevModifiche) => ({
      ...prevModifiche,
      [campo]: valore,
    }));
  };

  function handleFileChange(event)  {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      convertToBase64(selectedFile, (base64String) => {
        setModifiche((prevModifiche) => ({
          ...prevModifiche,
          fotoConvertita: base64String,
        }));
      });
    }
  };

  function salvaModifiche() {

    let checkUsername = false;
    let checkMail = false
    let checkPassword = false;
    
    if (
      modifiche.username.trim() === '' ||
      modifiche.email.trim() === '' ||
      modifiche.password.trim() === ''
    ) {
      setAlertMessage('Compila tutti i campi obbligatori.');
      return;
    } 
    console.log(modifiche.username.length)
    if(!validUsername.test(modifiche.username) || modifiche.username.length < 4 || modifiche.username === ''){
      setAlertUsername('Inserisci un username valido')
      checkUsername = false
  } else {
      setAlertUsername('')
      checkUsername = true
  }
    
    if(!validEmail.test(modifiche.email) ||  modifiche.email === ''){
        setAlertEmail('Inserisci una mail valida')
        checkMail = false
    } else {
        setAlertEmail('')
        checkMail = true
    }
    
    if(!validPassword.test(modifiche.password) || modifiche.password === ''){
      setAlertPassword('Inserisci una password valida')
      checkPassword = false
    } else {
      setAlertPassword('')
      checkPassword = true
    }
    if(checkUsername && checkMail && checkPassword){
      updateUtente(modifiche, setUtente, dispatch, history)
      console.log('Modifiche salvate:', modifiche);
      setModifica(false);
    } else {
      return
    }
   
  };


  return (
    <>


      <div style={{ backgroundColor: "#075E54", position: "fixed", bottom: "0px", top: "0px", width: "400px", marginLeft: "92px" }}>
        <h2 style={{ color: 'white', fontFamily: 'Fonseca, sans-serif', textAlign: 'center', marginLeft: '20px', marginBottom: '0px' }}><b>AREA PERSONALE</b></h2>
        <br />
        <br />
        <label style={{ color: '#EBE4DC', fontFamily: 'sans-serif'}}>
          <b>Username:</b>
          {modifica ? (
            <input
            style={{marginTop:"10px"}}
              type='text'
              value={modifiche.username}
              onChange={(e) => gestisciModifiche('username', e.target.value)}
            />
          ) : (
            <span>{utente.username}</span>
          )}
        </label>
        <br />
        {(alertUsername) && <div style={{color: 'red'}}> {alertUsername} </div>}
        <br />
        <label style={{ color: '#EBE4DC', fontFamily: 'sans-serif' }}>
          <b>Email:</b>
          {modifica ? (
            <input
            style={{marginTop:"10px"}}
              type='email'
              value={modifiche.email}
              onChange={(e) => gestisciModifiche('email', e.target.value)}
            />
          ) : (
            <span>{utente.email}</span>
          )}
        </label>
        <br />
        {(alertEmail) && <div style={{color: 'red'}}> {alertEmail} </div>}
        <br />
        <label style={{ color: '#EBE4DC', fontFamily: 'sans-serif' }}>
          <b>Password:</b>
          {modifica ? (
            <input
            style={{marginTop:"10px"}}
              type='password'
              value={modifiche.password}
              onChange={(e) => gestisciModifiche('password', e.target.value)}
            />
          ) : (
            <span>********</span>
          )}
        </label>
        <br />
        {(alertPassword) && <div style={{color: 'red'}}> {alertPassword} </div>}
        <br />
        <label style={{ color: '#EBE4DC', fontFamily: 'sans-serif' }}>
          <b>Foto:</b>
          <br />
          <br />
          {modifica ? (
            <input
              type='file'

              onChange={(e) => handleFileChange(e)}
            />
          ) : (
            <img src={`data:image/png;base64,${utente.fotoConvertita}`} style={{ width: '150px', height: '150px', borderRadius: '50%', textAlign: 'center', borderWidth: '2px solid white' }} />
          )}
        </label>
        <br />
        <br />
        <label style={{ color: '#EBE4DC', fontFamily: 'sans-serif' }}>
          <b>Info:</b>
          <br />
          <br />
          {modifica ? (<textarea type='text' style={{ width: '250px', height: '100px' }} value={modifiche.info} onChange={(e) => gestisciModifiche('info', e.target.value)} />
          ) : (
            <span>{(utente.info ? utente.info : 'NESSUNA INFO')}</span>
          )}
        </label>
        <br />
        <div>
          {modifica ? (
            <button
              className='buttonForRegisterPage'
              type='button'
              onClick={() => salvaModifiche()}
            >
              Salva Modifiche
            </button>
          ) : (
            <button
              className='buttonForRegisterPage'
              type='button'
              onClick={() => abilitaModifica()}
            >
              Modifica
            </button>


          )}
        </div>
        <br /><br />
        {(alertMessage) && <div style={{ color: 'red' }}> {alertMessage} </div>}
      </div>
    </>
  );
}

export default ProfiloPersonale;
