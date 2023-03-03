import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './components/Login'
import Admin from './components/Admin'
import Header from "./components/Header"
import App from './App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
)
