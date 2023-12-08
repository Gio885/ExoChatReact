import React, { useEffect, useRef, useState } from 'react'
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
    const [contenutoMessaggio, setContenutoMessaggio] = useState();
    const [aggiornamento, setAggiornamento] = useState(false)
    const [utenteRicercato, setUtenteRicercato] = useState('')
    const [file, setFile] = useState()
    const dispatch = useDispatch('');
    const fileInputRef = useRef();


    useEffect(() => {

        findChatForUtente(utente, setListaChat);
        console.log(listaChat)
        if (chat.idChat) {
            findAllMessageForChat(chat, setListaMessaggiDellaChat);
        }
    }, [aggiornamento])

    const handleClick = () => {
        fileInputRef.current.click();
    };

    function convertToBase64(file, callback) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const base64String = e.target.result.split(',')[1];
            callback(base64String);
        };

        reader.readAsDataURL(file);
    }


    const handleFileChange = (event) => {

        const fileSelezionato = event.target.files[0]
        console.log("fileselezionato",fileSelezionato)
        if (fileSelezionato) {
            convertToBase64(fileSelezionato, (base64String) => {
                setFile(base64String)
            });
            
        }


        //console.log('File selezionato:', fileSelezionato);
        console.log('File selezionato:', file);

        // return fileSelezionato;
    };


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
        setFile(null)
        dispatch(setChat(chatForSet));
        setAggiornamento(!aggiornamento) 
    }

    function inviaMessaggio(contenuto) {

        if (contenuto && contenuto !== '' && contenuto !== undefined) {
            console.log('qui')
            if (!chat.idChat) {
                insertChatAndSendMessage(chat, setChat, dispatch, inviaMessaggioSequenziale, contenuto, setAggiornamento, aggiornamento, setContenutoMessaggio)
                console.log('insertchat')
            }
            if (chat.idChat) {
                inviaMessaggioSequenziale(contenuto, file, chat, chat, setAggiornamento, aggiornamento, setContenutoMessaggio)
                console.log('sendmessage')
            }

        } else {
            return;
        }

    }

    function inviaMessaggioSequenziale(contenuto, file, chat, response, setAggiornamento, aggiornamento, setContenutoMessaggio) {
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
                file: file,
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
                file: file,
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
                        onChange={(e) => { setUtenteRicercato(e.target.value) }}
                    />
                    <button style={{ backgroundColor: "transparent", border: '0px', marginBottom: '27px' }}><i className="fa-solid fa-magnifying-glass fa-2x"></i></button>
                </div>
                <table className='tableListaChat'>
                    <thead>
                        {(listaChat) && listaChat.filter(utenteRicercato !== ''
                            ? (chat) => chat.destinatario.username.includes(utenteRicercato)
                            : () => true
                        ).map((chat) => (
                            <tr key={chat.idChat} onClick={() => { handleChatPage(chat) }}>
                                <th>
                                    <div className="containerChat">
                                        <img
                                            src={(chat.tipoChatId === 1) ? (chat.destinatario.username !== utente.username)
                                                ? `data:image/png;base64,${chat.destinatario.fotoConvertita}`
                                                : `data:image/png;base64,${chat.mittente.fotoConvertita}`
                                                : `data:image/png;base64,${chat.gruppo.fotoConvertita}`}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px 0 0 -290px' }}
                                        />
                                        <span
                                            style={{ textAlign: 'left', color: 'black', display: 'flex', marginTop: '-50px', marginLeft: '60px', fontSize: '20px' }}>

                                            <b>
                                                {chat.tipoChatId === 1
                                                    ? ((chat.destinatario.idUtente === utente.idUtente)
                                                        ? chat.mittente.username
                                                        : chat.destinatario.username
                                                    )
                                                    : chat.gruppo.username}
                                            </b>
                                        </span>
                                        <span
                                            style={{ color: 'black', textAlign: 'left', justifyContent: 'left', display: 'flex', marginLeft: '60px', fontWeight: 'normal' }}>
                                            {chat.contenutoMessaggio.length > 20 ? chat.contenutoMessaggio.substring(0, 20) + '...' : chat.contenutoMessaggio}
                                        </span>
                                        <br />
                                        <span
                                            style={{ textAlign: 'right', justifyContent: 'right', marginLeft: '160px', marginTop: '-15px', marginBottom: '15px', fontSize: '12px', color: 'gray', display: 'block' }}
                                        >
                                            {formattaData(chat.dataOra)} 
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
                                <span style={{ textAlign: 'right', justifyContent: 'right', display: 'flex', marginLeft: '60px', fontSize: '12px', color: 'gray' }}
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
                        onClick={() => { inviaMessaggio(contenutoMessaggio) }}>
                        <i className='fa-solid fa-paper-plane fa-2x'></i>
                    </button>
                    <div>
                        <label className="custom-file-icon" onClick={handleClick}>
                            {file ? <>
                                <i className="fa-regular fa-circle-check fa-xl" style={{ color: 'green' }}></i>
                            </> : <>
                                <i className="fa-solid fa-file-import fa-xl" style={{ color: '#050505' }}></i>
                            </>}

                        </label>


                        <input type="file" id="fileInput" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

                    </div>
                    <div>


                    </div>


                </div>
            </div>

        </>
    )
}

export default ListChatPage