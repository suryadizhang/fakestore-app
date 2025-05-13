import { createContext, useReducer, useContext} from "react";

const CartContext = createContext();
const initialState = {
    items: [],
};

function carReducer(state, action) {
    switch (action.type) {
        case "ADD_To_CART":
            const existingItemIndex = state.item.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !==-1) {
                const updateItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;
                return {...state, items: updateItems};
            }
            return {
                ...state, items: [...state.items, {...action.payload, quantity: 1 }],
            };
            case "REMOVE_FROM_CART":
                return {
                    ...state, items: state.items.filter(item => item.id !== action.payload),
                };
                default:
                    return state;
    }
}

export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{cart: state, dispatch }}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
