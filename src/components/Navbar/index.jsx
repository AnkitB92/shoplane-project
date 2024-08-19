import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import EndPoints from '../../api/EndPoints';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname.split('/')[2] || '');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(EndPoints.CATEGORIES);
        setCategories(response.data || []);
      } catch (error) {
        console.error(`Error fetching categories: ${error.message || error}`);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (category) => {
    localStorage.setItem('selectedCategory', category);
    setIsOpen(false);
  };

  return (
    <div className='nav-container'>
      <div className="dropdown" ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          Categories
        </button>
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <Link to="/" onClick={() => handleCategoryClick('')} className={currentPath === '' ? 'active' : ''}>
            All
          </Link>
          {categories.map(category => (
            <Link to={`/category/${encodeURIComponent(category)}`} key={category} onClick={() => handleCategoryClick(category)} className={currentPath === decodeURIComponent(category) ? 'active' : ''}>
              {category}
            </Link>
          ))}
        </div>
      </div>
      <Link to="/" className={currentPath === '' ? 'active' : ''}>
        All
      </Link>
      {categories.map(category => (
        <Link to={`/category/${encodeURIComponent(category)}`} key={category} className={currentPath === decodeURIComponent(category) ? 'active' : ''}>
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;