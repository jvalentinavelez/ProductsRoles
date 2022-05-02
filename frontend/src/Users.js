import {useState, useEffect} from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    // AbortController cancels a request if the component unmounts
    const controller = new AbortController();
    
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        })
        console.log('response.data: ', response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();

    //clean-up function
    return () =>{
      isMounted = false;
      controller.abort();
    }
  },[]) 

  function createData(username) {
    return { username };
  }

  const rows = [

    users?.filter(user => user?.fidelizado === false ).map(user => createData(user?.username)) 
    ];

  return (
    <article>
      <h4>Lista de Usuarios</h4> <br />
      {users?.length
        ? (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Usuarios No Fidelizados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows[0].map((row, i) => (
                  <TableRow
                    key={row.i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
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

export default Users