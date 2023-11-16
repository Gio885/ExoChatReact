import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_PAGE } from '../utility/Route';
import { registerUtente } from '../service/utenteService';
import '../custom/RegisterPage.css'


function RegisterPage() {

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
        } else if( password === '') {
            setPasswordMatchErrorMessage('');
        } else if (password === confermaPassword){
            setPasswordMatchErrorMessage('Le password corrispondono')
        }
    }, [password, confermaPassword]);


    function register() {

        let checkUsername = false;
        let checkEmail = false;
        let checkPassword = false;
        let checkMatchPass = false;




        if (!validUsername.test(username) || username === '' || username.length <= 4 || username.length >= 20) {
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

            registerUtente(userData, history);

        } else {
            return;
        }


    }


    return (
        <>
            <h1 style={{color: ' #eecc8c', fontFamily: 'Fonseca, sans-serif'}}><b>REGISTRATI IN EXOCHAT</b></h1>
            <div className='containerRegister'>
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
                <b>Username:</b>
                <input type="text" placeholder='Inserisci username' style={{textAlign: 'center'}}  value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <br />
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
                <b>Email:</b>
                <input type="email" placeholder='Inserisci email' style={{textAlign: 'center'}} value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <br />
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
            <b>Password:</b>
                <input type="password" placeholder='Inserisci password' style={{textAlign: 'center'}}  value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br/>
            <br />
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
                <b>Conferma Password:</b>
                <input type="password" placeholder='Conferma password' style={{textAlign: 'center'}}  value={confermaPassword} onChange={(e) => setConfermaPassword(e.target.value)} />
            </label>
            <br />
            <br />
            {passwordMatchMessage === 'Le password non corrispondono' && <div style={{ color: 'red' }}>{passwordMatchMessage}</div>}
            {passwordMatchMessage === 'Le password corrispondono' && <div style={{ color: 'green' }}>{passwordMatchMessage}</div>}
       
            <div>
                <button className='buttonForRegisterPage'  type="button" onClick={() => { register() }}>Registrati</button>
            </div>
            <div>
                <button className='buttonForRegisterPage' type="button" onClick={() => { history.push(LOGIN_PAGE) }}>Torna a login</button>
            </div>

            </div>





        </>
    )
}

export default RegisterPage;