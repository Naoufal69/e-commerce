import { useContext, useState } from "react";
import { CartContext, CartItem } from "../../CartProvider";
import { db } from "../../firebase.config";
import { collection, addDoc } from "firebase/firestore";

function Validation({
  commande,
  onClose,
}: {
  commande: CartItem;
  onClose: () => void;
}) {
  type ModalProps = {
    commande: CartItem;
    onClose: () => void;
  };
  const [mail, setMail] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");
  const [code_postale, setCode_postale] = useState("");
  const [err, setErr] = useState(true);
  const { cart, dispatchCart } = useContext(CartContext);

  /**
   * The function takes an event as an argument, and sets the state of the mail variable to the value
   * of the event's target.
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };
  /**
   * "The function handleVilleChange takes an event of type React.ChangeEvent and returns nothing."
   *
   * The React.ChangeEvent is a generic type. The generic type is HTMLInputElement
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  const handleVilleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVille(e.target.value);
  };

  /**
   * "The function handleAdresseChange takes an event of type React.ChangeEvent<HTMLInputElement> and
   * returns nothing."
   *
   * The React.ChangeEvent<HTMLInputElement> is a generic type. The generic type is HTMLInputElement
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  const handleAdresseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdresse(e.target.value);
  };
  /**
   * "The function handleCode_postaleChange takes an event of type React.ChangeEvent and returns
   * nothing."
   *
   * The React.ChangeEvent type is a generic type that takes the type of the element that is changing.
   * In this case, it's an HTMLInputElement
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  const handleCode_postaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode_postale(e.target.value);
  };

  /**
   * HandleRemove is a function that takes an id of type number and returns a function that takes no
   * arguments and returns nothing.
   * @param {number} id - number - the id of the item to be removed
   */
  const handleRemove = (id: number) => {
    dispatchCart({ type: "remove", payload: { itemid: id } });
  };


  /**
   * I want to send the data of the cart to the firebase database.
   * @param {CartItem} commande - CartItem
   */
  const handleSubmit = async (commande: CartItem) => {
    console.log(commande.description)
    const ref = collection(db, "Commande");
    const data = {
      mail: mail,
      ville: ville,
      adresse: adresse,
      code_postal: code_postale,
      produit_date: commande.date,
      produit_marque: commande.marque,
      produit_modele: commande.modele,
      produit_prix: commande.prix,
      produit_quantite: commande.count,
      image: commande.image,
      date: commande.date,
      description: commande.description,
      etat: 0,
    };
    addDoc(ref, data)
      .then(() => {
      })
      .catch((error) => {
        setErr(true);
      });
      const itemToRemoove = cart.find((item) => item.id === commande.id)
      handleRemove(itemToRemoove?.itemid as number);
      onClose();
  };

  return (
    <div>
      <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className={err ? "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" : "border-2 border-red-600 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"}>
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Finalisation de la commande
                </h3>
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <input
                  type="text"
                  placeholder="Mail"
                  className="w-full border-2 active:border-black rounded-md p-2 mb-2"
                  onChange={handleMailChange}
                />
                <input
                  type="text"
                  placeholder="Ville"
                  className="w-full border-2 active:border-black rounded-md p-2 mb-2"
                  onChange={handleVilleChange}
                />
                <input
                  type="text"
                  placeholder="Adresse"
                  className="w-full border-2 active:border-black rounded-md p-2 mb-2"
                  onChange={handleAdresseChange}
                />
                <input
                  type="text"
                  placeholder="Code postal"
                  className="w-full border-2 active:border-black rounded-md p-2 mb-2"
                  onChange={handleCode_postaleChange}
                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onClose()}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleSubmit(commande)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </div>
  );
}
export default Validation;
