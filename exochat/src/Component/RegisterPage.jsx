import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_PAGE } from '../utility/Route';
import { registerUtente } from '../service/utenteService';


export default function RegisterPage() {

    const validUsername = /^[A-Za-z]+\s?[A-Za-z]*$/;
    const validEmail = /^[A-Za-z0-9._%+-]{4,}@([A-Za-z0-9-]{4,}\.)+[A-Za-z]{2,}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/;
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confermaPassword, setConfermaPassword] = useState('');
    const [error, setError] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [passwordMatchMessage, setPasswordMatchErrorMessage] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {

        if (password !== confermaPassword) {
            setPasswordMatchErrorMessage('Le password non corrispondono');
        } else {
            setPasswordMatchErrorMessage('Le password corrispondono');
        }
    }, [password, confermaPassword]);


    function register() {

        let checkUsername = false;
        let checkEmail = false;
        let checkPassword = false;
        let checkMatchPass = false;




        if (!validUsername.test(username) || username === '' || username.length <= 8 || username.length >= 20) {
            setError({ username: 'Inserire username valido' });
            checkUsername = false;
        } else {
            setError({ username: '' });
            checkUsername = true;
        }
        if (!validEmail.test(email) || email === '' || email.length <= 8 || email.length >= 20) {
            setError({ email: 'Inserire email valida' });
            checkEmail = false;
        } else {
            setError({ email: '' });
            checkEmail = true;
        }
        if (!validPassword.test(password) || password === '' || password.length <= 8 || password.length >= 20) {
            setError({ password: 'Inserire password valida' });
            checkPassword = false;
        } else {
            setError({ password: '' });
            checkPassword = true;
        }
        if (passwordMatchMessage === 'Le password non corrispondono') {
            checkMatchPass = false;
        } else {
            checkMatchPass = true;
        }

        if (checkUsername && checkEmail && checkPassword && checkMatchPass) {

            const userData = {
                username: username,
                email: email,
                password: password,
            };

            registerUtente(userData);

        } else {
            return;
        }


    }


    return (
        <>

            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br/>
            <label>
                Conferma Password:
                <input type="password" value={password} onChange={(e) => setConfermaPassword(e.target.value)} />
            </label>
            {passwordMatchMessage === 'Le password non corrispondono' && <div style={{ color: 'red' }}>{passwordMatchMessage}</div>}
            {passwordMatchMessage === 'Le password corrispondono' && <div style={{ color: 'green' }}>{passwordMatchMessage}</div>}
       
            <div>
                <button type="button" onClick={() => { register() }}>Registrati</button>
            </div>
            <div>
                <button type="button" onClick={() => { history.push(LOGIN_PAGE) }}>Torna a login</button>
            </div>





        </>
    )
}