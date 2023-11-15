import React, { useState } from 'react';
import axios from 'axios';


export default function RegisterPage() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

    const utente = {
        username,
        email,
        password
    }


        try {
            // Invio dei dati al tuo endpoint
            const response = await axios.post('http://localhost:8080/ExoChatWeb/rest/utenteRest/insertUtente', {
                username: username,
                email: email,
                password: password,
            });

            // Gestione della risposta
            console.log('Risposta dal server:', response.data);

            // Pulizia dei campi del modulo dopo l'invio
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Errore durante l\'invio dei dati:', error);
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value) } />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Invia</button>
            </form>



        </>
    )
}