import React from 'react';
import { useRoutes } from 'react-router-dom';
import Index from './components';
import Header from './components/header';
import Login from './components/login';
import Profil from './components/profil';


const App = () => {
    const routes = useRoutes([
        { path: '/', element: <Index /> },
        { path: '/Profile', element: <Profil />},
        { path: '/Connexion', element: <Login />},
    ]);

  return (
    <div className="App">
        <Header />
        {routes}
    </div>
  );
};

export default App;