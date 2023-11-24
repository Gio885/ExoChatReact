import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUtente } from '../store/slice/utenteSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateUtente } from '../service/utenteService';



function ProfiloPersonale() {

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



  const abilitaModifica = () => {
    setModifica(true);
  };

  function gestisciModifiche(campo, valore) {
    setModifiche((prevModifiche) => ({
      ...prevModifiche,
      [campo]: valore,
    }));
  };

  const handleFileChange = (event) => {
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
    if (
      modifiche.username.trim() === '' ||
      modifiche.email.trim() === '' ||
      modifiche.password.trim() === ''
    ) {
      setAlertMessage('Compila tutti i campi obbligatori.');
      return;
    } else if(!validEmail.test(modifiche.email)){
        setAlertEmail('Inserisci una mail valida')
        return;
    } else if(!validPassword.test(modifiche.password)){
      setAlertPassword('Inserisci una password valida')
      return;
    }

    updateUtente(modifiche, setUtente, dispatch, history)
    console.log('Modifiche salvate:', modifiche);
    setModifica(false);
  };


  return (
    <>


      <div className='containerTableLista'>
        <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>AREA PERSONALE</b></h1>
        <br />
        <br />
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Username:</b>
          {modifica ? (
            <input
              type='text'
              value={modifiche.username}
              onChange={(e) => gestisciModifiche('username', e.target.value)}
            />
          ) : (
            <span>{utente.username}</span>
          )}
        </label>
        <br />
        <br />
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Email:</b>
          {modifica ? (
            <input
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
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Password:</b>
          {modifica ? (
            <input
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
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Foto:</b>
          <br />
          <br />
          {modifica ? (
            <input
              type='file'

              onChange={handleFileChange}
            />
          ) : (
            <img src={`data:image/png;base64,${utente.fotoConvertita}`} style={{ width: '150px', height: '150px', borderRadius: '50%', textAlign: 'center', borderWidth: '2px solid white' }} />
          )}
        </label>
        <br />
        <br />
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
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
              onClick={salvaModifiche}
            >
              Salva Modifiche
            </button>
          ) : (
            <button
              className='buttonForRegisterPage'
              type='button'
              onClick={abilitaModifica}
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
