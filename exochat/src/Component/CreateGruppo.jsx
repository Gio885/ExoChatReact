import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createGruppo, findAllContattiPerGruppo, findAllUtente } from '../service/utenteService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../custom/CreateGruppo.css'

function CreateGruppo() {
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
    } else {

    }
  }

  return (
    <div className='containerCreateGruppo'>
      <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>NUOVO GRUPPO</b></h1>
      <br /><br />
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Nome Gruppo:</b>
        <input
          type='text'
          placeholder='Inserisci nome Gruppo'
          style={{ textAlign: 'center' }}
          value={gruppo.nomeGruppo}
          onChange={(e) => setGruppo((prevGruppo) => ({ ...prevGruppo, username: e.target.value }))}
        />
      </label>
      {(alertNomeGruppo && <div style={{ color: 'red' }}> {alertNomeGruppo} </div>)}
      <br />
      <br />
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Info Gruppo:</b>
        <input
          type='email'
          placeholder='Inserisci le info Gruppo'
          style={{ textAlign: 'center' }}
          value={gruppo.infoGruppo}
          onChange={(e) => setGruppo((prevGruppo) => ({ ...prevGruppo, info: e.target.value }))}
        />
      </label>
      {(alertInfoGruppo && <div style={{ color: 'red' }}> {alertInfoGruppo} </div>)}
      <br />
      <br />
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Foto Gruppo:</b>
        <input
          type='file'
          style={{ textAlign: 'center' }}
          onChange={handleFileChange}
        />
      </label>
      <br />
      <br />
      <label style={{ color: 'black', fontFamily: 'sans-serif' }}>
        <b>Utenti nel Gruppo:</b>
        <ul>
          {utenti
            .filter((utenteLista) => utenteLista.idUtente !== utente.idUtente)
            .map((utenteLista) => (
              <li key={utenteLista.idUtente}>
                <label>
                  <input
                    type='checkbox'
                    checked={utentiSelezionati.includes(utenteLista.idUtente)}
                    onChange={() => {
                      const updatedUtentiSelezionati = utentiSelezionati.includes(utenteLista.idUtente)
                        ? utentiSelezionati.filter((id) => id !== utenteLista.idUtente)
                        : [...utentiSelezionati, utenteLista.idUtente];

                      setUtentiSelezionati(updatedUtentiSelezionati);
                    }}
                  />
                  {utenteLista.username}
                </label>
              </li>
            ))}
        </ul>
      </label>
      {(alertUtentiGruppo && <div style={{ color: 'red' }}> {alertUtentiGruppo} </div>)}
      <div>
        <button className='buttonForRegisterPage' type='button' onClick={() => creaUnGruppo()}>
          Crea Gruppo
        </button>
      </div>
    </div>
  );
}

export default CreateGruppo;
