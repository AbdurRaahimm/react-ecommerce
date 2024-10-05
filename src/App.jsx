import { useEffect, useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";
import Posts, { Dataloader } from "./pages/Posts";
import Post from "./pages/Post";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/SingleProduct";
import OfferModal from "./components/OfferModal";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import OrderSummary from "./pages/OrderSummary";
import ScrollToTop from "./components/ScrollToTop";  // Import the new component

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<Shop />} />
        <Route path="products/:category" element={<Shop />} />
        <Route path="cart">
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
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : (
        <>
          <RouterProvider router={router}>
            <ScrollToTop /> {/* Ensure ScrollToTop is inside RouterProvider */}
          </RouterProvider>
          <OfferModal />
        </>
      )}
    </>
  );
}
