import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../custom/ListaChatPage.css'
import { formattaData } from '../utility/Utils';
import { setChat } from '../store/slice/chatSlice';
import { findChatForUtente, insertChatAndSendMessage, sendMessage } from '../service/messaggioService';
import { findAllMessageForChat } from '../service/chatService';

function ListChatPage() {

    const chat = useSelector((state) => state.chat);
    const utente = useSelector((state) => state.utente);
    const [listaChat, setListaChat] = useState([]);
    const [listaMessaggiDellaChat, setListaMessaggiDellaChat] = useState([]);
    const [contenutoMessaggio, setContenutoMessaggio] = useState('');
    const [aggiornamento, setAggiornamento] = useState(false)
    const [chatAppoggio, setChatAppoggio] = useState()
    const dispatch = useDispatch('');

    useEffect(() => {

        findChatForUtente(utente, setListaChat);
        
        if (chat.idChat) {
            findAllMessageForChat(chat, setListaMessaggiDellaChat);
           
        }
    }, [chat, aggiornamento])

    function handleChatPage(messaggio) {
        let destinatarioChat = '';
        if (messaggio.destinatario !== undefined) {
            ((messaggio.destinatario.idUtente === utente.idUtente) ? destinatarioChat = messaggio.mittente : destinatarioChat = messaggio.destinatario)
        } else {
            destinatarioChat = messaggio.gruppo
        }

        const chatForSet = {
            idChat: messaggio.idChat,
            tipoChatId: messaggio.tipoChatId,
            destinatario: destinatarioChat
        }

        dispatch(setChat(chatForSet));
        setAggiornamento(!aggiornamento)
    }





    function inviaMessaggio(contenuto) {
        
        if (contenuto && contenuto !== '' && contenuto !== undefined) {
            console.log('qui')
            if (!chat.idChat) {
                insertChatAndSendMessage(chat, inviaMessaggioSequenziale, contenuto,setAggiornamento, aggiornamento, setContenutoMessaggio )

                dispatch(setChat(chatAppoggio))
                
            }
            if (chat.idChat) {
                inviaMessaggioSequenziale(contenuto, chat, chat, setAggiornamento, aggiornamento, setContenutoMessaggio)
            }

        } else {
            return;
        }

    }

    function inviaMessaggioSequenziale(contenuto, chat, response, setAggiornamento, aggiornamento, setContenutoMessaggio) {
        if (chat.destinatario.amministratoreGruppo) {

            const gruppoDaInviare = {
                amministratore: chat.destinatario.amministratoreGrupppo,
                nomeGruppo: chat.destinatario.username,
                infoGruppo: chat.destinatario.info,
                idGruppo: chat.destinatario.idUtente,
                foto: chat.destinatario.fotoConvertita
            }
            const messaggio = {
                mittente: utente,
                dataOra: new Date(),
                contenutoMessaggio: contenuto,
                chat: response,
                gruppo: gruppoDaInviare
            };
            sendMessage(messaggio);
            setContenutoMessaggio('');
            setAggiornamento(!aggiornamento)

        } else if (!chat.destinatario.amministratoreGruppo) {

            const messaggio = {
                mittente: utente,
                dataOra: new Date(),
                contenutoMessaggio: contenuto,
                chat: response,
                destinatario: chat.destinatario
            };
            sendMessage(messaggio);
            setContenutoMessaggio('');
            setAggiornamento(!aggiornamento)
        }

    }

    return (
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
                            <tr key={messaggio.idChat} onClick={() => { handleChatPage(messaggio) }}>
                                <th>
                                    <div className="containerChat">
                                        <img
                                            src={(messaggio.tipoChatId === 1) ? (messaggio.destinatario.username !== utente.username)
                                                ? `data:image/png;base64,${messaggio.destinatario.fotoConvertita}`
                                                : `data:image/png;base64,${messaggio.mittente.fotoConvertita}`
                                                : `data:image/png;base64,${messaggio.gruppo.fotoConvertita}`}
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

                                            <b>
                                                {
                                                    // Se è una chat individuale
                                                    messaggio.tipoChatId === 1
                                                        ? (
                                                            // Se il destinatario è l'utente corrente, mostra il nome del mittente, altrimenti mostra il nome del destinatario
                                                            (messaggio.destinatario.idUtente === utente.idUtente)
                                                                ? messaggio.mittente.username
                                                                : messaggio.destinatario.username
                                                        )
                                                        // Se è una chat di gruppo, mostra il nome del gruppo
                                                        : messaggio.gruppo.username
                                                }
                                            </b>
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
                                            {messaggio.contenutoMessaggio.length > 20 ? messaggio.contenutoMessaggio.substring(0, 20) + '...' : messaggio.contenutoMessaggio}
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


            <div className='containerChatPage'>



                {(listaMessaggiDellaChat && chat.destinatario.amministratoreGruppo === undefined && Object.keys(listaMessaggiDellaChat).length > 0) && (
                    listaMessaggiDellaChat.map((messaggio) => (
                        <div key={messaggio.idMessaggio} className='containerMessaggio'>
                            <div className='profiloContatto'>
                                <img
                                    src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                                    {' '}
                                    {chat.destinatario.username}{' '}
                                </span>
                            </div>
                            <div className={messaggio.mittente.idUtente === utente.idUtente ? 'messaggio-mittente' : 'messaggio-destinatario'} >
                                <span>{messaggio.contenutoMessaggio}</span>
                                <br />
                                <span
                                    style={{
                                        textAlign: 'right',
                                        justifyContent: 'right',
                                        display: 'flex',
                                        marginLeft: '60px',
                                        fontSize: '12px',
                                        color: 'gray',
                                    }}
                                >
                                    {formattaData(messaggio.dataOra)}
                                </span>
                            </div>
                        </div>
                    ))
                )}

                {(listaMessaggiDellaChat && chat.destinatario.amministratoreGruppo !== undefined && Object.keys(listaMessaggiDellaChat).length > 0) && (
                    listaMessaggiDellaChat.map((messaggio) => (
                        <div key={messaggio.idMessaggio} className='containerMessaggio'>
                            <div className='profiloContatto'>
                                <img
                                    src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                                    {' '}
                                    {chat.destinatario.username}{' '}
                                </span>
                            </div>
                            <div className={messaggio.mittente.idUtente === utente.idUtente ? 'messaggio-mittente' : 'messaggio-destinatario'} >
                                <span>{messaggio.contenutoMessaggio}</span>
                                <br />
                                <span
                                    style={{
                                        textAlign: 'right',
                                        justifyContent: 'right',
                                        marginLeft: '110px',
                                        fontSize: '12px',
                                        color: 'gray',
                                    }}
                                >
                                    {formattaData(messaggio.dataOra)}
                                </span>
                            </div>
                        </div>
                    ))
                )}


                {(chat.destinatario && Object.keys(listaMessaggiDellaChat).length === 0) &&
                    <div className='containerMessaggio'>
                        <div className='profiloContatto'>
                            <img src={`data:image/png;base64,${chat.destinatario.fotoConvertita}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />

                            <span style={{ fontFamily: 'Fonseca, sans-serif', color: 'black' }}>
                                {' '}
                                {chat.destinatario.username && <>{chat.destinatario.username}</>}{' '}

                            </span>






                        </div>
                    </div>}



                <div className='pannelloChat'>
                    <input
                        type='text'
                        placeholder='Scrivi un messaggio'
                        value={contenutoMessaggio}
                        onChange={(e) => setContenutoMessaggio(e.target.value)}
                    />
                    <button
                        style={{ backgroundColor: 'transparent', border: '0px', marginBottom: '27px' }}
                        onClick={() => {
                            inviaMessaggio(contenutoMessaggio)
                        }
                        }
                    >
                        <i className='fa-solid fa-paper-plane fa-2x'></i>
                    </button>
                </div>
            </div>

        </>





    )
}

export default ListChatPage