import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase.config";
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

  /**
   * navigate is a function that takes a string as a parameter and returns a promise that navigates to
   */
  const navigate = useNavigate();

  /**
   * The function takes an event of type React.ChangeEvent<HTMLInputElement>
   * that takes the value of the input and sets it to the state. for the mail
   * @param event - React.ChangeEvent<HTMLInputElement>
   */
  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  /**
   * The function takes an event of type React.ChangeEvent<HTMLInputElement>
   * that takes the value of the input and sets it to the state. for the password
   * @param event - React.ChangeEvent<HTMLInputElement>
   */
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  /**
   * If the user is not logged in, then log them in, and if they are logged in, then set the error
   * state to 1.
   * @param event - React.FormEvent<HTMLFormElement>
   */
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
          navigate("/Profile");
        })
        .catch((error) => {});
    } else {
      setError(1);
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center">Connexion</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <div
              className={
                checkerror === 1
                  ? " outline outline-offset-1 outline-2 outline-red-500 rounded-md"
                  : "bg-white "
              }
            >
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
              Password
            </label>
            <div
              className={
                checkerror === 1
                  ? "bg-white outline outline-offset-1 outline-2 outline-red-500 rounded-md"
                  : "bg-white"
              }
            >
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none focus:bg-black-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
