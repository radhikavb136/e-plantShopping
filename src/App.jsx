import React, { useState } from 'react';
import { ShoppingCart, Leaf, House, Sprout } from 'lucide-react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

export function Navbar({ page, setPage }) {
  const items = useSelector(state => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <nav className="navbar">
    <button className="brand" onClick={() => setPage('home')}><Leaf size={25}/> Paradise Nursery</button>
    <div className="nav-links">
      <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}><House size={16}/> Home</button>
      <button className={page === 'plants' ? 'active' : ''} onClick={() => setPage('plants')}><Sprout size={16}/> Plants</button>
      <button className={page === 'cart' ? 'active' : ''} onClick={() => setPage('cart')}><ShoppingCart size={17}/> Cart <span className="cart-count">{count}</span></button>
    </div>
  </nav>;
}

export default function App() {
  const [page, setPage] = useState('home');
  return <div className="app-shell">
    <Navbar page={page} setPage={setPage}/>
    {page === 'home' && <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Bring nature home</p>
          <h1>Welcome to Paradise Nursery</h1>
          <p>Find your next favorite plant and make room for a little more green.</p>
          <button className="get-started-button" onClick={() => setPage('plants')}>Get Started</button>
        </div>
      </section>
      <AboutUs/>
    </main>}
    {page === 'plants' && <ProductList setPage={setPage}/>}
    {page === 'cart' && <CartItem setPage={setPage}/>}
    <footer>© {new Date().getFullYear()} Paradise Nursery · Grow something beautiful.</footer>
  </div>;
}