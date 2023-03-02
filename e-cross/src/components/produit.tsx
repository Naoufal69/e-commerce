import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";

function Produit() {
  const { id } = useParams();
  const [idMotocross, setIdMoto] = useState(id);
  const [motocross, setMoto] = useState([] as MotoCross[]);
  const initialState = { count: 0 };
  const initialCartState: CartItem[] = [];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState);

  type CartItem = { count: number; id: string };


  type CountAction = { type: string };
  type CountState = { count: number };


  type CartAction = { type: string, payload?: CartItem };
  ;

  function cartReducer(state: CartItem[], action: CartAction) {
    switch (action.type) {
      case "add":
        return [ ...state, action.payload!];
      // case "remove":
      //   return { payload: { count: 0, id: action.payload.id } };
      default:
        return state;
    }
  }

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
    <div className="w-full h-full flex items-center justify-center">
    <div className=" mt-10 mx-10 rounded-md shadow-xl ">
      {motocross.map((motocross, index) => (
        <div key={index} className="flex">
          <div className="my-auto mx-10 w-1/3 ">
            <img src={motocross.image} className="mt-100 items-center" />
          </div>
          <div className="flex align-content: center w-1/3 mx-10  justify-between flex-wrap ">
            <div className="flex w-full h-8 border-t border-black mt-4">
              <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                <h2>Marque :</h2>
              </div>
              <div className="text-base m-auto mr-2">
                {motocross.marque}
              </div>
            </div>
            <div className="flex w-full h-8 border-t border-black mt-6">
              <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                <h2>Modèle :</h2>
                </div>
                <div className="text-base m-auto mr-2">
                  {motocross.modele}
                </div>
            </div>
            <div className="flex w-full h-8 border-t border-black mt-6">
              <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                <h2>Année : </h2>
              </div>
              <div className="text-base m-auto mr-2">
                {motocross.date}
              </div> 
            </div>
            <div className="flex w-full h-8 border-t border-black mt-6">
              <div className="flex text-lg font-semibold w-full ml-2 m-auto">
                <h2>Prix : </h2>
              </div>
                <div className="text-base m-auto mr-2 flex">
                  {new Intl.NumberFormat().format(motocross.prix)}<h1>&nbsp;€</h1>
                </div>
            </div>
            <div className="text-lg mt-6 mb-4 text-justify p-2 w-full rounded-md border border-black rounded-l-md shadow-lg">
              <h2 className="underline font-semibold mb-4">Description :</h2>
              {motocross.Description}
            </div>
          </div>

          <div className=" mx-auto w-1/6  ">
            <div className=" w-fit h-fit mx-auto mt-80 ">
              <button className="h-max bg-black text-white border-black border-2 w-5  rounded-l-md shadow-lg" onClick={() => dispatch({ type: "decrement" })}>
                -
              </button>
              <input type="text" readOnly={true} className="h-max border-2 border-black text-center w-10 " value={state.count}/>
              <button className="h-max bg-black text-white border-black border-2 w-5 rounded-r-md shadow-lg" onClick={() => dispatch({ type: "increment" })}>
                +
              </button>
            </div>
            <div className=" w-fit mx-auto mt-5">
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
    </div>
  );
}
export default Produit;
