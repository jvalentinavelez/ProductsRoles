import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './context/AuthProvider';
import useLogout from "./hooks/useLogout";
import useAuth from "./hooks/useAuth";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    const ROLES = {
        "Admin": 5600,
        "User": 1010
    }

    return (
        <section>
            <h1>Página Principal</h1>
            <br />
            <p> ¡Has iniciado sesión!</p>
            <br />
            {auth?.roles?.includes(ROLES.Admin) && <Link to="/admin">Página de Admin</Link> }
            <br />
            <Link to="/productList">Lista de Productos</Link>
            <br />
            <div className="flexGrow">
                <button onClick={signOut}>Cerrar Sesión</button>
            </div>
        </section>
    )
}

export default Home