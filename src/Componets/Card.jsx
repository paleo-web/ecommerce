

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/ProductList";
import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // For redirection

function Card({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to login page

  const cartItems = useSelector(
    (state) => state.persistedReducer.ProductList.value
  );

  // Check login state from the Redux store
  const { isLogin } = useSelector((state) => state.persistedReducer.onAuth);

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  // Handle Add to Cart logic
  const handleAddToCart = () => {
    if (!isLogin) {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, add product to the cart
      if (!isProductInCart) {
        dispatch(addProduct(product));
      }
    }
  };

  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={product.thumbnail}
          alt="product"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-100 mb-1">
            {product.category}
          </h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">
            {product.title}
          </h1>
          <p className="leading-relaxed mb-3">{product.description}</p>
          <h1 className="title-font text-lg font-medium text-white mb-3">
            Price {"$" + product.price}
          </h1>
          <div className="flex items-center flex-wrap ">
            <Button
              onClick={handleAddToCart} // Updated to handle login check
              className="text-gray-950 inline-flex items-center md:mb-2 lg:mb-0"
            >
              {isProductInCart ? "Added" : "Add to Cart"}
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Button>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
              1.2K
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
