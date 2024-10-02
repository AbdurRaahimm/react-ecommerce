import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice } from '../libs/formatPrice';
import ProductQuantity from '../components/ProductQuantity';
import { useProductContext } from '../context/products';
import ProductCard from '../components/ProductCard';



export default function SingleProduct() {
  const products = useProductContext();
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(singleProduct);
  const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://api.pujakaitem.com/api/products/${id}`);
      if (!response.ok) {
        throw new Error('There was an error fetching the single product');
      }
      const data = await response.json();
      setSingleProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const changeImg = (index) => {
    const img = singleProduct.image[index].url;
    document.querySelector('#singleImg').src = img;
  };
  return (
    <>
      <div className="flex flex-col md:flex-row p-6 bg-background rounded-lg gap-3">
        <div className="w-full md:w-1/2">
          <div className="flex space-x-2 mb-4">
            {/* <img className="w-1/4 rounded-lg transition-transform transform hover:scale-105" src="https://placehold.co/100x100" alt="iphone x image 1" />
          <img className="w-1/4 rounded-lg transition-transform transform hover:scale-105" src="https://placehold.co/100x100" alt="iphone x image 2" />
          <img className="w-1/4 rounded-lg transition-transform transform hover:scale-105" src="https://placehold.co/100x100" alt="iphone x image 3" />
          <img className="w-1/4 rounded-lg transition-transform transform hover:scale-105" src="https://placehold.co/100x100" alt="iphone x image 4" /> */}
            {
              singleProduct.image.map((img, index) => {
                return <img onClick={() => changeImg(index)} key={index} className="w-1/4 rounded-lg transition-transform transform hover:scale-105" src={img.url} alt="iphone x image 4" />
              })
            }
          </div>
          <img id='singleImg' className="w-full rounded-lg shadow-md" src={singleProduct.image[0].url} alt="iphone x main image" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">{singleProduct.name}</h1>
          <div className="flex items-center my-2">
            {
              Array.from({ length: 5 }, (_, index) => {
                let number = index + 0.5;
                return (
                  <label key={index} className='text-xl cursor-pointer '>
                    {
                      singleProduct.stars >= index + 1 ? (
                        <i className='bi bi-star-fill text-yellow-500  '></i>
                      ) : singleProduct.stars >= number ? (
                        <i className='bi bi-star-half text-yellow-500 '></i>
                      ) : (
                        <i className='bi bi-star text-yellow-500 '></i>
                      )
                    }
                  </label>
                )
              })
            }
            <span className="text-muted-foreground ml-2">({singleProduct.reviews} customer reviews)</span>
          </div>
          <p className="text-lg font-semibold text-primary">
            {formatPrice(singleProduct.price)}
          </p>
          {/* <p className="text-lg font-semibold text-accent">Deal of the Day: ₹6,000.00</p> */}
          <p className="mt-4 text-muted-foreground">{singleProduct.description}</p>

          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center">
              <i className="bi bi-truck text-2xl"></i>
              <span className="ml-2 text-gray-600">Free Delivery</span>
            </div>
            <div className="flex items-center">
              <i className="bi bi-arrow-repeat text-2xl"></i>
              <span className="ml-2 text-gray-600">30 Days Replacement</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shipping-fast text-2xl"></i>
              <span className="ml-2 text-gray-600">Thapa Delivered</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-2xl"></i>
              <span className="ml-2 text-gray-600">2 Year Warranty</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Available:</span> <span className="text-green-500">
              {singleProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">ID:</span> <span className="text-muted-foreground">{id}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Brand:</span> <span className="text-muted-foreground">{singleProduct.company}</span>
          </div>

          <div className="">
            <label className="font-semibold">Color:</label>
            <div className="flex items-center space-x-2 ">
              {/* <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"></div> */}
              {
                singleProduct.colors.map((color, index) => {
                  return <span key={index} style={{ backgroundColor: color }} className={`w-6 h-6 rounded-full cursor-pointer`}></span>
                })
              }
            </div>
          </div>

          <ProductQuantity stock={singleProduct.stock} />

          {
            singleProduct.stock > 0 && (
              <Link to={`/cart`}>
                <button className="bg-black text-white rounded-lg p-3 mt-4 w-full ">ADD TO CART</button>
              </Link>
            )
          }


        </div>
      </div>

      {/* related product */}
      <div className="w-full">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-4/12 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-[#f6f6f6] left-1/2 dark:bg-gray-900 text-2xl font-bold">
            Related Products
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 place-items-center  px-5 py-5 md:grid-cols-2 lg:grid-cols-4">
          {/* match single product and display related product */} 
          {
            products.products.filter(product => product.category === singleProduct.category && product.id !== singleProduct.id).slice(0, 4).map((product) => {
              return <ProductCard key={product.id} product={product} />
            })
          }
        </div>
      </div>

    </>


  )
}
