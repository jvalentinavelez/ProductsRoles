import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from '@mui/material/Checkbox';
import axios from './api/axios';
import FormControlLabel from '@mui/material/FormControlLabel';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    // for user input, to set the focus when the component loads
    const userRef = useRef(); 
    // to set the focus on an error
    const errRef = useRef();
    // user state, user input
    const [user, setUser] = useState('');
    // to validate the name
    const [validName, setValidName] = useState(false);
    // wether the focus is on the input field or not
    const [userFocus, setUserFocus] = useState(false);
    // password field
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    // matching password field
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [fidelizado, setFidelizado] = useState(false);
    const [validFidelizado, setValidFidelizado] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Setting the focus on the user name when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])
    // Any time it changes it will check the validation of the field
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log('user: '+user);
        console.log('result: '+result);
        setValidName(result);
    }, [user])

        useEffect(() => {
            const result = (fidelizado === false || fidelizado === true ) ;
            console.log('fidelizado: '+fidelizado);
            console.log('result: '+result);
            setValidFidelizado(result);
    }, [fidelizado])

    // validation for passsword and matching password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log('pwd: '+pwd);
        console.log('result: '+result);
        setValidPwd(result);
        const match = (pwd === matchPwd);
        console.log('match: '+match);
        setValidMatch(match);
    }, [pwd, matchPwd])

    // set the error message
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, fidelizado])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()
        // double validation of user and pwd 
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        console.log(v1)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        try {
            // provides the data to send to the API (user, pwd)
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, fidelizado }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clearing input fields (state)
            setUser('');
            setPwd('');
            setMatchPwd('');
            setFidelizado(false);
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Usuario ya registrado');
            } else {
                setErrMsg('Error en el registro');
            }
            // set the focus on the error screen
            errRef.current.focus();
        }

    }
    
return (
    <>
        {success ? (
            <section>
                <h1>¡Cuenta creada exitosamente!</h1><br />
                <p>
                    <a href="/">Iniciar Sesión</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Registrarse</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Nombre de Usuario:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 a 24 caracteres.<br />
                        Debe empezar con una letra.<br />
                        Letras, números, 
                        Se permiten letras, números, guiones bajos y guiones.
                    </p>
                    <FormControlLabel control={<Checkbox id="fidelizado" onChange={
                        (e) => {
                            console.log("onChange fidelizado", e.target.checked)
                            setFidelizado(e.target.checked)
                            
                        }
                        } aria-invalid={validFidelizado ? "false" : "true"}  />} label="Fidelizado" />

                    <label htmlFor="password">
                        Contraseña:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 a 24 caracteres.<br />
                        Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                        Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <label htmlFor="confirm_pwd">
                        Confirmar Contraseña:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Debe coincidir con el primer campo de entrada de contraseña.
                    </p>

                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>Registrarse</button>
                </form>
                <p>
                    ¿Ya se encuentra registrado?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/">Iniciar Sesión</a>
                    </span>
                </p>
            </section>
        )}
    </>
)
}

export default Register