import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import EndPoints from "../../api/EndPoints";
import Product from "./Product";
import { useLocation } from 'react-router-dom';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const category = decodeURIComponent(location.pathname.split('/')[2] || '');

  const getData = useCallback(
    async () => {
      setLoading(true);
      try {
        const endpoint = category ?
          `${EndPoints.PRODUCTS_BY_CATEGORY}${category}` : EndPoints.PRODUCTS;
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, [category]
  )

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    loading ? (
      <div
        style={{ top: '50%', left: '50%' }}
        className='position-absolute'
      >
        <div className="spinner-border"></div>
      </div>
    ) : (
      <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {products.map((product, index) => <Product key={index} data={product} />)}
      </div>
    )

  );
};

export default ProductList;