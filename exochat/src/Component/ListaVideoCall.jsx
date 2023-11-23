import React from 'react'
import { findAllVideoChat } from '../service/videoChatService';

function ListaVideoCall() {

  const utente = useSelector((state) => state.utente);
  const [listaVideoChat, setListaVideoChat] = useState([]);
  

  useEffect(() => {
    findAllVideoChat(utente, setListaVideoChat)
  }, []);

  

  return (
    <>
      {utente.idUtente && Object.keys(utente).length > 0 ? (
        <>
          <div className='containerTableLista'>
            <h1 style={{ color: 'black', fontFamily: 'Fonseca, sans-serif', textAlign: 'left', marginLeft: '20px', marginBottom: '0px' }}><b>ELENCO CHAT</b></h1>
            <div className='searchBar'>
              <input
                type='text'
                placeholder='Cerca per nome...'
              />
              <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i className="fa-solid fa-magnifying-glass fa-2x"></i></button>
            </div>
            <table className='tableListaChat'>
              <thead>
                {listaChat && listaChat.map((messaggio) => (
                  <tr key={messaggio.idChat} onClick={() => {handleChatPage(messaggio.idChat,messaggio.tipoChatId); dispatch(setDestinatario((messaggio.destinatario.idUtente === utente.idUtente) ? messaggio.mittente : messaggio.destinatario))}}>
                    <th>
                      <div className="containerChat">
                        <img
                          src={(messaggio.destinatario.username !== utente.username)
                            ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                            : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                          }
                          style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px 0 0 -290px' }}
                        />
                        <span
                          style={{
                            textAlign: 'left',
                            color: 'black',
                            display: 'flex',
                            marginTop: '-50px',
                            marginLeft: '60px',
                            fontSize: '20px',
                          }}
                        >
                          <b>{(messaggio.destinatario.idUtente === utente.idUtente) ? messaggio.mittente.username : messaggio.destinatario.username}</b>
                        </span>
                        <span
                          style={{
                            color: 'black',
                            textAlign: 'left',
                            justifyContent: 'left',
                            display: 'flex',
                            marginLeft: '60px',
                            fontWeight: 'normal',
                          }}
                        >
                          {messaggio.contenutoMessaggio}
                        </span>
                        <br />
                        <span
                          style={{
                            textAlign: 'right',
                            justifyContent: 'right',
                            marginLeft: '160px',
                            marginTop: '-15px',
                            marginBottom: '15px',
                            fontSize: '12px',
                            color: 'gray',
                            display: 'block',
                          }}
                        >
                          {formattaData(messaggio.dataOra)}
                        </span>
                      </div>
                    </th>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ListaVideoCall;