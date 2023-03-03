import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Admin from "./components/Admin";


const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Login/> },
    { path: "/Admin", element: <Admin /> },
  ]);

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
};

export default App;