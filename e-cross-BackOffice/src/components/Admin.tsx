import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [commande, setCommande] = useState([] as Commande[]);
  type Commande = {
    adresse: string;
    code_postale: string;
    image: string;
    mail: string;
    produit_date: number;
    produit_marque: string;
    produit_modele: string;
    produit_prix: number;
    produit_quantite: number;
    ville: string;
    etat: number;
    id: string;
  };
  const loadCommande = async () => {
    const q = query(collection(db, "Commande"), where("etat", "==", 0));
    const querySnapshot = await getDocs(q);
    const loadedCommande = [] as Commande[];
    setCommande([]);
    querySnapshot.forEach((doc) => {
      const currentCommande = doc.data() as Commande;
      const id = doc.id;
      loadedCommande.push({ ...currentCommande, id });
    });
    setCommande(loadedCommande);
  };

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
        navigate("/");
      } else {
        localStorage.removeItem("idToken");
        loadCommande();
      }
    } else {
      localStorage.removeItem("idToken");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem("idToken");
    loadCommande();
  }, []);

  const updateValideCommande = async (id: string, etatSet: number) => {
    const commandeRef = doc(db, "Commande", id);
    await updateDoc(commandeRef, { etat: etatSet });
    loadCommande();
  };

  const updateInvalideCommande = async (id: string, etatSet: number) => {
    const commandeRef = doc(db, "Commande", id);
    await updateDoc(commandeRef, { etat: etatSet });
    loadCommande();
  };

  return (
    <div className="flex flex-col justify-center m-auto w-3/4 mt-10 min-w-fit ">
      {commande.map((commande, index) => (
        <div className="mb-10 rounded-md w-full shadow-lg" key={index}>
          <div className=" flex align-content: center m-2">
            <div className="w-2/8 ">
              <div className="flex space-x-16 text-lg font-bold text-center border-b border-black ">
                <div>{commande.produit_marque}</div>
                <div>{commande.produit_modele}</div>
                <div>{commande.produit_date}</div>
              </div>
              <img
                src={commande.image}
                alt="Image de commande"
                className=" w-50 h-40 object-cover "
              />
            </div>

            <div className="flex w-2/4 mt-0 mb-0 ml-20 m-auto flex-col min-w-fit ">
              <div className="flex  w-full h-8 border-t border-black">
                <div className="text-lg font-semibold ml-2 m-auto">
                  <h2>Adresse mail</h2>
                </div>
                <div className="text-base  m-auto mr-2">{commande.mail}</div>
              </div>

              <div className="flex w-full h-full ml-0  border-t  border-black">
                <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
                  <h2>Adresse Compl??te</h2>
                </div>
                <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">
                  <div>{commande.adresse}</div>
                  <div>{commande.code_postale}</div>
                  <div>{commande.ville}</div>
                </div>
              </div>

              <div className="flex w-full h-full ml-0  border-t  border-black">
                <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
                  <h2>Quantit??</h2>
                </div>
                <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">
                  <div>{commande.produit_quantite}</div>
                </div>
              </div>

              <div className="flex w-full h-full ml-0  border-t  border-black">
                <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
                  <h2>Prix</h2>
                </div>
                <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">
                  <div className="flex">
                    {new Intl.NumberFormat().format(
                      commande.produit_prix * commande.produit_quantite
                    )}
                    <h2>&nbsp;???</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex flex-col ">
              <button
                onClick={() => updateValideCommande(commande.id, 1)}
                className="bg-black hover:bg-green-800 rounded-md shadow-lg text-white font-bold py-2 px-4  mt-10 ml-6 mr-6 transition ease-in-out delay-50  hover:scale-110  duration-300 "
              >
                ???
              </button>
              <button
                onClick={() => updateInvalideCommande(commande.id, 2)}
                className="bg-black hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md shadow-lg mt-10 ml-6 mr-6 transition ease-in-out delay-50  hover:scale-110  duration-300"
              >
                ???
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
