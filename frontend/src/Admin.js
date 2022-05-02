import { Link } from "react-router-dom"
import Users from './Users';

const Admin = () => {
    return (
        <section>
            <h1>Página de Admin</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Página Principal</Link>
            </div>
        </section>
    )
}

export default Admin