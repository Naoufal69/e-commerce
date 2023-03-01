import React, { useState,useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { auth } from "./../firebase.config";

function Admin() {

  const [commande, setCommande] = useState([] as Commande[]);
  type Commande = {
    adresse: string;
    code_postale: string;
    image: string;
    mail:string;
    produit_date: number;
    produit_marque: string;
    produit_modele: string;
    produit_prix: number; 
    produit_quantite:number;
    ville:string;
  };
  const loadCommande = async () => {
    const q = query(collection(db, "Commande"));
    const querySnapshot = await getDocs(q);
    setCommande([])
    querySnapshot.forEach((doc) => {
      setCommande((commande) => [...commande, doc.data() as Commande]);
    });
  };
  useEffect(() => {
    loadCommande();
  }, []);

  return (
    <div className="flex flex-col justify-center m-auto w-3/4 mt-10 ">
      {commande.map((commande,index)=><div className="mb-10 rounded-md w-full shadow-lg min-w-fit  " key={index}>
      <div className=" flex align-content: center  m-2">
        <div className="w-2/8 ">
            <div className="flex space-x-16 text-lg font-bold text-center border-b border-black ">
            <div>{commande.produit_marque}</div>
            <div>{commande.produit_modele}</div>
            <div>{commande.produit_date}</div>
          </div>
          <img src={commande.image} alt="Image de commande" className=" w-50 h-40 object-cover "/>
        </div>

        <div className="flex w-2/4 mt-0 mb-0 ml-20 m-auto flex-col ">
          
          <div className="flex  w-full h-8 border-t border-black">
            <div className="text-lg font-semibold ml-2 m-auto">
              <h2>Adresse mail</h2>
            </div>  
            <div className="text-base  m-auto mr-2">
              {commande.mail}
            </div>
          </div>
          
          
          <div className="flex w-full h-full ml-0  border-t  border-black">
            <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
              <h2>Adresse Complète</h2>
            </div>
            <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">  
              <div >{commande.adresse}</div>
              <div >{commande.code_postale}</div>
              <div >{commande.ville}</div>
            </div>
          </div>

          <div className="flex w-full h-full ml-0  border-t  border-black">
            <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
              <h2>Quantité</h2>
            </div>
            <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">  
              <div >{commande.produit_quantite}</div>
            </div>
          </div>
        
          <div className="flex w-full h-full ml-0  border-t  border-black">
            <div className="text-lg font-semibold mt-0.5 ml-2 m-auto">
              <h2>Prix</h2>
            </div>
            <div className="text-base  m-auto mt-0.5 mr-2 grid justify-items-end">  
              <div className="flex">{new Intl.NumberFormat().format(commande.produit_prix*commande.produit_quantite)}<h2>&nbsp;€</h2></div>
            </div>
          </div>

        </div>
        <div className="w-1/6 flex flex-col">
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-10 ml-6 mr-6">
            ✅
          </button>
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-10 ml-6 mr-6">
            ❌
          </button>
        </div>
      </div>
  </div>)}
</div>

  );
}

export default Admin;


