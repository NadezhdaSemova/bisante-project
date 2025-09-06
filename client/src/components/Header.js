import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useCart} from '../context/CartContext'
import '../styles/header.css';
import logo from '../assets/logo.png';

function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { getTotalItems } = useCart();

 useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="logo-title">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Лого" className="logo" />
          <span className="site-title">Винарна Бисанте</span>
        </Link>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Начало</Link>
        <Link to="/products">Продукти</Link>
        <Link to="/cart">
          🛒 Количка
          {getTotalItems() > 0 && (
            <span className="cart-count">{getTotalItems()}</span>
          )}
        </Link>
        <Link to="/about">За нас</Link>
        <Link to="/contact">Контакти</Link>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}


export default Header;

