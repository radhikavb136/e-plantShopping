import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './App';

export default function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = item => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  const handleDecrement = item => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  const handleRemove = item => dispatch(removeItem(item.id));

  return <main className="cart-page">
    <Navbar page="cart" setPage={setPage}/>
    <header className="page-heading"><p className="eyebrow">Your green picks</p><h1>Shopping Cart</h1><p>{totalQuantity} plant(s) in your cart</p></header>
    {cartItems.length === 0 ? <section className="empty-cart"><h2>Your cart is waiting to bloom</h2><p>Add a plant from our collection to get started.</p><button className="get-started-button" onClick={() => setPage('plants')}>Continue Shopping</button></section> :
    <section className="cart-container">
      <div className="cart-items">{cartItems.map(item => <article className="cart-row" key={item.id}>
        <img src={item.image} alt={item.name}/>
        <div className="cart-product"><h3>{item.name}</h3><p>Unit price: ${item.cost.toFixed(2)}</p><strong>Item total: ${(item.cost * item.quantity).toFixed(2)}</strong></div>
        <div className="quantity-controls"><button aria-label="Decrease quantity" onClick={() => handleDecrement(item)}>-</button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => handleIncrement(item)}>+</button></div>
        <button className="delete-button" onClick={() => handleRemove(item)}><Trash2 size={16}/> Delete</button>
      </article>)}</div>
      <aside className="cart-summary"><h2>Order Summary</h2><p>Total plants <strong>{totalQuantity}</strong></p><p>Total amount <strong>${totalAmount.toFixed(2)}</strong></p>
        <button className="get-started-button1" onClick={() => window.alert('Coming Soon!')}>Checkout</button>
        <button className="continue-button" onClick={() => setPage('plants')}><ArrowLeft size={16}/> Continue Shopping</button>
      </aside>
    </section>}
  </main>;
}