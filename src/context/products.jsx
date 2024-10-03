import { createContext, useContext, useEffect, useReducer } from "react";

const productContext = createContext();

const API = 'https://api.pujakaitem.com/api/products';

const initialState = {
    products: [],
    SingleProduct: [],
    isLoading: true,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                error: null,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                products: [],
                isLoading: false,
                error: action.payload,
            };
        case 'GET_SINGLE_PRODUCT':
            return {
                ...state,
                SingleProduct: action.payload,  // Update state with fetched product
                isLoading: false,
                error: null,
            };
        case 'SINGLE_PRODUCT_ERROR':
            return {
                ...state,
                SingleProduct: null,
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

    const getSingleProduct = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`);
            if (!response.ok) {
                throw new Error('There was an error fetching the product');
            }
            const data = await response.json();
            dispatch({ type: 'GET_SINGLE_PRODUCT', payload: data });  // Dispatch the fetched product data
        } catch (error) {
            dispatch({ type: 'SINGLE_PRODUCT_ERROR', payload: error });
        }
    };

    useEffect(() => {
        getProducts(API);
    }, []);

    return (
        <productContext.Provider value={{ 
            ...state, 
            getSingleProduct,
        }}>
            {children}
        </productContext.Provider>
    );
};

// Custom hook
export const useProductContext = () => {
    const context = useContext(productContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
