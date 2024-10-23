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
import Bone from './router/Bone.jsx';
import Garrafa from './router/Garrafa.jsx';
import Moletom from './router/Moletom.jsx';
import Tickets from './router/Tickets.jsx';
import Forum from './router/Forum.jsx';
import Perfil from './router/Perfil.jsx';

import Teste from'./router/Testinho.jsx';

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
      {path: '/bone', element: <Bone/>},
      {path: '/garrafa', element: <Garrafa/>},
      {path: '/moletom', element: <Moletom/>},
      {path: '/tickets', element: <Tickets/>},
      {path: '/forum', element: <Forum/>},
      {path: '/perfil', element: <Perfil/>},
      {path: '/teste', element: <Teste/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
