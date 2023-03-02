import { useRoutes } from "react-router-dom";
import CartProvider from "./CartProvider";
import Index from "./components";
import Header from "./components/header";
import Login from "./components/login";
import Pannier from "./components/pannier";
import Produit from "./components/produit";
import Profil from "./components/profil";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Index /> },
    { path: "/Profile", element: <Profil /> },
    { path: "/Connexion", element: <Login /> },
    { path: "/Pannier", element: <Pannier /> },
    { path: "/Produit/:id", element: <Produit /> },
  ]);

  return (
    <div className="App">
      <Header />
      <CartProvider>{routes}</CartProvider>
    </div>
  );
};

export default App;
