import { useEffect } from "react";

function Profil() {
  const parseJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    const jwt = parseJWT(localStorage.getItem("idToken") as string);
  });
  return (
    <div>
      <h1>Profil</h1>
    </div>
  );
}
export default Profil;
