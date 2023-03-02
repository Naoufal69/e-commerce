import { useState } from "react";
import { CartItem } from "../../CartProvider";

function Validation({ onClose }: { onClose: () => void }) {
  type ModalProps = {
    onClose: () => void;
    commande: CartItem;
  };
  const [mail, setMail] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");
  const [code_postale, setCode_postale] = useState("");

  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  };
  const handleVilleChange = (e: any) => {
    setVille(e.target.value);
  };
  const handleAdresseChange = (e: any) => {
    setAdresse(e.target.value);
  };
  const handleCode_postaleChange = (e: any) => {
    setCode_postale(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
                  onClick={() => handleSubmit()}
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
