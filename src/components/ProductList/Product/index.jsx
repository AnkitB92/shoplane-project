import './Product.css';
import React, { useState, useEffect } from "react";
import { MdFavorite, MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import Stars from "../../Stars";
import { useCart } from '../../../Context/CartContext';

const Product = ({ data, onFavoriteToggle }) => {
  const [favorite, setFavorite] = useState(false);
  const { addToCart, removeFromCart, isProductInCart } = useCart();
  const { id, image, title, rating, price } = data;

  // Check local storage for favorite status on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorite(favorites.some(item => item.id === id));
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorite
      ? favorites.filter(item => item.id !== id)
      : [...favorites, data];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorite(!favorite);

    if (onFavoriteToggle) {
      onFavoriteToggle(updatedFavorites);
    }
  };

  const handleCartAction = () => {
    if (isProductInCart(id)) {
      removeFromCart(id);
    } else {
      addToCart(data);
    }
  };

  const dollars = price.toString().split('.')[0];
  const cents = price.toFixed(2).toString().split('.')[1];
  return (
    <div className="col">
      <div className="card product-card">
        <button className="heart-btn" onClick={handleFavorite}>
          <MdFavorite className={`fs-4 ${favorite ? 'text-danger' : ''}`} />
        </button>
        <Link className='img-container' to={`/product/${id}`}>
          <img src={image} alt='product-image' />
        </Link>
        <div className="card-body border-top">
          <Link className="product-name" to={`/product/${id}`}>
            Brand, <span>{title}</span>
          </Link>
          <div className="mb-2">
            <Stars rate={rating.rate} count={rating.count} />
          </div>
          <div className="currency">
            $<span>{dollars}</span>{cents}
          </div>
          <div className="d-grid">
            <button
              type='button'
              className={`btn ${isProductInCart(id) ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleCartAction}
            >
              {isProductInCart(id) ? (
                <>
                  <MdRemoveShoppingCart size='22px' />
                  <span>Remove Item</span>
                </>
              ) : (
                <>
                  <MdShoppingCart size='22px' />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;