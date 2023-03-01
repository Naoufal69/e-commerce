import React, { useState,useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase.config";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("idToken")) {
      setUser(true);
    }
  }, []);

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          return userCredential.user.getIdToken();
        })
        .then((idToken) => {
          localStorage.setItem("idToken", idToken);
          setUser(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Connexion</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Adresse mail
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleMailChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Mot de passe
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handlePasswordChange}
            />
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