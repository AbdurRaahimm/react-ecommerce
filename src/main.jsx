import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductProvider } from './context/products';
import { CartProvider } from './context/cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductProvider>
    <CartProvider>
      <App />
      <ToastContainer />
    </CartProvider>
  </ProductProvider>
)
