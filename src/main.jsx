import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Error from './router/Error.jsx';
import Home from './router/Home.jsx';
import Loja from './router/Loja.jsx';

const router = createBrowserRouter([
  {
    //Elementos Pai
    path: '/', element:<App/>,
    errorElement: <Error/>,

    //Elementos Filho
    children:[
      {path: '/', element:<Home/>},
      {path: '/loja', element:<Loja/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
