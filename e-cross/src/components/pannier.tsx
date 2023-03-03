import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartProvider";
import { CartItem } from "../CartProvider";
import Validation from "./Modal/Validation.modal";

function Pannier() {
  const { cart, dispatchCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * It takes a JWT token, splits it into three parts, takes the second part, replaces the dashes and
   * underscores with plus signs and slashes, and then decodes it
   * @param {string} token - The JWT token that you want to parse.
   * @returns The token is being parsed and the payload is being returned.
   */
  const parseJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  /**
   * navigate is a function that takes a string as a parameter and returns a promise that navigates to
   */
  const navigate = useNavigate();

  /**
   * If the user is logged in, check if the token is expired, if it is, remove it from localStorage and
   * redirect to the login page, if it's not, open the modal.
   */
  const handleSubmit = () => {
    if (localStorage.getItem("idToken") !== null) {
      const jwt = parseJWT(localStorage.getItem("idToken") as string);
      if (jwt.exp < Date.now() / 1000) {
        localStorage.removeItem("idToken");
        navigate("/Connexion");
      } else {
        setIsOpen(true);
      }
    }
  };

  /**
   * HandleRemove is a function that takes an id of type number and returns a function that takes no
   * arguments and returns nothing.
   * @param {number} id - number - the id of the item to be removed
   */
  const handleRemove = (id: number) => {
    dispatchCart({ type: "remove", payload: { itemid: id } });
  };

  return (
    <div className="flex flex-col justify-center m-auto w-3/4 mt-10 min-w-fit ">
      {cart.map((commande, index) => (
        <div className="mb-10 rounded-md w-full shadow-lg" key={index}>
          {isOpen ? (
            <Validation commande={commande} onClose={() => setIsOpen(false)} />
          ) : null}
          <div className=" flex align-content: center m-2">
            <div className="w-2/8 ">
              <div className="flex space-x-16 text-lg font-bold text-center border-b border-black ">
                <div>{commande.marque}</div>
                <div>{commande.modele}</div>
                <div>{commande.date}</div>
              </div>
              <img
                src={commande.image}
                alt="Image de commande"
                className=" w-50 h-40 object-cover "
              />
            </div>

            <div className="flex w-2/4 mt-0 mb-0 ml-20 m-auto flex-col min-w-fit ">
              <div className="flex w-full h-full ml-0  border-t  border-black">
                <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
                  <h2>Quantité</h2>
                </div>
                <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">
                  <div>{commande.count}</div>
                </div>
              </div>

              <div className="flex w-full h-full ml-0  border-t  border-black">
                <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
                  <h2>Prix</h2>
                </div>
                <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">
                  <div className="flex">
                    {new Intl.NumberFormat().format(
                      commande.prix * commande.count
                    )}
                    <h2>&nbsp;€</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex flex-col">
              <button
                onClick={() => handleSubmit()}
                className="bg-black hover:bg-green-800 rounded-md shadow-lg text-white font-bold py-2 px-4  mt-10 ml-6 mr-6 transition ease-in-out delay-50  hover:scale-110  duration-300 "
              >
                ✅
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="bg-black hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-lg mt-10 ml-6 mr-6 transition ease-in-out delay-50  hover:scale-110  duration-300"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Pannier;
