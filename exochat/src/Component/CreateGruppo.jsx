import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createGruppo, findAllUtente } from '../service/utenteService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CreateGruppo() {
  const utente = useSelector((state) => state.utente);
  const history = useHistory();
  const [utenti, setUtenti] = useState([]);
  const [gruppo, setGruppo] = useState({
    nomeGruppo: '',
    amministratoreGruppo: utente,
    foto: null,
    infoGruppo: ''
  });

  const [utentiSelezionati, setUtentiSelezionati] = useState([]);

  useEffect(() => {
    findAllUtente(utente, setUtenti);
  }, []);

  function creaUnGruppo() {
    if (utentiSelezionati.length > 0) {
      console.log(utentiSelezionati)
      createGruppo(gruppo, history, utentiSelezionati, setUtentiSelezionati);
    } else {
      console.log('Seleziona almeno un utente per creare il gruppo.');
    }
  }

  return (
    <div className='containerTableLista'>
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Nome Gruppo:</b>
        <input
          type='text'
          placeholder='Inserisci nome Gruppo'
          style={{ textAlign: 'center' }}
          value={gruppo.nomeGruppo}
          onChange={(e) => setGruppo({ ...gruppo, nomeGruppo: e.target.value })}
        />
      </label>
      <br />
      <br />
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Info Gruppo:</b>
        <input
          type='email'
          placeholder='Inserisci le info'
          style={{ textAlign: 'center' }}
          value={gruppo.info}
          onChange={(e) => setGruppo({ ...gruppo, info: e.target.value })}
        />
      </label>
      <br />
      <br />
      <label style={{ color: ' black', fontFamily: 'sans-serif' }}>
        <b>Foto Gruppo:</b>
        <input
          type='file'
          style={{ textAlign: 'center' }}
          onChange={(e) => setGruppo({ ...gruppo, foto: e.target.files[0] })}
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
                      // Aggiorna la lista degli utenti selezionati
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
      <div>
        <button className='buttonForRegisterPage' type='button' onClick={() => creaUnGruppo()}>
          Crea Gruppo
        </button>
      </div>
    </div>
  );
}

export default CreateGruppo;
