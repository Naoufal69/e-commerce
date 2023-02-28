import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Index from './components'
import Header from "./components/header"
import Produit from "./components/produit"
import Login from './components/login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/Produit/:id",
    element: <Produit />,
  },
  {
    path: "/Connexion",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
