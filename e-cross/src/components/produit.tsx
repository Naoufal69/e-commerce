import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartProvider";
import { db } from "../firebase.config";

function Produit() {
  const { id } = useParams();
  const [motocross, setMoto] = useState([] as MotoCross[]);
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {cart,dispatchCart} = useContext(CartContext);

  type CountAction = { type: string };
  type CountState = { count: number };
  function reducer(state: CountState, action: CountAction) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    console.log("Cart", cart);
  }, [cart]);

  type MotoCross = {
    date: number;
    modele: string;
    prix: number;
    marque: string;
    image: string;
    id: string;
    Description: string;
  };

  const loadOneMotocross = async () => {
    const refMoto = collection(db, "motocross");
    const docMoto = doc(refMoto, id);
    const docSnap = await getDoc(docMoto);
    const loadedMotocross = [] as MotoCross[];
    setMoto([]);
    if (docSnap.exists()) {
      const currentMotocross = docSnap.data() as MotoCross;
      const id = docSnap.id;
      loadedMotocross.push({ ...currentMotocross, id });
    } else {
      console.log("No such document!");
    }
    setMoto(loadedMotocross);
  };

  useEffect(() => {
    loadOneMotocross();
  }, []);

  return (
    <div>
      {motocross.map((motocross, index) => (
        <div>
          <div key={index} className="flex mt-10 mx-10 rounded-md shadow-md">
            <div className="w-1/3">
              <img key={index} src={motocross.image} className="w-82 h-72 items-center" />
            </div>
            <div className="flex align-content: center w-1/3 mr-5 justify-between flex-wrap">
              <div className="flex w-full h-8 border-t-2 border-black">
                <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                  <h2>Marque :</h2>
                  <div key={index} className="text-base font-semibold m-auto mr-2">
                    {motocross.marque}
                  </div>
                </div>
              </div>
              <div className="flex w-full h-8 border-t-2 border-black">
                <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                  <h2>Modèle :</h2>
                  <div className="text-base font-semibold m-auto mr-2">
                    {motocross.modele}
                  </div>
                </div>
              </div>
              <div className="flex w-full h-8 border-t-2 border-black">
                <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                  <h2>Année : </h2>
                  <div className="text-base font-semibold m-auto mr-2">
                    {motocross.date}
                  </div>
                </div>
              </div>
              <div className="flex w-full h-8 border-t-2 border-black">
                <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                  <h2>Prix : </h2>
                  <div className="text-base font-semibold m-auto mr-2">
                    {new Intl.NumberFormat().format(motocross.prix)} €
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold border-2 border-black text-justify p-2 w-1/3 rounded-md">
              <h2 className="underline mb-4">Description :</h2>
              {motocross.Description}
            </div>
          </div>
          <div className="flex items-center mt-9">
            <div className="mx-8">
              <button
                className="h-max bg-black text-white border-black border-2 w-5"
                onClick={() => dispatch({ type: "decrement" })}
              >
                -
              </button>
              <input
                type="text"
                readOnly={true}
                className="h-max border-2 border-black text-center w-10"
                value={state.count}
              />
              <button
                className="h-max bg-black text-white border-black border-2 w-5"
                onClick={() => dispatch({ type: "increment" })}
              >
                +
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  dispatchCart({ type: "add", payload: { count: state.count, id: motocross.id } })
                }
                disabled={state.count === 0}
                className="bg-black text-white border-black rounded-md border-2 p-4"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Produit;
