import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import HomePage from './pages/HomePage';
import FavoritePage from "./pages/FavoritePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProductList from "./components/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="container-md">
          <BrowserRouter>
            <Header />
            <Navbar />
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<ProductList />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;