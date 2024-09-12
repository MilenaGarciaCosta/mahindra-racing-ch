import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Error from './router/Error.jsx'
import Home from './router/Home.jsx'

const router = createBrowserRouter([
  {
    //Elementos Pai
    path: '/', element:<App/>,
    errorElement: <Error/>,

    //Elementos Filho
    children:[
      {path: '/', element:<Home/>},
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
