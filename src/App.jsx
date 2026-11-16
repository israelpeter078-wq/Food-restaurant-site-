import React, { useMemo, useState } from 'react';

const dishes = [
  { id: 1, name: 'Jollof Rice & Chicken', category: 'Rice', price: 4500, desc: 'Smoky party-style jollof served with seasoned chicken.', img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80' },
  { id: 2, name: 'Grilled Chicken Bowl', category: 'Bowls', price: 5200, desc: 'Juicy grilled chicken with rice and fresh vegetables.', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80' },
  { id: 3, name: 'Classic Beef Burger', category: 'Burgers', price: 4800, desc: 'A satisfying burger with fresh greens and house sauce.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
  { id: 4, name: 'Creamy Pasta', category: 'Pasta', price: 5000, desc: 'Comforting pasta tossed in a rich creamy sauce.', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80' },
  { id: 5, name: 'Pepperoni Pizza', category: 'Pizza', price: 6500, desc: 'Golden crust, rich tomato base and generous toppings.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80' },
  { id: 6, name: 'Fresh Garden Salad', category: 'Bowls', price: 3500, desc: 'Crisp greens, colourful vegetables and a bright dressing.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' }
];
const money = n => '₦' + n.toLocaleString('en-NG');

export default function App() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState('');
  const categories = ['All', ...new Set(dishes.map(d => d.category))];
  const shown = useMemo(() => category === 'All' ? dishes : dishes.filter(d => d.category === category), [category]);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function add(dish) {
    setCart(old => {
      const found = old.find(item => item.id === dish.id);
      return found
        ? old.map(item => item.id === dish.id ? { ...item, qty: item.qty + 1 } : item)
        : [...old, { ...dish, qty: 1 }];
    });
  }
  function change(id, delta) {
    setCart(old => old.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0));
  }
  function submit(e) {
    e.preventDefault();
    setNotice('Thank you! This is a frontend demo; no message was sent to a server.');
    e.currentTarget.reset();
  }

  return <>
    <header><div className="wrap nav">
      <a className="brand" href="#home">Foodie<span>Hub</span>.</a>
      <nav aria-label="Main navigation"><a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <button className="btn" onClick={() => setShowCart(true)}>Cart ({count})</button>
    </div></header>

    <section className="hero" id="home"><div className="wrap heroGrid">
      <div><small>FRESH • TASTY • MADE WITH CARE</small><h1>Good food.<br /><em>Good mood.</em></h1>
        <p>Discover delicious meals made with fresh ingredients. Find your next favourite and enjoy the FoodieHub experience.</p>
        <a className="btn" href="#menu">Explore our menu</a>
      </div>
      <div className="heroPhoto" role="img" aria-label="A delicious freshly prepared meal" />
    </div></section>

    <section id="menu" className="wrap section"><small>OUR FAVOURITES</small><h2>Explore the menu</h2><p className="muted">A little something for every craving.</p>
      <div className="filters">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
      <div className="grid">{shown.map(d => <article className="food" key={d.id}>
        <img src={d.img} alt={d.name} loading="lazy" /><div><h3>{d.name}</h3><p>{d.desc}</p>
          <div className="foodBottom"><b>{money(d.price)}</b><button onClick={() => add(d)}>+ Add</button></div>
        </div>
      </article>)}</div>
    </section>

    <section className="about" id="about"><div className="wrap aboutGrid">
      <div><small>OUR STORY</small><h2>Food made to bring people together.</h2>
        <p className="muted">We believe a great meal should feel welcoming, satisfying and memorable. Our menu brings together comforting classics and exciting flavours, prepared with care.</p>
        <p className="muted">This is a frontend demonstration. It does not process real payments or send real orders.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80" alt="Warm restaurant dining space" />
    </div></section>

    <section className="wrap section" id="contact"><small>SAY HELLO</small><h2>Contact FoodieHub</h2>
      <div className="contactGrid"><div className="panel"><h3>We'd love to hear from you</h3><p className="muted">Try the form to see the validation and confirmation.</p><p>✉ hello@foodiehub.example</p></div>
        <form className="panel" onSubmit={submit}>
          <label>Full name<input required placeholder="Your name" /></label>
          <label>Email address<input required type="email" placeholder="you@example.com" /></label>
          <label>Subject<input required placeholder="How can we help?" /></label>
          <label>Message<textarea required placeholder="Write your message..." /></label>
          <button className="btn" type="submit">Send message</button><p className="gold" role="status">{notice}</p>
        </form>
      </div>
    </section>

    <footer><div className="wrap">© 2026 FoodieHub. Frontend project demonstration.</div></footer>

    {showCart && <div className="overlay" onClick={() => setShowCart(false)}>
      <aside onClick={e => e.stopPropagation()} aria-label="Shopping cart">
        <button className="close" onClick={() => setShowCart(false)}>Close ✕</button><h2>Your cart</h2>
        {cart.length ? cart.map(item => <div className="cartLine" key={item.id}>
          <span>{item.name}<br /><small>{money(item.price)} × {item.qty}</small></span>
          <span><button aria-label={'Remove one ' + item.name} onClick={() => change(item.id, -1)}>−</button> {item.qty} <button aria-label={'Add one ' + item.name} onClick={() => change(item.id, 1)}>+</button></span>
        </div>) : <p className="muted">Your cart is empty. Add a meal from the menu.</p>}
        <h3>Total: {money(total)}</h3>
        <button className="btn" onClick={() => setNotice('Demo order complete. No payment or real order was processed.')}>Place demo order</button>
        <p className="gold" role="status">{notice}</p>
      </aside>
    </div>}
  </>;
}