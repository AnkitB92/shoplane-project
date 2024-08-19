import React, { useEffect, useState } from "react";
import Product from "../../components/ProductList/Product";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteToggle = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <h2>Favorites</h2>
      <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((product) => (
            <Product
              key={product.id}
              data={product}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FavoritesPage;