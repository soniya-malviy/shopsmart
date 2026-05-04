import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import MemoryGame from './components/MemoryGame'
import StatusPage from './components/StatusPage'

function App() {
    const [activeTab, setActiveTab] = useState('shop');
    const [cart, setCart] = useState([]);
    const [backendStatus, setBackendStatus] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then(res => res.json())
            .then(data => setBackendStatus(data))
            .catch(() => setBackendStatus(null));
    }, []);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    const removeFromCart = (index) => {
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <span>🛍️</span> ShopSmart
                </div>
                <div className="nav-tabs">
                    <button
                        className={`nav-tab ${activeTab === 'shop' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shop')}
                    >
                        🛒 Shop
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'game' ? 'active' : ''}`}
                        onClick={() => setActiveTab('game')}
                    >
                        🧩 Puzzle
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'status' ? 'active' : ''}`}
                        onClick={() => setActiveTab('status')}
                    >
                        ⚡ Status
                    </button>
                </div>
                <div className="nav-status">
                    <div className={`status-dot ${backendStatus ? '' : 'offline'}`}></div>
                    {backendStatus ? 'API Online' : 'API Offline'}
                </div>
            </nav>

            <div className="main-container">
                {activeTab === 'shop' && (
                    <>
                        <div className="hero">
                            <h2>Discover Premium Products</h2>
                            <p>Browse our curated collection and add your favorites to the cart</p>
                        </div>
                        <ProductList cart={cart} addToCart={addToCart} />

                        <div className="cart-section">
                            <div className="cart-header">
                                <h3>🛒 Your Cart</h3>
                                <span className="cart-count">{cart.length} items</span>
                            </div>
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <p>Your cart is empty. Start shopping above!</p>
                                </div>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cart.map((item, index) => (
                                            <div key={index} className="cart-item">
                                                <div className="cart-item-info">
                                                    <span>{item.emoji}</span>
                                                    <span className="cart-item-name">{item.name}</span>
                                                </div>
                                                <div className="cart-item-info">
                                                    <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
                                                    <button className="cart-remove-btn" onClick={() => removeFromCart(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-total">
                                        <span className="cart-total-label">Total</span>
                                        <span className="cart-total-amount">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'game' && <MemoryGame />}
                {activeTab === 'status' && <StatusPage status={backendStatus} />}
            </div>
        </>
    )
}

export default App
