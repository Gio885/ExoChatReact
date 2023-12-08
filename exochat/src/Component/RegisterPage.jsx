import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_PAGE } from '../utility/Route';
import { registerUtente } from '../service/utenteService';
import '../custom/RegisterPage.css'
import { setUtente } from '../store/slice/utenteSlice';


function RegisterPage() {

    const validUsername = /^[a-zA-Z0-9_]{3,20}$/;
    const validEmail = /^[A-Za-z0-9._%+-]{4,}@([A-Za-z0-9-]{4,}\.)+[A-Za-z]{2,}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/;
    const history = useHistory();
    const dispatch = useDispatch()
    const [banner, setBanner] = useState(false)
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


    useEffect(() => {

        if (password !== confermaPassword) {
            setPasswordMatchErrorMessage('Le password non corrispondono');
        } else if( password === '') {
            setPasswordMatchErrorMessage('');
        } else if (password === confermaPassword){
            setPasswordMatchErrorMessage('Le password corrispondono')
        }
    }, [password, confermaPassword]);


    async function register() {

        let checkUsername = false;
        let checkEmail = false;
        let checkPassword = false;
        let checkMatchPass = false;




        if (!validUsername.test(username) || username === '' || username.length <= 4 || username.length >= 20) {
            setError((prevError) => ({ ...prevError, username: 'Inserire username valido' }));
            checkUsername = false;
        } else {
            setError((prevError) => ({ ...prevError, username: '' }));
            checkUsername = true;
        }
        
        if (!validEmail.test(email) || email === '' || email.length <= 8 || email.length >= 20) {
            setError((prevError) => ({ ...prevError, email: 'Inserire email valida' }));
            checkEmail = false;
        } else {
            setError((prevError) => ({ ...prevError, email: '' }));
            checkEmail = true;
        }
        
        if (!validPassword.test(password) || password === '' || password.length <= 8 || password.length >= 20) {
            setError((prevError) => ({ ...prevError, password: 'Inserire password valida' }));
            checkPassword = false;
        } else {
            setError((prevError) => ({ ...prevError, password: '' }));
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

            const response = await registerUtente(userData);
            console.log(response)
            if(response.status == 200){
                setBanner(true)
                setTimeout(() => {
                    dispatch(setUtente(response.data));
                    history.push("/webSocket")
                }, 5000);
            }

        } else {
            return;
        }


    }


    return (
        <>
            <h1 style={{color: ' #25D366', fontFamily: 'Fonseca, sans-serif'}}><b>REGISTRATI IN EXOCHAT</b></h1>
            <div className='containerRegister'>
            <label style={{color: ' white', fontFamily: 'sans-serif'}}>
                <b>Username:</b>
                <input type="text" placeholder='Inserisci username' style={{textAlign: 'center',marginTop:"10px"}}  value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            {error.username && <div style={{ color: 'red' }}>{error.username}</div>}
            <br />
            <br />
            <label style={{color: ' white', fontFamily: 'sans-serif'}}>
                <b>Email:</b>
                <input type="email" placeholder='Inserisci email' style={{textAlign: 'center',marginTop:"10px"}} value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {error.email && <div style={{ color: 'red' }}>{error.email}</div>}
            <br />
            <br />
            <label style={{color: ' white', fontFamily: 'sans-serif'}}>
            <b>Password:</b>
                <input type="password" placeholder='Inserisci password' style={{textAlign: 'center',marginTop:"10px"}}  value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error.password && <div style={{ color: 'red' }}>{error.password}</div>}
            <br/>
            <br />
            <label style={{color: ' white', fontFamily: 'sans-serif'}}>
                <b>Conferma Password:</b>
                <input type="password" placeholder='Conferma password' style={{textAlign: 'center',marginTop:"10px"}}  value={confermaPassword} onChange={(e) => setConfermaPassword(e.target.value)} />
            </label>
            <br />
            <br />
            {passwordMatchMessage === 'Le password non corrispondono' && <div style={{ color: 'red', fontFamily: 'Fonseca, sans-serif' }}>{passwordMatchMessage}</div>}
            {passwordMatchMessage === 'Le password corrispondono' && <div style={{ color: 'green', fontFamily: 'Fonseca, sans-serif' }}>{passwordMatchMessage}</div>}
       
            <div>
                <button className='buttonForRegisterPage'  type="button" onClick={() => { register() }}>Registrati</button>
            </div>
            <div>
                <button className='buttonForRegisterPage' type="button" onClick={() => { history.push(LOGIN_PAGE) }}>Torna a login</button>
            </div>

            {banner && <h2 style={{color:"#25D366"}}>Registrazione effettuata con successo, stai per essere reindirizzato</h2>}

            </div>





        </>
    )
}

export default RegisterPage;