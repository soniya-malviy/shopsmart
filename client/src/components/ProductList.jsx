import { useState, useEffect } from 'react';

const EMOJIS = ['🎧', '👕', '☕', '📱', '⌚', '🎮', '📷', '💻'];

function ProductList({ cart, addToCart }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/products/search`)
            .then(res => res.json())
            .then(data => {
                const enriched = data.map((p, i) => ({
                    ...p,
                    emoji: EMOJIS[i % EMOJIS.length]
                }));
                setProducts(enriched);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div>
            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="products-grid">
                {filtered.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-emoji">{product.emoji}</div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-category">{product.category}</div>
                        <div className="product-footer">
                            <span className="product-price">₹{product.price.toLocaleString()}</span>
                            <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                {product.inStock ? 'In Stock' : 'Sold Out'}
                            </span>
                        </div>
                        <button
                            className="add-cart-btn"
                            disabled={!product.inStock}
                            onClick={() => addToCart(product)}
                        >
                            {product.inStock ? '+ Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="cart-empty" style={{ marginTop: 20 }}>
                    <p>No products match your search.</p>
                </div>
            )}
        </div>
    );
}

export default ProductList;
