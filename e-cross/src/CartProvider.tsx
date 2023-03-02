import React, { createContext, ReactNode, useReducer } from "react";

interface CartProviderProps {
  children: ReactNode;
}
type CartAction = { type: string; payload?: CartItem };
// type pour le contexte
type CartItem = { count: number; id: string };

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
      // return state.filter((item) => item.id !== action.payload!.id);
      default:
        return state;
    }
  }

  const CartContext = createContext({ cart, dispatchCart });

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
