import { createContext, useContext, useReducer } from "react";


const cartContext = createContext();

const initialState = {
    cart: [],
    total: 0,
    totalItems: 0,
};


const reducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload],
                totalItems: state.totalItems + 1,
                total: state.total + action.payload.price
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product=>product.id !== action.payload.id),
                totalItems: state.totalItems - 1,
                total: state.total - action.payload.price
            }
        
        default:
            return state;
    }
};


export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addToCart = (quantity, product)=>{
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                ...product,
                quantity
            }
        })
    }

    const removeFromCart = (product)=>{
        dispatch({type: 'REMOVE_FROM_CART', payload: product});
    };

    return (
        <cartContext.Provider value={
            {
                ...state,
                addToCart,
                removeFromCart
            }
        }>
            {children}
        </cartContext.Provider>       
    )
};


// custom hook
export const useCartContext = ()=>{
    return useContext(cartContext);
}