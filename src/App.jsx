import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';

function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;