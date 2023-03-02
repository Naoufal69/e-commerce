import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartProvider";
import { CartItem } from "../CartProvider";
import Validation from "./Modal/Validation.modal";

function Pannier() {
  const { cart, dispatchCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const parseJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  const navigate = useNavigate();

  const handleSubmit = (command: CartItem ) => {
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

  const handleRemove = (id: number) => {
    dispatchCart({ type: "remove", payload: { itemid: id } });
  };

  return (
    <div className="flex flex-col justify-center m-auto w-3/4 mt-10 min-w-fit ">
        {isOpen && <Validation onClose={() => setIsOpen(false)} />}
      {cart.map((commande, index) => (
        <div className="mb-10 rounded-md w-full shadow-lg" key={index}>
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
                onClick={() => handleSubmit(commande)}
                className="bg-black hover:bg-green-800 rounded-md shadow-lg text-white font-bold py-2 px-4  mt-10 ml-6 mr-6"
              >
                ✅
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="bg-black hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-lg mt-10 ml-6 mr-6"
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
