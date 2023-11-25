import React, { useState, useEffect } from 'react';
import { loginUtente } from '../service/utenteService';
import { REGISTER_PAGE } from '../utility/Route';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../custom/LoginPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { setUtente } from '../store/slice/utenteSlice';
import { setMessaggio} from '../store/slice/messaggioSlice';

 function LoginPage() {
    const validEmail = /^[A-Za-z0-9._%+-]{4,}@([A-Za-z0-9-]{4,}\.)+[A-Za-z]{2,}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState({
        errorEmail: '',
        errorPassword: ''
    })
    const history = useHistory('')
    const dispatch = useDispatch('')
    const messaggio = useSelector((state) => state.messaggio)

    function login() {

        let checkEmail = false;
        let checkPassword = false;
        if (!validEmail.test(email) || email === '') {
            setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage,  errorEmail: "Inserire email valida" }))
            checkEmail = false;
        } else {
            checkEmail = true;
            setErrorMessage({ errorEmail: "" })
        }

        if (!validPassword.test(password) || password === '') {
            setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage,  errorPassword: "Inserire password valida" }))
            checkPassword = false;
        } else {
            checkPassword = true;
            setErrorMessage({ errorPassword: "" })
        }

        if (!checkEmail || !checkPassword) {
            return;
        }
        const utente = {
            email: email,
            password: password,
        };

        loginUtente(utente, dispatch,setMessaggio, setUtente, history)

    };

    return (
        <>
            <h1 style={{color: ' #eecc8c', fontFamily: 'Fonseca, sans-serif'}}><b>BENVENUTO IN EXOCHAT</b></h1>
            <div className='containerLogin'>
            {(messaggio) && <><div style={{color: 'red'}}> {messaggio.data} </div>  <br /></> }
           
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
                <b>Email:</b>
                <br/>
                <input type="email" placeholder='Inserisci email' style={{textAlign: 'center'}} value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            {errorMessage.errorEmail &&  <><div style={{color: 'red'}}> {errorMessage.errorEmail} </div></>}
            <br />
            <label style={{color: ' black', fontFamily: 'sans-serif'}}>
                <b>Password:</b>
                <br/>
                <input type="password" placeholder='Inserisci password'style={{textAlign: 'center'}} value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {errorMessage.errorPassword &&  <><div style={{color: 'red'}}> {errorMessage.errorPassword} </div></>}
            <button type="button" className='buttonForLoginPage' onClick={() => login()}>Accedi</button>
            <br />
            <button type="button" className='buttonForLoginPage' onClick={()=> {history.push(REGISTER_PAGE)}}>Registrati</button>
            <br/>
           
            </div>



        </>
    )
}

export default LoginPage;