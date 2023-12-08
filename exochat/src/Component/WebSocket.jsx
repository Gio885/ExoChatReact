import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { resetChat, setChat, setDestinatario, setGruppo, setIdChat, setMittente, setTipoChatId } from '../store/slice/chatSlice';
import { formattaData } from '../utility/Utils';

const WebSocketComponent = () => {

    const utente = useSelector((state) => state.utente)
    const chat = useSelector((state) => state.chat)
    const [listaMessaggi, setListaMessaggi] = useState([]);
    const [nuovoMessaggio, setNuovoMessaggio] = useState('');
    const [nuovaChat, setNuovaChat] = useState(false)
    const [socket, setSocket] = useState(null);
    const [listaChat, setListaChat] = useState();
    const dispatch = useDispatch();
    const scrollAutomatico = useRef(null);




    // async function getData(){
    //     console.log("entra")
    //     await axios.post('http://' + window.location.hostname + ':8080/ExoChatWeb/rest/messaggioRest/listaUltimiMessaggiPerChat', utente).then((response) => {
    //        setListaChat(response.data.data)
    //     })
    // }


    const scrollToBottom = () => {
        if (scrollAutomatico.current) {
            scrollAutomatico.current.scrollTop = scrollAutomatico.current.scrollHeight;
        }
      };


    useEffect(() => {
        console.log("secondo use effect")
        axios.post('http://' + window.location.hostname + ':8080/ExoChatWeb/rest/messaggioRest/listaUltimiMessaggiPerChat', utente).then((response) => {
            setListaChat(response.data.data)
            console.log(socket)
        })
        scrollToBottom()

    }, [listaMessaggi])

    useEffect(() => {
        inviaMessaggio()
      }, [nuovaChat]);

      useEffect(() => {

        return () => {
            dispatch(resetChat())
            console.log("smontaggio vero")
            };
      }, []);


    useEffect(() => {
        console.log(chat, "------------------use effect aggiornamento");

        if (chat.idChat) {

            const ws = new WebSocket('ws://' + window.location.hostname + ':8080/ExoChatWeb/webSocket/' + chat.idChat);
            console.log('ws://' + window.location.hostname + ':8080/ExoChatWeb/webSocket/' + chat.idChat);

            ws.onopen = () => {
                setSocket(ws);

                let chatBackEnd = {
                    idChat: chat.idChat,
                    tipoChatId: chat.tipoChatId
                };
                axios.post('http://' + window.location.hostname + ':8080/ExoChatWeb/rest/messaggioRest/listaMessaggiPerChat', chatBackEnd).then((response) => {
                    if (response.status === 200) {
                        const messaggi = response.data.map((messaggio) => messaggio.contenutoMessaggio);
                        setListaMessaggi(response.data);
                    } else if (response.status === 204) {
                        console.log(response.data);
                    }
                });
            };
            ws.onmessage = (event) => {
                const nuovoMessaggio = JSON.parse(event.data);    //NON HO CAPITO PERCHE TORNA L'OGGETTO COMPLETO E NON LA STRINGA DI UN MESSAGGIO
                setListaMessaggi(prevMessaggi => [...prevMessaggi, nuovoMessaggio]);
            };
            return () => {
            const wsUrlParts = ws.url.split('/');
            const lastPart = wsUrlParts[wsUrlParts.length - 1];
            if (lastPart.endsWith(chat.idChat)) {
                console.log("smontaggio " + ws);
                ws.close();
            }
            };
        }

        console.log("terzo use effect");
    }, [chat.idChat]);

    function inviaMessaggio() {
        console.log("dentro invia messaggi")
        if (chat.idChat == null) {
            console.log("nuovachat")
            let chatPerBackEnd = {
                tipoChatId: chat.tipoChatId
            }
            axios.post('http://' + window.location.hostname + ':8080/ExoChatWeb/rest/chatRest/insertChat', chatPerBackEnd).then((response) => {
                setNuovaChat(true)
                dispatch(setIdChat(response.data.idChat))
                
            })
        }
        console.log(nuovoMessaggio, "-------------------------------------------------------------------")
        if (socket && nuovoMessaggio) {
            console.log("dopo nuova chat dentro messaggio")
            const messaggioDaInserire = {
                mittente: utente,
                contenutoMessaggio: nuovoMessaggio,
                dataOra: new Date(),
                idChat: chat.idChat,
                tipoChatId: chat.tipoChatId
            }
            if (messaggioDaInserire.tipoChatId == 1) {
                messaggioDaInserire.destinatario = chat.destinatario;
            } else if (messaggioDaInserire.tipoChatId == 2) {
                messaggioDaInserire.gruppo = chat.gruppo;
            }
            console.log(messaggioDaInserire)
            socket.send(JSON.stringify(messaggioDaInserire))
            console.log(nuovoMessaggio)
            // socket.send(nuovoMessaggio);
            setNuovoMessaggio('');
        }
    }

    const selezioneChat = (chat) => {
        console.log("selezione chat")
        dispatch(resetChat())
        dispatch(setIdChat(chat.idChat))
        dispatch(setTipoChatId(chat.tipoChatId))
        if (chat.tipoChatId == 1) {
            if (chat.mittente.idUtente == utente.idUtente) {
                dispatch(setDestinatario(chat.destinatario))
            } else {
                dispatch(setDestinatario(chat.mittente))
            }
        } else if (chat.tipoChatId == 2) {
            dispatch(setGruppo(chat.gruppo))
        }
    }


    return (
        <>  
            <div style={{ backgroundColor: "#075E54", position: "fixed", bottom: "0px", top: "0px", width: "400px", marginLeft: "92px", justifyContent: "center", alignItems: "center", display: "grid" }}>
                <h2 style={{ color: "white", position: "relative", top: "0px", left: "10px", fontWeight: "bold", fontFamily: 'Fonseca, sans-serif', }}>CHAT</h2>
                <div style={{ backgroundColor: "transparent", height: "830px",flexDirection: "column", justifyContent: "center", marginBottom: "60px", position: "static" }}>
                    <div className='scrollNone' style={{ backgroundColor: (listaChat && Object.keys(listaChat).length > 0) ? "white" : "transparent" , padding: "10px", height: "auto",maxHeight:"830px", width: "340px", borderRadius: "20px", overflowY: "auto", scrollbarWidth: "none",scrollBehavior: "smooth", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {(listaChat) && listaChat.map((chat) => (
                            (chat.tipoChatId == 1 ?
                                <>{/*MESSAGGI SINGOLI */}
                                    <div style={{ width: "320px", minHeight: "90px", marginTop: "10px", backgroundColor: "#25D366", color: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }} key={chat.idChat}>
                                        <img style={{ position: "relative", left: "-10px", width: '40px', height: '40px', borderRadius: '50%' }} src={chat.mittente.idUtente == utente.idUtente ? `data:image/png;base64,${chat.destinatario.fotoConvertita}` : `data:image/png;base64,${chat.mittente.fotoConvertita}`} />
                                        <div style={{ position: "static", display: "flex", flexDirection: "column",backgroundColor:"transparent" }}>
                                            <span style={{ position: "relative", top: "-5px", fontWeight: "bold", fontSize: "20px", width: "200px", textAlign: "left", backgroundColor: "transparent", color: "black" }}>{chat.mittente.idUtente == utente.idUtente ? chat.destinatario.username : chat.mittente.username}</span>
                                            <div style={{backgroundColor:"white",height:"45px",display:"flex",flexDirection:"column",borderRadius: "10px",}}>
                                            <span style={{ position: "relative", top:"5px", width: "200px",margin:"0 0 0 0", textAlign: "left", display: "flex", alignItems: "center", paddingLeft: "5px", color: "black" }}>{chat.contenutoMessaggio.length > 20 ? chat.contenutoMessaggio.substring(0, 20) + " ..." : chat.contenutoMessaggio}                                            </span>
                                            <span style={{ position: "relative",display:"inline-block",left:"45px",top:"10px",color: "black",fontWeight:"bold",fontSize:"15px" }}>{formattaData(chat.dataOra)}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => { selezioneChat(chat) }} style={{ position: "relative", left: "10px", backgroundColor: "transparent", border: '0px', marginTop: "10px" }}
                                         onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
                                         onMouseOut={(e) => { e.currentTarget.style.color = 'black' }}
                                        ><i className="fa-solid fa-message fa-2x" style={{ color: '#050505',cursor:"pointer"}}></i></button>
                                    </div>
                                </> :
                                <> {/*MESSAGGI DI GRUPPO */}
                                    <div style={{ width: "320px", minHeight: "90px", backgroundColor: "#25D366", marginTop: "10px", color: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }} key={chat.idChat}>
                                        <img style={{ position: "relative", left: "-10px", width: '40px', height: '40px', borderRadius: '50%' }} src={`data:image/png;base64,${chat.gruppo.fotoConvertita}`} />
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ width: "200px", top: "-5px", fontWeight: "bold", fontSize: "20px", textAlign: "left", backgroundColor: "transparent", color: "black" }}>{chat.gruppo.username}</span>
                                            <div style={{backgroundColor:"white",height:"45px",display:"flex",flexDirection:"column",borderRadius: "10px",}}>
                                            <span style={{ position: "relative", top:"5px", width: "200px",margin:"0 0 0 0", textAlign: "left", display: "flex", alignItems: "center", paddingLeft: "5px", color: "black" }}>{chat.contenutoMessaggio.length > 20 ? chat.contenutoMessaggio.substring(0, 20) + " ..." : chat.contenutoMessaggio}                                            </span>
                                            <span style={{ position: "relative",display:"inline-block",left:"45px",top:"10px",color: "black",fontWeight:"bold",fontSize:"15px" }}>{formattaData(chat.dataOra)}</span>
                                            </div>                                        </div>
                                        <button onClick={() => { selezioneChat(chat) }} style={{ position: "relative", left: "10px", backgroundColor: "transparent", border: '0px', marginTop: "10px" }}><i className="fa-solid fa-message fa-2x" style={{ color: '#050505',cursor:"pointer" }}
                                         onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
                                         onMouseOut={(e) => { e.currentTarget.style.color = 'black' }}
                                        ></i></button>
                                    </div>
                                </>)
                        )
                        )}
                    </div>
                </div>
            </div>
            {(chat.tipoChatId != "") &&
                <div style={{ position: "fixed", top: "100px", width: "1030px", left: "650px", backgroundColor: "#075E54", border: "3px solid white", minHeight: "700px", borderRadius: "20px" }}>
                    <div style={{ backgroundColor: "#25D366", position: "relative", height: "60px", top: "2px", borderRadius: "20px", display: "flex", flexDirection: "row", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                        <img src={(chat.tipoChatId == 1) ? `data:image/png;base64,${chat.destinatario.fotoConvertita}` : `data:image/png;base64,${chat.gruppo.fotoConvertita}`}
                            style={{ width: '40px', position: "absolute", left: "10px", height: '40px', borderRadius: '50%' }} />
                        <h3 style={{ color: "black" }}> {chat.tipoChatId == 1 ? <> {chat.destinatario.username}</> : <>{chat.gruppo.username}</>} </h3>
                    </div>
                    <div className='scrollNone' ref={scrollAutomatico}   style={{ position: "relative", bottom: "0px", padding: "10px", backgroundColor: "white", margin: "20px 50px 10px 50px", borderRadius: "20px", maxHeight: "500px", minHeight: "500px", overflowY: "auto", scrollbarWidth: "none",scrollBehavior: "smooth" }}>
                        {listaMessaggi && listaMessaggi.map((messaggio) => (
                            <div key={messaggio.idMessaggio} className='containerMessaggio' style={{ position: "static" }}>
                                <div style={{ backgroundColor: "transparent", position: "relative" }}>
                                    <img src={(chat.tipoChatId == 2 && messaggio.mittente.idUtente != utente.idUtente) ? `data:image/png;base64,${messaggio.mittente.fotoConvertita}` : ""} style={{ width: '30px', position: "absolute", bottom: "0px", left: "-7px", height: '30px', borderRadius: '50%', display: (chat.tipoChatId === 2 && messaggio.mittente.idUtente !== utente.idUtente) ? "inline-block" : "none" }} />
                                    <div className={messaggio.mittente.idUtente === utente.idUtente ? 'messaggio-mittente' : 'messaggio-destinatario'} >
                                        <span>{messaggio.contenutoMessaggio}</span>
                                        <br />
                                        <span style={{ textAlign: 'right', justifyContent: 'right', display: 'flex', marginLeft: '60px', fontWeight: "bold", fontSize: '12px', color: 'black' }}>
                                            {formattaData(messaggio.dataOra)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ backgroundColor: "#25D366", position: "absolute", width: "1028px", bottom: "0px", borderRadius: "20px", display: "flex", flexDirection: "row", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                        <input style={{ height: "10px" }}
                            type="text"
                            value={nuovoMessaggio}
                            onChange={(e) => setNuovoMessaggio(e.target.value)}
                        />
                        <button style={{ backgroundColor: 'transparent', border: '0px', marginBottom: '27px' }} onClick={inviaMessaggio}><i className='fa-solid fa-paper-plane fa-2x' style={{cursor:"pointer"}}
                         onMouseOver={(e) => { e.currentTarget.style.color = '#0f756a' }}
                         onMouseOut={(e) => { e.currentTarget.style.color = 'black' }}
                        ></i></button>
                    </div>
                </div>}
        </>
    );
};

export default WebSocketComponent;