import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from './hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from './api/axios';
// route that matches the backend
const LOGIN_URL = '/auth'; 

const Login = () => {
    //If we successfully authenticate when we log in, we'll set the auth state in the AuthContext
    const { setAuth } = useAuth(); //global Auth

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    // inputs
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // set the focus on the first input when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // set the focus on the errors when the user changes the user or pwd state
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent the default refresh of the page
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // store accessToken with the other user info
            //optional chaining
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const fidelizado = response?.data?.fidelizado;
            // console.log(response?.data)
            setAuth({ user, pwd, roles, accessToken, fidelizado});
            setUser('');
            setPwd('');
            setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Usuario no registrado');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        {success ? (
            <section>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (

        <section>
            {/* displays any message error */}
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inicio de Sesión</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de Usuario:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Iniciar Sesión</button>
            </form>
            <p>
                ¿Aún no tiene una cuenta registrada?<br />
                <span className="line">
                    <Link to="/register">Registrarse</Link>
                </span>
            </p>
        </section>
                )}
                </>

    )
}

export default Login