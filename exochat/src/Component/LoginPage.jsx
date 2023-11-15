import React, { useState } from 'react';
import axios from 'axios';


export default function LoginPage() {
    const validEmail = /^[A-Za-z0-9._%+-]{4,}@([A-Za-z0-9-]{4,}\.)+[A-Za-z]{2,}$/;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]+$/;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMesage, setErrorMessage] = useState({
        errorEmail: '',
        errorPassword: ''
    })


    function login() {

        let checkEmail = false;
        let checkPassword = false;

        if (!validEmail.test(email) || email === '') {
            setErrorMessage({ errorEmail: "Inserire email valida" })
            checkEmail = false;
        } else {
            checkEmail = true;
            setErrorMessage({ errorEmail: "" })
        }

        if (!validPassword.test(password) || password === '') {
            setErrorMessage({ errorPassword: "Inserire una password valida" })
            checkPassword = false;
        } else {
            checkPassword = true;
            setErrorMessage({ errorPassword: "" })
        }

        if (!checkEmail || !checkPassword) {
            return;
        }
        const user = {
            email: email,
            password: password,
        };



    };








    return (
        <>
           
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button">Accedi</button>
                <button type="button">Registrati</button>
       



        </>
    )
}