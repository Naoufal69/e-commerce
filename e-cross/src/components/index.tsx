import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
function Index() {
  const [motocross, setMoto] = useState([] as MotoCross[]);
  type MotoCross = {
    date: number;
    modele: string;
    prix: number;
    marque: string;
    image: string;
  };
  const loadMotocross = async () => {
    const q = query(collection(db, "motocross"));
    const querySnapshot = await getDocs(q);
    setMoto([])
    querySnapshot.forEach((doc) => {
      setMoto((motocross) => [...motocross, doc.data() as MotoCross]);
    });
  };
  useEffect(() => {
    loadMotocross();
  }, []);
  return (
    <div>
      {motocross.map((motocross,index)=><div className="mb-5" key={index}>
        <img src={motocross.image}/>
        <div>{motocross.modele}</div>
        <div>{new Intl.NumberFormat().format(motocross.prix)} €</div>
        <div>{motocross.date}</div>
        <div>{motocross.marque}</div>
        </div>)}
    </div>
  );
}
export default Index;
