import {useState, useEffect} from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from "./hooks/useAuth";

const Products = () => {
  const [products, setProducts] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const fidelizado = auth?.fidelizado;

  useEffect(() => {
    let isMounted = true;
    // AbortController cancels a request if the component unmounts
    const controller = new AbortController();
    
    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          signal: controller.signal
          //to cancel the request if we need to
        })
        console.log('response.data: ', response.data);
        isMounted && setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getProducts();

    //clean-up function, runs as the component unmounts
    return () =>{
      isMounted = false;
      controller.abort();
    }
  },[]) 

  function createData(name, price, priceDiscount) {
    return { name, price, priceDiscount };
  }

  const rows = [
    products?.map((product,i) => 
        createData(product?.name, product?.price, fidelizado ? (product?.price - (product?.price*0.2)) : product?.price )
    )
    ];

return (
    <article>
      <br />
      <p>{fidelizado ? 'Usted es un usuario fidelizado, los productos presentan un 20% de descuento' : ''}</p><br />
      {products?.length
        ? (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Precio&nbsp;(COP)</TableCell>
                  {fidelizado ? <TableCell align="right">Precio Descuento 20% &nbsp;(COP)</TableCell> : ''}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows[0].map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    {fidelizado ? <TableCell align="right">{row.priceDiscount}</TableCell> : ''}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : <p></p>
      }
      <br />
    </article>
  )

}

export default Products