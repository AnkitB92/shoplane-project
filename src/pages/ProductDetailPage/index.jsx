import './ProductDetailPage.css';

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import EndPoints from "../../api/EndPoints";
import { useParams } from "react-router-dom";
import Stars from '../../components/Stars';
import { useCart } from '../../Context/CartContext';

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart, removeFromCart, isProductInCart } = useCart();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`${EndPoints.PRODUCTS}${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const { title, image, price, description, rating = { rate: 0, count: 0 } } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    loading ? (
      <div
        style={{ top: '50%', left: '50%' }}
        className='position-absolute'
      >
        <div className="spinner-border"></div>
      </div>
    ) : (
      <div className="row justify-content-center mb-4 border border-3 rounded-3 mx-1">
        <div className="col-12 col-sm-6 col-md-5 d-flex justify-content-center">
          <img src={image} className='display-image' alt='product-image' />
        </div>

        <div className="col-sm-6 col-md-7">
          <h4 className="mb-0 pt-4">{title}</h4>
          <p className='mb-0 fs-5 text-primary'>Brand</p>
          <Stars rate={rating.rate} count={rating.count} />
          <p className='mt-2 mb-0 fs-5 text-secondary'>${price}</p>

          <hr className='mt-1' />

          <p className="text-justify">{description}</p>

          {isProductInCart(product.id) ? (
            <button className="btn btn-danger mb-3" onClick={handleRemoveFromCart}>Remove Item</button>
          ) : (
            <button className="btn btn-primary mb-3" onClick={handleAddToCart}>Add to Cart</button>
          )}
        </div>
      </div>
    )

  );
};

export default ProductDetailPage;
