import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import Contact from "./pages/Contact"
import Posts, { Dataloader } from "./pages/Posts"
import Post from "./pages/Post"
import { useState } from "react"
import Loading from "./components/Loading"
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound"
import SingleProduct from "./pages/SingleProduct"
import OfferModal from "./components/OfferModal"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Checkout from "./pages/Checkout";
import Order from "./pages/Order"
import OrderSummary from "./pages/OrderSummary"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Shop />} />
        <Route path="products/:category" element={<Shop />} />  
        <Route path="cart"  >
          <Route index element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          
        </Route>
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="order" element={<Order />} />
        <Route path="order-summary" element={<OrderSummary />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="posts" element={<Posts />} loader={Dataloader} />
      </Route>
    </>
  )
)

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <>
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
      {/* <RouterProvider router={router} /> */}

      {isLoading ? '' : <OfferModal />}

    </>
  )
}

