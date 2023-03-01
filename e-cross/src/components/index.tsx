import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
function Index() {
  const [motocross, setMoto] = useState([] as MotoCross[]);
  type MotoCross = {
    date: number;
    modele: string;
    prix: number;
    marque: string;
    image: string;
    id: string;
  };
  const loadMotocross = async () => {
    const q = query(collection(db, "motocross"));
    const querySnapshot = await getDocs(q);
    const loadedMotocross = [] as MotoCross[];
    setMoto([]);
    querySnapshot.forEach((doc) => {
      const currentMotocross = doc.data() as MotoCross;
      const id = doc.id;
      loadedMotocross.push({ ...currentMotocross, id });
    });
    setMoto(loadedMotocross);
  };
  useEffect(() => {
    loadMotocross();
  }, []);
  return (
    <div className="flex space-x-20 m-5">
      {motocross.map((motocross, index) => (
        <Link to={`/Produit/${motocross.id}`}>
          <div
            className="rounded-md shadow-md w-1/4 min-w-fit"
            key={index}
          >
            <img src={motocross.image} className="w-82 h-72 items-center" />
            <div className="flex justify-between flex-wrap">
              <div className="text-lg font-semibold text-center">
                {motocross.marque}
              </div>
              <div className="text-lg font-semibold text-center">
                {motocross.modele}
              </div>
              <div className="text-lg font-semibold text-center">
                {motocross.date}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Index;
