import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../libs/formatPrice';
import ProductQuantity from '../components/ProductQuantity';
import { useProductContext } from '../context/products';
import ProductCard from '../components/ProductCard';
import { AddToCart } from '../components/AddToCart';

export default function SingleProduct() {
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const state = useProductContext();
  const { id } = useParams();

  const { SingleProduct, getSingleProduct, isLoading, error, products } = state;
  console.log(SingleProduct);

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!SingleProduct) {
    return <h1>No product found</h1>;
  }

  const changeImg = (index) => {
    setImgIndex(index);
    document.querySelector('#singleImg').src = SingleProduct.image[index].url;
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 bg-background rounded-lg gap-3">
        <div className="w-full md:w-1/2">
          <div className="flex space-x-2 mb-4">
            {SingleProduct.image &&
              SingleProduct.image.map((img, index) => (
                <img
                  onClick={() => changeImg(index)}
                  key={index}
                  className="w-1/4 rounded-lg transition-transform transform hover:scale-105"
                  src={img.url}
                  alt={`Product image ${index + 1}`}
                />
              ))}
          </div>
          {SingleProduct.image && (
            <img
              id="singleImg"
              className="w-full rounded-lg shadow-md"
              src={SingleProduct.image[0]?.url || ''}
              alt="Product main image"
            />
          )}
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {SingleProduct.name}
          </h1>

          <div className="flex items-center my-2">
            {Array.from({ length: 5 }, (_, index) => {
              let number = index + 0.5;
              return (
                <label key={index} className="text-xl cursor-pointer">
                  {SingleProduct.stars >= index + 1 ? (
                    <i className="bi bi-star-fill text-yellow-500"></i>
                  ) : SingleProduct.stars >= number ? (
                    <i className="bi bi-star-half text-yellow-500"></i>
                  ) : (
                    <i className="bi bi-star text-yellow-500"></i>
                  )}
                </label>
              );
            })}
            <span className="text-muted-foreground ml-2">
              ({SingleProduct.reviews} customer reviews)
            </span>
          </div>

          <p className="text-lg font-semibold text-primary">
            {formatPrice(SingleProduct.price, 120)}
          </p>

          <p className="mt-4 text-muted-foreground">{SingleProduct.description}</p>

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
            <span className="font-semibold">Available:</span>
            {
              SingleProduct.stock > 0 ? (
                <span className="text-green-500"> In Stock</span>
              ) : (
                <span className="text-red-500"> Out of Stock</span>
              )
            }



          </div>

          <div className="mt-2">
            <span className="font-semibold">ID:</span>
            <span className="text-muted-foreground">{id}</span>
          </div>

          <div className="mt-2">
            <span className="font-semibold">Brand:</span>
            <span className="text-muted-foreground">{SingleProduct.company}</span>
          </div>

          <div>
            <label className="font-semibold">Color:</label>
            <div className="flex items-center space-x-2">
              {Array.isArray(SingleProduct.colors) && SingleProduct.colors.map((color, index) => (
                <button
                  key={index}
                  style={{ background: color }}
                  className="w-6 h-6 rounded-full border-2 border-white"
                ></button>
              ))}

            </div>
          </div>

          {SingleProduct.stock > 0 ? (
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={handleDecrement}
                disabled={quantity === 1}
                className="font-bold px-3 py-1 bg-gray-200 rounded-lg"
                style={{ cursor: quantity === 1 ? 'not-allowed' : 'pointer' }}
              >
                -
              </button>
              <span className="font-extrabold">{quantity}</span>
              <button
                onClick={handleIncrement}
                disabled={quantity === SingleProduct.stock}
                className="font-bold px-3 py-1 bg-gray-200 rounded-lg"
                style={{
                  cursor: quantity === SingleProduct.stock ? 'not-allowed' : 'pointer',
                }}
              >
                +
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <span className="font-semibold">Out of Stock</span>
            </div>
          )}

          {
            SingleProduct.stock > 0 && <div className="w-full py-4"><AddToCart product={SingleProduct} quantity={quantity} /></div>
          }
        </div>
      </div>

      {/* Related products */}
      <div className="w-full">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-4/12 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-[#f6f6f6] left-1/2 dark:bg-gray-900 text-2xl font-bold">
            Related Products
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 place-items-center px-5 py-5 md:grid-cols-2 lg:grid-cols-4">
          {products
            .filter(
              (product) =>
                product.category === SingleProduct.category && product.id !== SingleProduct.id
            )
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
