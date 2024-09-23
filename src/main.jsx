import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Error from './router/Error.jsx';
import Home from './router/Home.jsx';
import Loja from './router/Loja.jsx';
import Egame from './router/Egame.jsx'
import FormulaE from './router/Formulae.jsx'
import Login from './router/Login.jsx';   
import Cadastro from './router/Cadastro.jsx';
import Produto from './router/Produto.jsx';

const router = createBrowserRouter([
  {
    //Elementos Pai
    path: '/', element:<App/>,
    errorElement: <Error/>,

    //Elementos Filho
    children:[
      {path: '/', element:<Home/>},
      {path: '/loja', element:<Loja/>},
      {path: '/egame', element:<Egame/>},
      {path: '/formulae', element:<FormulaE/>},
      {path: '/login', element: <Login/>},     
      {path: '/cadastro', element: <Cadastro/>},
      {path: '/produto', element: <Produto/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
