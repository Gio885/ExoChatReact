import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUtente } from '../store/slice/utenteSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateUtente } from '../service/utenteService';

function ProfiloPersonale() {
  const utente = useSelector((state) => state.utente);
  const [modifica, setModifica] = useState(false);
  const [modifiche, setModifiche] = useState({
    username: utente.username,
    email: utente.email,
    password: '', // Aggiungi lo stato per la password se è necessario
    foto: utente.foto,
    info: utente.info,
  });
  const dispatch = useDispatch()
  const history = useHistory()

  const abilitaModifica = () => {
    setModifica(true);
  };

  function gestisciModifiche(campo, valore) {
    setModifiche((prevModifiche) => ({
      ...prevModifiche,
      [campo]: valore,
    }));
  };

  function salvaModifiche() {
    if (
      modifiche.username.trim() === '' ||
      modifiche.email.trim() === '' ||
      modifiche.password.trim() === ''
    ) {
      console.error('Compila tutti i campi obbligatori.');
      return;
    }
    updateUtente(utente, setUtente, dispatch, history)
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
        <br />
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Foto:</b>
          <br />
          <br />
          {modifica ? (
            <input
              type='file'
              value={modifiche.foto}
              onChange={(e) => gestisciModifiche('foto', e.target.value)}
            />
          ) : (
            <img src={`data:image/png;base64,${utente.fotoConvertita}`} style={{ width: '50px', height: '50px', borderRadius: '50%', textAlign: 'center' }} />
          )}
        </label>
        <br />
        <br />
        <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
          <b>Info:</b>
          <br />
          <br />
          {modifica ? (<textarea value={modifiche.info} onChange={(e) => gestisciModifiche('info', e.target.value)} />
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
      </div>
    </>
  );
}

export default ProfiloPersonale;
