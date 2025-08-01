import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from '././components/pages/Home';
import Products from '././components/pages/Products';
import Cart from '././components/pages/Cart';
import About from './components/pages/About';
import Contact from '././components/pages/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/pages/AdminPanel';
import Login from './components/pages/Login';

import AdminLogin from './components/pages/AdminLogin';

import ProductDetails from './components/pages/ProductDetails';


import ThankYou from './components/pages/ThankYou';
import AdminRegister from './components/pages/AdminRegister';
function App() {
  return (
    <Router>
      <div className="app-layout"> {/* <<< това е ключово */}

        <Header />
        <main className="main-content container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="admin-register" element={<AdminRegister />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />


      </div>
    </Router>
  );
}

export default App;

