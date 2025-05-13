import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();
const initialState = {
    items: [], // Ensure this is an empty array
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                const updateItems = [...state.items];
                updateItems[existingItemIndex].quantity += 1;
                return { ...state, items: updateItems };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case "INCREASE_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case "DECREASE_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
