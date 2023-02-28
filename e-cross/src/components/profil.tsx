import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profil() {
  const parseJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("idToken") !== null) {
      const jwt = parseJWT(localStorage.getItem("idToken") as string);
      if (jwt.exp < Date.now() / 1000) {
        localStorage.removeItem("idToken");
        navigate("/Connexion");
      }
    } else {
      navigate("/Connexion");
    }
  });
  return (
    <div>
      <h1>Profil</h1>
    </div>
  );
}
export default Profil;
