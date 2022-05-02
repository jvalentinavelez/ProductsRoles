import Register from './Register';
import Login from './Login';
import Home from './Home';
import Layout from './Layout';
import Admin from './Admin';
import Unauthorized from './Unauthorized';
import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';


const ROLES = {
  "Admin": 5600,
  "User": 1010
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
          <Route path="productList" element={<ProductList />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

      </Route>

    </Routes>
  );
}

export default App;
