import { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products/search')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {filtered.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <p>{product.category}</p>
                        <span style={{
                            background: product.inStock ? '#4CAF50' : '#f44336',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px'
                        }}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
