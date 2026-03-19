const request = require('supertest');
const app = require('../src/app');

describe('GET /api/products/search', () => {
    it('returns all products when no query', async () => {
        const res = await request(app).get('/api/products/search');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('filters products by name', async () => {
        const res = await request(app).get('/api/products/search?q=headphones');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].name).toContain('Headphones');
    });

    it('filters products by category', async () => {
        const res = await request(app).get('/api/products/search?q=Electronics');
        expect(res.statusCode).toEqual(200);
        expect(res.body.every(p => p.category === 'Electronics')).toBe(true);
    });
});

describe('GET /', () => {
    it('returns welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('ShopSmart');
    });
});
