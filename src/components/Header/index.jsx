import './Header.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineLogin } from 'react-icons/hi';
import { MdOutlineLogout } from "react-icons/md";
import { MdFavoriteBorder } from 'react-icons/md';
import { LiaIdCard } from 'react-icons/lia';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';

const Header = () => {
  const { loginStatus, userName, logout } = useAuth();
  const { getCartCount } = useCart();

  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-sm mb-2'>
      <div className="container-fluid">
        <Link to='/' className="hero-logo">
          SHOP
          <span className='text-dark'>LANE</span>
        </Link>

        <div className='nav-buttons'>
          <div className="btn-group">
            <button
              className="account-btn"
              type="button" data-bs-toggle="dropdown"
            >
              <FaRegUserCircle />
              {loginStatus
                ? <div>Welcome,<p style={{ textTransform: 'capitalize' }} className='m-0'>{userName}</p></div>
                : <div>Login<p className='m-0'>or Signup</p></div>}
              <MdKeyboardArrowDown />
            </button>

            <ul className="dropdown-menu">
              {loginStatus
                ? <button className="dropdown-item" onClick={onLogoutHandler}>
                  <MdOutlineLogout />
                  Logout
                </button>
                : <>
                  <Link className="dropdown-item" to="/login">
                    <HiOutlineLogin />
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/signup">
                    <LiaIdCard />
                    Sign Up
                  </Link>
                </>
              }
              <hr className="dropdown-divider my-1" />
              <Link className="dropdown-item" to="/cart">
                <HiOutlineShoppingCart />
                Cart
              </Link>
              <Link className='dropdown-item' to="/favorites">
                <MdFavoriteBorder />
                Favorite
              </Link>
            </ul>
          </div>

          <Link to="/cart" className="cart-link">
            <HiOutlineShoppingCart />
            <div className='cart-count'>{getCartCount()}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;