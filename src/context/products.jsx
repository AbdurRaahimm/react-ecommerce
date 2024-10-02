
import { createContext, useContext, useEffect, useReducer } from "react";


const productContext = createContext();

// const API = 'https://api.escuelajs.co/api/v1/products';
const API = 'https://api.pujakaitem.com/api/products';


const initialState = {
    products: [],
    isLoading: true,
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                products: action.payload,
                isLoading: false,
                error: null,
            };
        case 'FETCH_ERROR':
            return {
                products: [],
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getProducts = async (api) => {
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error('There was an error fetching the products');
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error });
        }
    };

    
    useEffect(() => {
        getProducts(API);
    }, []);

    return (
        <productContext.Provider value={{ ...state }}>
            {children}
        </productContext.Provider>
    )
}

// Custom hooks
export const useProductContext = () => {
    const context = useContext(productContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}



