import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [checkerror, setError] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("idToken")) {
      setUser(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Vérifier si l'adresse e-mail est dans la collection "admin"
    const q = query(collection(db, "Admin"), where("mail", "==", mail));
    const querySnapshot = await getDocs(q);
    const isAdmin = querySnapshot.docs.length > 0;
    
    if (isAdmin) {
      signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          return userCredential.user.getIdToken();
        })
        .then((idToken) => {
          localStorage.setItem("idToken", idToken);
          setUser(true);
          navigate("/Admin");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }else {
      setError(1)
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Connexion</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Adresse mail
            </label>
            <div className={checkerror === 1 ? " outline outline-offset-1 outline-2 outline-red-500 rounded-md": "bg-white "}>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleMailChange}
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Mot de passe
            </label>
            <div className={checkerror === 1 ? "bg-white outline outline-offset-1 outline-2 outline-red-500 rounded-md" : "bg-white"}>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none focus:bg-black-600">
              Se Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
