import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='App'>
        {/* Outlet represents all the children inside the layout component */}
        <Outlet/>

    </main>
  )
}

export default Layout