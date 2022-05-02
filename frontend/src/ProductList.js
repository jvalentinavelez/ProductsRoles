import { Link } from "react-router-dom"
import Users from './Users';
import Products from './Products';

const ProductList = () => {
    return (
        <section>
            <h1>Lista de Productos</h1>
            <br />
            <Products />
            <br />
            <div className="flexGrow">
                <Link to="/">Página Principal</Link>
            </div>
        </section>
    )
}

export default ProductList