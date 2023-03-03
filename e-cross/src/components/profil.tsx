import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profil() {
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
   * HandleDelete is a function that takes an id as a parameter and returns a promise that deletes a
   * document from the database and then loads the commande.
   * @param {string} id - string
   */
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "Commande", id));
    loadCommande();
  };

  const [commande, setCommande] = useState([] as Commande[]);
  type Commande = {
    adresse: string;
    code_postale: string;
    image: string;
    mail: string;
    produit_date: number;
    produit_marque: string;
    produit_modele: string;
    produit_quantite: 2;
    ville: string;
    produit_prix: number;
    id: string;
    description: string;
  };

  /**
   * Load the data from the firestore database and put it in the state of the component.
   */
  const loadCommande = async () => {
    const jwt = parseJWT(localStorage.getItem("idToken") as string);
    const q = query(collection(db, "Commande"), where("mail", "==", jwt.email));
    const querySnapshot = await getDocs(q);
    const loadedCommande = [] as Commande[];
    setCommande([]);
    querySnapshot.forEach((doc) => {
      const currentCommande = doc.data() as Commande;
      const id = doc.id;
      loadedCommande.push({...currentCommande, id });
    });
    setCommande(loadedCommande)
    console.log(loadedCommande);
  };

  /* Checking if the user is logged in and if the token is still valid. If the user is logged in and
  the token is still valid, it loads the commande. If the user is not logged in or the token is not
  valid, it navigates to the connexion page. */
  useEffect(() => {
    if (localStorage.getItem("idToken") !== null) {
      const jwt = parseJWT(localStorage.getItem("idToken") as string);
      if (jwt.exp < Date.now() / 1000) {
        localStorage.removeItem("idToken");
        navigate("/Connexion");
      } else {
        loadCommande();
      }
    } else {
      navigate("/Connexion");
    }
  }, []);
  
  return (
    <div>
      <h1 className="flex justify-center mt-5 text-3xl">
        Historique des commandes
      </h1>
      <div className="flex space-x-20 m-5 flex-col mx-20">
        {commande.map((commande, index) => (
          <div
            className="rounded-md shadow-md h-1/5 w-full min-w-fit"
            key={index}
          >
            <div className="flex justify-between">
              <img src={commande.image} className="w-82 h-72 items-center" />
              <div className="flex justify-between flex-col w-1/3">
                <div className="flex space-x-0 justify-between">
                  <div className="text-lg font-semibold text-center">
                    {commande.produit_marque}
                  </div>
                  <div className="text-lg font-semibold text-center">
                    {commande.produit_modele}
                  </div>
                  <div className="text-lg font-semibold text-center">
                    {commande.produit_date}
                  </div>
                </div>
                <div className="text-lg font-semibold border-2 border-black text-justify p-2 w-96 rounded-md min-w-full">
                  <h2 className="underline mb-4">Description :</h2>
                  {commande.description}
                </div>
                <div className="flex justify-between ">
                  <div className="flex justify-between w-1/6 text-lg font-semibold flex-nowrap text-center">
                    <h2>Quantité :</h2>
                    {commande.produit_quantite}
                  </div>
                  <div className="flex justify-between w-1/4 text-lg font-semibold text-center">
                    <h2>Prix total : </h2>
                    {new Intl.NumberFormat().format(commande.produit_prix*commande.produit_quantite)} €
                  </div>
                </div>
              </div>
              <div className="w-1/5 min-w-max">
                <button onClick={() => handleDelete(commande.id)} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 mt-32">
                  Annuler la commande
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Profil;
