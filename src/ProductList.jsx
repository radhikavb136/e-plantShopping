import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { addItem } from './CartSlice';
import { plants } from './data';
import { Navbar } from './App';

const categories = ['Air Purifying', 'Medicinal', 'Aromatic'];

export default function ProductList({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [added, setAdded] = useState([]);
  return <main className="shop-page">
    <Navbar page="plants" setPage={setPage}/>
    <header className="page-heading"><p className="eyebrow">Find your leafy companion</p><h1>Our Plants</h1><p>Explore our collection by category.</p></header>
    {categories.map(category => <section className="category-section" key={category}>
      <h2>{category} Plants</h2>
      <div className="plant-grid">
        {plants.filter(plant => plant.category === category).map(plant => {
          const isAdded = added.includes(plant.id);
          return <article className="plant-card product-list" key={plant.id}>
            <img src={plant.image} alt={plant.name}/>
            <div className="plant-info"><span className="category-tag">{plant.category}</span><h3>{plant.name}</h3><p>{plant.description}</p>
              <div className="plant-bottom"><strong>${plant.cost.toFixed(2)}</strong>
                <button disabled={isAdded} onClick={() => {dispatch(addItem(plant)); setAdded(prev => [...prev, plant.id]);}}>
                  {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>)}
    <button className="floating-cart" onClick={() => setPage('cart')} aria-label="Shopping cart"><ShoppingCart/> <span>{cartCount}</span></button>
  </main>;
}