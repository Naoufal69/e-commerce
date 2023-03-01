import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './components/Login'
import Admin from './components/Admin'
import Header from "./components/Header"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/Admin",
    element: <Admin/> ,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
