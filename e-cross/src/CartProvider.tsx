import React, { createContext, ReactNode, useReducer } from "react";

interface CartProviderProps {
  children: ReactNode;
}
type CartAction = { type: string; payload?: CartItem };
// type pour le contexte
export type CartItem = {
  count: number;
  date: number;
  modele: string;
  prix: number;
  marque: string;
  image: string;
  id: string;
  itemid?: number;
  description: string;
};

const CartContext = createContext(
  {} as { cart: CartItem[]; dispatchCart: any }
);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // initialise le contexte
  const initialCartState: CartItem[] = [];
  // Creer un etat local pour la gestion du cart avec useReducerr
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState);
  // Creeer la fonction de reducer qui permet de gerer l'evolution du panier
  function cartReducer(state: CartItem[], action: CartAction) {
    switch (action.type) {
      case "add":
        return [...state, action.payload!];
      case "remove":
        const tmpCart = [...state];
        tmpCart.splice(action.payload!.itemid!, 1);
        return tmpCart;
      default:
        return state;
    }
  }

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export { CartContext };
