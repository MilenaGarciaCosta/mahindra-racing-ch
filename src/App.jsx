import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App;